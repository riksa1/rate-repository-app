import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import useCheckAcccount from "./useCheckAccount";

const useDeleteReview = () => {
  const { refetch } = useCheckAcccount();
  const [mutation] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutation({ variables: { deleteReviewId: id } });
    refetch({ includeReviews: true });
  };

  return [deleteReview];
};

export default useDeleteReview;
