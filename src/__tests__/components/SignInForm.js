import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { View, Pressable } from "react-native";
import Text from "../../components/Text";
import FormikTextInput from "../../components/FormikTextInput";
import { Formik } from "formik";
import theme from "../../theme";

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

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInFormFields onSubmit={handleSubmit} />}
    </Formik>
  );
};

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
