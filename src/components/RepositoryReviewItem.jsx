import { View, Pressable, Alert } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const ratingWidth = 40;

const RepositoryReviewItem = ({ review, buttons = false }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  const deleteButtonAlert = () =>
    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      {
        text: "CANCEL",
        style: "cancel",
      },
      { text: "DELETE", onPress: () => deleteReview(review.id) },
    ]);

  return (
    <View style={{ backgroundColor: theme.colors.repositoryItemBackground }} testID="repositoryItem">
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <View
          style={{
            width: ratingWidth,
            height: 40,
            marginLeft: 10,
            marginTop: 10,
            borderRadius: ratingWidth / 2,
            borderWidth: 2,
            borderColor: theme.colors.button,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text fontWeight="bold" style={{ color: theme.colors.button }}>
            {review.rating}
          </Text>
        </View>
        <View style={{ flexDirection: "column", marginHorizontal: 20, marginTop: 10, flexShrink: 1, alignItems: "flex-start" }}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
          {review.text && review.text !== "" ? <Text style={{ marginTop: 8 }}>{review.text}</Text> : null}
        </View>
      </View>
      {buttons === true && (
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
          <View style={{ flexGrow: 1, marginLeft: 10, marginRight: 5 }}>
            <Pressable
              onPress={() => navigate(`/${review.repositoryId}`)}
              style={{ borderRadius: 5, marginTop: 10, backgroundColor: theme.colors.button, paddingVertical: 15 }}
            >
              <Text style={{ textAlign: "center" }} color="textSecondary">
                View repository
              </Text>
            </Pressable>
          </View>
          <View style={{ flexGrow: 1, marginLeft: 5, marginRight: 10 }}>
            <Pressable
              onPress={deleteButtonAlert}
              style={{ borderRadius: 5, marginTop: 10, backgroundColor: theme.colors.delete, paddingVertical: 15, paddingHorizontal: 20 }}
            >
              <Text style={{ textAlign: "center" }} color="textSecondary">
                Delete review
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default RepositoryReviewItem;
