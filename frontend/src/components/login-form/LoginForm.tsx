import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";
import { AuthError } from "../../errors/AuthError";
import CardError from "../card-error/CardError";

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username, password } });
      localStorage.setItem("token", data.login.token);
      setSuccessMsg("Bienvenue " + data.login.user.username + "👋");
      setTimeout(() => {
        navigate("home");
      }, 2000);
    } catch (error) {
      setErrorMsg("Erreur lors de la connexion");
      const readable = AuthError(error);
      setErrorMsg(readable);
    }
  };

  return (
    <div className={styles.container}>
      {!successMsg && (
        <form onSubmit={handleLogin} className={styles.form}>
          <h2 className={styles.title}>Connexion</h2>
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
            Se connecter
          </button>
          <p className={styles.linkText}>
            Pas encore de compte ? <a href="/register">Inscrivez-vous ici</a>.
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
