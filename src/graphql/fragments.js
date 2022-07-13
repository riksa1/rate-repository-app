import { gql } from "@apollo/client";

export const REPOSITORIES_FIELDS = gql`
  fragment RepositoryInformation on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;
