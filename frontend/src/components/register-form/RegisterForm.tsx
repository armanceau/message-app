import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import styles from "./registerForm.module.css";
import { AuthError } from "../../errors/AuthError";
import { useNavigate } from "react-router-dom";
import CardError from "../card-error/CardError";

const REGISTER_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: { username, password },
      });
      setSuccessMsg("Utilisateur créé " + data.login.user.username + "✅");
      setTimeout(() => {
        navigate("login");
      }, 2000);
    } catch (error) {
      setErrorMsg("Erreur lors de l'inscription");
      const readable = AuthError(error);
      setErrorMsg(readable);
    }
  };

  return (
    <div className={styles.container}>
      {!successMsg && (
        <form className={styles.form} onSubmit={handleRegister}>
          <h2 className={styles.title}>Inscription</h2>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            S'inscrire
          </button>
          <p className={styles.linkText}>
            Vous avez déjà un compte ? <a href="/login">Connectez-vous ici</a>.
          </p>
          {errorMsg && <CardError message={errorMsg} />}
        </form>
      )}
      {successMsg && (
        <div className={styles.successMsg}>
          <h2>Connexion réussie !</h2>
          <p>{successMsg}</p>
        </div>
      )}
    </div>
  );
}
