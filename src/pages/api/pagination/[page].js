import { gql } from "@apollo/client";
import client from "../../../graphql/client";

function query(size,offset=0){
    return gql`{
        posts(where:{offsetPagination:{size:${size}, offset:${offset}}}){
            nodes{
                id
                databaseId
                title
                slug
                featuredImage{
                    node{
                        sourceUrl(size:THUMBNAIL)
                    }
                }
            }
        }
    }`
}

async function handler(req, res) {
    const { page } = req.query;
    
    const { data } = await client.query({
        query: query(30, (page-1)*30)
    });

    res.status(200).json(data)
  }

export default handler