import { useQuery } from "@apollo/client/react";
import { GET_ACCOUNTINFORMATION } from "../graphql/queries";

const useCheckAccount = () => {
  const { data, loading, refetch } = useQuery(GET_ACCOUNTINFORMATION, {
    fetchPolicy: "cache-and-network",
  });

  return { accountInformation: data ? data.me : null, reviews: data?.me?.reviews ? data.me.reviews : null, loading: loading, refetch: refetch };
};

export default useCheckAccount;
