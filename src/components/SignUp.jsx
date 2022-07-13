import { View, StyleSheet } from "react-native";
import Text from "./Text";
import SignUpForm from "./SignUpForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
});

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="header">Sign up</Text>
      <SignUpForm />
    </View>
  );
};

export default SignUp;
