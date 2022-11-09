import { gql } from "@apollo/client";

export default gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 5) {
          edges {
            node {
              id
              databaseId
              excerpt
              title
              slug
            }
          }
        }
    }`;
