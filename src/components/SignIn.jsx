import { View, StyleSheet } from "react-native";
import Text from "./Text";
import SignInForm from "./SignInForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="header">Sign in</Text>
      <SignInForm />
    </View>
  );
};

export default SignIn;
