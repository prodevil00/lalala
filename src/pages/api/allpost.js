import { gql } from "@apollo/client";
import client from "../../graphql/client";

async function handler(req, res) {
    
    const { data } = await client.query({
        query: gql`{
                posts(first: 200){
                    nodes{
                    databaseId
                    uri
                  }
                }
            }`
    });

    res.status(200).json(data)
  }

export default handler