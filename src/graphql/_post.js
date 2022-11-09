import { gql } from "@apollo/client";

// you can use with your method too, like passing as separate variable
// query: gql`.....`, variables{}
// but i have faced many issues so better return the query as string from function.


export const All_POSTS_SLUGS = (limit = 3000)=> {
  return gql`
    {posts (first:${limit}) {
        nodes {
          slug
        }
      }
    }`
  }

export const POST_QUERY = (slug) =>{
 return gql`{
      postBy(slug: "${slug}") {
        id
        content(format:RENDERED)
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
            srcSet
            altText
          }
        }
        seo{
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphSiteName
          opengraphDescription
          opengraphUrl
          opengraphType
          opengraphAuthor
          opengraphImage{
            mediaItemUrl
          }
          opengraphPublishedTime
          readingTime
        }
      }
    }
    `
}
