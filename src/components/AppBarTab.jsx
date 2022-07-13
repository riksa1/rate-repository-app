import { View, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, link, button }) => {
  return (
    <View>
      {link ? (
        <Link to={link}>
          <Text style={{ padding: 20 }} color="textSecondary">
            {text}
          </Text>
        </Link>
      ) : (
        <Pressable onPress={() => button()}>
          <Text style={{ padding: 20 }} color="textSecondary">
            {text}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AppBarTab;
