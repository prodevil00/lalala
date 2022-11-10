import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

//Query
import {All_POSTS_SLUGS, POST_QUERY} from "../../graphql/_post";
import client from "../../graphql/client";


export default function Post({ post }) {
  return (
    <div className={`${styles.container} container`}>
      <Head>
        <title>{ post?.title }</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={post?.seo?.opengraphDescription || ""} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
        <link rel="canonical" href={post?.seo?.canonical} />
	      <meta property="og:locale" content="en_US" />
	      <meta property="og:type" content="article" />
	      <meta property="og:title" content={post?.seo?.title} />
	      <meta property="og:description" content={post?.seo?.opengraphDescription || ""} />
	      <meta property="og:url" content={post?.seo?.canonical} />
	      <meta property="og:site_name" content={post?.seo?.opengraphSiteName} />
	      <meta property="article:published_time" content={post?.seo?.opengraphPublishedTime} />
	      <meta property="og:image" content={post?.seo?.opengraphImage?.mediaItemUrl || ""} />
	      <meta property="og:image:width" content="960" />
	      <meta property="og:image:height" content="536" />
	      <meta property="og:image:type" content="image/jpeg" />
	      <meta name="author" content="admin" />
	      <meta name="twitter:card" content="summary_large_image" />
	      <meta name="twitter:label1" content="Written by"/>
	      <meta name="twitter:data1" content={post?.seo?.opengraphAuthor || ""} />
	      <meta name="twitter:label2" content="Est. reading time"/>
	      <meta name="twitter:data2" content={post?.seo?.readingTime || ""} />
      </Head>

      <main className={`${styles.main} card mt-5`}>
      <nav class="navbar is-dark m-4 p-2" style={{width:"100%", borderRadius:"10px"}} role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a href="#home" class="navbar-item">
              Home
            </a>
            <a href='#news' class="navbar-item">
              News
            </a>
            <a href="#contact" class="navbar-item">
              Contact
            </a>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href='#about' class="button is-primary">
                <strong>About</strong>
              </a>
            </div>
          </div>
        </div>

      </nav>
        <h1 className={styles.title}>
          { post?.title }
        </h1>

        {/* featured img comment this out since your wp content already has featured img */}
        {/* <img src={post?.featuredImage.node.mediaItemUrl} alt={post?.featuredImage.node.altText} /> */}

        <div className={styles.grid}>
          <div className={`${styles.content} content`} dangerouslySetInnerHTML={{
            __html: post?.content
          }} />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>
              &lt; Back to home
            </a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps({params}){
  const {data} = await client.query({
    query: POST_QUERY(params.postSlug)
  });

  const post = data?.postBy;
  if ( !post ) {
    return {
      props: {},
      notFound: true
    }
  }


  return {
    props: {
      post,
    }
  }


}


export async function getStaticPaths(){

  const {data} = await client.query({
      query: All_POSTS_SLUGS()
  });
  const paths = [];
  data.posts.nodes?.map(post=>{
      paths.push({params: {postSlug: post.slug}})
  })

  return {
      paths,
      fallback: 'blocking' // true will be better option
  }
  
}
