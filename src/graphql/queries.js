import { gql } from "@apollo/client";
import { REPOSITORIES_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection!, $orderBy: AllRepositoriesOrderBy!, $searchKeyword: String, $first: Int!, $after: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryInformation
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORIES_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int!, $after: String) {
    repository(id: $id) {
      ...RepositoryInformation
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORIES_FIELDS}
`;

export const GET_ACCOUNTINFORMATION = gql`
  query AccountInformation($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
