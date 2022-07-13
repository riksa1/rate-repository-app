import { render, within } from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      const { getAllByTestId } = render(
        <NativeRouter>
          <RepositoryListContainer
            repositories={repositories}
            state={{ first: 8, orderDirection: "DESC", orderBy: "CREATED_AT", searchKeyword: "" }}
            setState={() => console.log()}
            onEndReach={() => console.log()}
          />
        </NativeRouter>
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstForks = within(firstRepositoryItem).getByText("1.6k");
      const firstStars = within(firstRepositoryItem).getByText("21.9k");
      const firstRating = within(firstRepositoryItem).getByText("88");
      const firstReviews = within(firstRepositoryItem).getByText("3");
      const secondForks = within(secondRepositoryItem).getByText("69");
      const secondStars = within(secondRepositoryItem).getByText("1.8k");
      const secondRating = within(secondRepositoryItem).getByText("72");
      const secondReviews = within(secondRepositoryItem).getByText("3");

      expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");
      expect(firstRepositoryItem).toHaveTextContent("Build forms in React, without the tears");
      expect(firstRepositoryItem).toHaveTextContent("TypeScript");
      expect(firstForks).toHaveTextContent("1.6k");
      expect(firstStars).toHaveTextContent("21.9k");
      expect(firstRating).toHaveTextContent("88");
      expect(firstReviews).toHaveTextContent("3");
      expect(secondRepositoryItem).toHaveTextContent("async-library/react-async");
      expect(secondRepositoryItem).toHaveTextContent("Flexible promise-based React data loader");
      expect(secondRepositoryItem).toHaveTextContent("JavaScript");
      expect(secondForks).toHaveTextContent("69");
      expect(secondStars).toHaveTextContent("1.8k");
      expect(secondRating).toHaveTextContent("72");
      expect(secondReviews).toHaveTextContent("3");
    });
  });
});
