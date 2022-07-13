import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutation, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const answer = await mutation({ variables: { username, password } });
    await authStorage.setAccessToken(answer.data.authenticate.accessToken);
    await apolloClient.resetStore();
    return answer;
  };

  return [signIn, result];
};

export default useSignIn;
