import { View } from "react-native";
import Text from "./Text";

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" : Math.sign(num) * Math.abs(num);
}

const ItemBottom = ({ item }) => {
  return (
    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
      <View style={{ flexGrow: 2, flexShrink: 1, flexBasis: "auto", alignItems: "center" }}>
        <Text fontWeight="bold">{kFormatter(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={{ flexGrow: 2, flexShrink: 1, flexBasis: "auto", alignItems: "center" }}>
        <Text fontWeight="bold">{kFormatter(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={{ flexGrow: 2, flexShrink: 1, flexBasis: "auto", alignItems: "center" }}>
        <Text fontWeight="bold">{kFormatter(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={{ flexGrow: 2, flexShrink: 1, flexBasis: "auto", alignItems: "center" }}>
        <Text fontWeight="bold">{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default ItemBottom;
