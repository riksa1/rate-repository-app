import { Pressable, View } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignInFormFields = ({ onSubmit }) => {
  return (
    <View style={{ width: "80%" }}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" secureTextEntry placeholder="Password" />
      <Pressable onPress={onSubmit} style={{ borderRadius: 5, marginTop: 10, backgroundColor: theme.colors.button, paddingVertical: 15 }}>
        <Text color="textSecondary" style={{ textAlign: "center" }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data) {
        navigate("/", { replace: true });
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

export default SignInForm;
