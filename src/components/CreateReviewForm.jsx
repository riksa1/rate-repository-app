import { Pressable, View } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Repository owner name is required"),
  rating: yup.number().required("Rating is required").min(0, "Minimum atleast 0").max(100, "Allow maximum is 100"),
  text: yup.string(),
});

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: null,
  text: "",
};

const CreateReviewFormFields = ({ onSubmit }) => {
  return (
    <View style={{ width: "80%" }}>
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={{ borderRadius: 5, marginTop: 10, backgroundColor: theme.colors.button, paddingVertical: 15 }}>
        <Text color="textSecondary" style={{ textAlign: "center" }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await createReview({ repositoryName, ownerName, rating, text });

      if (data) {
        navigate(`/${data.createReview.repositoryId}`, { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewFormFields onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReviewForm;
