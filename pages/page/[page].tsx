import Head from "next/head";
import Paginationbar from "../../components/Paginationbar";
import {
  getDesignatedPagearticle,
  getDesignationNameArticle,
  getLatestarticle,
  getPagelength,
  getPagePaths,
} from "../../lib/posts";
import Article from "../../components/Article";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { getPopularData } from "../../firebase/firestore";
import { pageprops } from "../../lib/tsutil";
const Page = ({
  length,
  page,
  postsData,
  lateStart,
  popularData,
}: pageprops) => {
  const pageNum = Number(page);
  return (
    <div>
      <Head>
        <title>MIXBLOG | page{page}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Header />
      <Navbar />
      <Layout lateStart={lateStart} popularData={popularData}>
        <div className="article_container">
          {postsData.map(({ id, date, title, category, description }) => (
            <Article
              id={id}
              date={date}
              title={title}
              key={id}
              category={category}
              description={description}
            />
          ))}
        </div>
        <Paginationbar count={length} page={pageNum} category={"home"} />
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = getPagePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { page: number } }) {
  const length = getPagelength(); //ページの必要数
  const page = params.page;
  const postsData = getDesignatedPagearticle(page);
  const lateStart = getLatestarticle();
  const popularItem = await getPopularData();
  const popularData = getDesignationNameArticle(popularItem);
  return {
    props: {
      length,
      page,
      postsData,
      lateStart,
      popularData,
    },
  };
}
export default Page;
