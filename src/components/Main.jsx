import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import theme from "../theme";
import { Route, Routes, Navigate } from "react-router-native";
import useCheckAccount from "../hooks/useCheckAccount";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import MyReviewsList from "./MyReviewsList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  const { accountInformation } = useCheckAccount();

  return (
    <View style={styles.container}>
      <AppBar accountInformation={accountInformation} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        {!accountInformation && <Route path="/signup" element={<SignUp />} exact />}
        {accountInformation && <Route path="/createreview" element={<CreateReview />} exact />}
        {accountInformation && <Route path="/myreviews" element={<MyReviewsList />} exact />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
