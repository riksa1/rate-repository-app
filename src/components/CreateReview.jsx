import { View, StyleSheet } from "react-native";
import Text from "./Text";
import CreateReviewForm from "./CreateReviewForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
});

const CreateReview = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="header">Create Review</Text>
      <CreateReviewForm />
    </View>
  );
};

export default CreateReview;
