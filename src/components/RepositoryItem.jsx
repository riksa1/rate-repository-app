import { View, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import ItemBottom from "./ItemBottom";
import * as Linking from "expo-linking";

const RepositoryItem = ({ item, button = false }) => {
  return (
    <View style={{ backgroundColor: theme.colors.repositoryItemBackground }} testID="repositoryItem">
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={{ width: 40, height: 40, marginLeft: 10, marginTop: 10, borderRadius: 5 }} />
        <View style={{ flexDirection: "column", marginLeft: 20, marginTop: 10, flexShrink: 1, alignItems: "flex-start" }}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text style={{ marginTop: 5 }}>{item.description}</Text>
          <Text color="textSecondary" style={{ backgroundColor: theme.colors.languageTag, padding: 4, borderRadius: 5, marginTop: 5 }}>
            {item.language}
          </Text>
        </View>
      </View>
      <ItemBottom item={item} />
      {button === true && (
        <View>
          <Pressable
            onPress={() => Linking.openURL(item.url)}
            style={{ borderRadius: 5, marginVertical: 10, backgroundColor: theme.colors.button, paddingVertical: 15 }}
          >
            <Text color="textSecondary" style={{ textAlign: "center" }}>
              Open in GitHub
            </Text>
          </Pressable>
          <View style={{ backgroundColor: theme.colors.mainBackground, height: 10 }}></View>
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
