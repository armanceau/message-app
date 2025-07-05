import { ApolloError } from "@apollo/client";

export const AuthError = (error: ApolloError): string => {
  const gqlError = error?.graphQLErrors?.[0];
  console.log(gqlError)
  const code =
    gqlError?.extensions?.code || gqlError?.extensions?.response?.statusCode || gqlError?.extensions?.response?.code;

  switch (code) {
    case "UNAUTHORIZED":
    case 401:
      return "Nom d'utilisateur ou mot de passe incorrect.";
    case "CONFLICT":
    case 409:
      return "Cet utilisateur existe déjà.";
    case "BAD_REQUEST":
    case 400:
      return "Requête invalide.";
    case "USERNAME_TAKEN": 
      return "Cet utilisateur existe déjà."
    default:
      return gqlError?.message || "Une erreur inconnue est survenue.";
  }
};
