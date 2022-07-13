import { View } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from "react-native";
import RepositoryReviewItem from "./RepositoryReviewItem";
import { ItemSeparator } from "./RepositoryList";

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} button={true} />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View>
      <RepositoryReviewItem review={review} />
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, loading, fetchMore } = useRepository({ id: id, first: 8 });
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  if (loading || !repository) {
    return null;
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
