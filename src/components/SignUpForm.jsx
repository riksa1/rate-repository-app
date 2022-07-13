import { Pressable, View } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username has to be atleast 1 character")
    .max(30, "Username can be max 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password has to be minimum 5 characters")
    .max(50, "Password can be maximum 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignInFormFields = ({ onSubmit }) => {
  return (
    <View style={{ width: "80%" }}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" secureTextEntry placeholder="Password" />
      <FormikTextInput name="passwordConfirmation" secureTextEntry placeholder="Password confirmation" />
      <Pressable onPress={onSubmit} style={{ borderRadius: 5, marginTop: 10, backgroundColor: theme.colors.button, paddingVertical: 15 }}>
        <Text color="textSecondary" style={{ textAlign: "center" }}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      if (data) {
        const signInResult = await signIn({ username, password });
        if (signInResult.data) {
          navigate("/", { replace: true });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInFormFields onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpForm;
