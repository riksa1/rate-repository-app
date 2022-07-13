import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutation, result] = useMutation(REGISTER);

  const signUp = async ({ username, password }) => {
    const answer = await mutation({ variables: { username, password } });
    return answer;
  };

  return [signUp, result];
};

export default useSignUp;
