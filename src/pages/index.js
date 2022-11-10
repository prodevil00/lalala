import Head from "next/head";
import client from "../graphql/client";
import { gql } from "@apollo/client";
import Link from "next/link";

async function queryData(size, offset) {
  const { data } = await client.query({
    query: gql`{
      posts(where:{offsetPagination:{size:${size}, offset:${offset}}}){
        edges{
          node{
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
      }
  }`
  });
  return data;
}


export default function Posts({posts}){
  const Copy = (p,e) =>{
    navigator.clipboard.writeText(p).then(()=>{
      e.target.innerHTML = "Copied";
      setTimeout(()=>{
        e.target.innerHTML = "Copy";
      },1000);
    })
  }
    return (
        <>
        <Head>
            <title>All Posts</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <section className="section">
            <div className="container">
              <h1 className="title">
                Posts
              </h1>
              <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Featured Image</th>
                            <th>Copy url</th>
                            <th>Share on FB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length && posts.map((post) => (
                            <tr>
                                <td><Link href={post.path}>{post?.title}</Link></td>
                                <td><img width={70} height={70} src={post?.image} /></td>
                                <td><button className="button is-success is-light" onClick={(e)=>Copy(post?.url, e)}>Copy</button></td>
                                <td><a href={`https://www.facebook.com/sharer/sharer.php?u=${post?.url}`} target="_blank">Share on FB</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
        </section>
        </>
    )
}

export async function getServerSideProps(context){
  const protocol = context.req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = context.req ? `${protocol}://${context.req.headers.host}` : ''

    const data1 = await queryData(100, 0);
    const data2 = await queryData(100, 100);
    const data3 = await queryData(100, 200);
    const data4 = await queryData(100, 300);

    const data = [...data1.posts.edges, ...data2.posts.edges, ...data3.posts.edges, ...data4.posts.edges];
  
    return {
      props: {
        posts: data.map(({ node }) => {
          return {
            title: node.title,
            slug: node.slug,
            image: node.featuredImage?.node?.sourceUrl,
            path: `/post/${node.slug}?cnt=${node.databaseId.toString()}`,
            url: `${baseUrl}/post/${node.slug}?cnt=${node.databaseId.toString()}`,
            // path: `https://foreverloveanimal.vercel.app/post/${node.slug}?cnt=${node.databaseId.toString()}`
          }
        })
      }
    }
  }