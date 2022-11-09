import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

//Query
import HOME_QUERY from "../graphql/_home";
import client from "../graphql/client";


export default function Home({ page, posts }) {
  const { title, description } = page;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{ description }</p>

        <ul className={styles.grid}>
          {posts && posts.length > 0 && posts.map(post => {
            return (
              <li key={post.slug} className={styles.card}>
                <Link href={post.path}>
                  <a>
                    <h3 dangerouslySetInnerHTML={{
                      __html: post.title
                    }} />
                  </a>
                </Link>
                <div dangerouslySetInnerHTML={{
                  __html: post.excerpt
                }} />
              </li>
            );
          })}

          {!posts || posts.length === 0 && (
            <li>
              <p>
                Oops, no posts found!
              </p>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  const { data } = await client.query({
    query: HOME_QUERY
  });

  return {
    props: {
      page: data.generalSettings,
      posts: data.posts.edges.map(({ node }) => {
        return {
          title: node.title,
          excerpt: node.excerpt,
          slug: node.slug,
          path: `/post/${node.slug}?cnt=${node.databaseId.toString()}`
        }
      })
    }
  }
}
