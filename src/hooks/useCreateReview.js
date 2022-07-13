import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutation, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    let fields = {
      repositoryName: repositoryName,
      ownerName: ownerName,
      rating: parseInt(rating),
    };
    if (text !== "") {
      fields.text = text;
    }
    const answer = await mutation({ variables: fields });
    return answer;
  };

  return [createReview, result];
};

export default useCreateReview;
