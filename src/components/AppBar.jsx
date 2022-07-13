import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "rgba(52, 52, 52, 0.95)",
  },
});

const AppBar = ({ accountInformation }) => {
  const navigate = useNavigate()
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/")
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="/" />
        {accountInformation && <AppBarTab text="Create a review" link="/createreview" />}
        {accountInformation && <AppBarTab text="My reviews" link="/myreviews" />}
        {accountInformation ? <AppBarTab text="Sign out" button={signOut} /> : <AppBarTab text="Sign in" link="/signin" />}
        {!accountInformation && <AppBarTab text="Sign up" link="/signup" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
