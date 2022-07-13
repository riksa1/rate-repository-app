import { useEffect } from "react";
import { View, FlatList } from "react-native";
import useCheckAccount from "../hooks/useCheckAccount";
import { ItemSeparator } from "./RepositoryList";
import RepositoryReviewItem from "./RepositoryReviewItem";

const MyReviewsList = () => {
  const { reviews, refetch } = useCheckAccount();
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  useEffect(() => {
    refetch({ includeReviews: true });
  }, []);

  return (
    <View>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <RepositoryReviewItem review={item} buttons />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyReviewsList;
