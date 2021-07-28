import Head from "next/head";
import Article from "../../components/Article";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Paginationbar from "../../components/Paginationbar";
import {
  getCategoryArticle,
  getCategoryPagelength,
  getDesignationNameArticle,
  getLatestarticle,
} from "../../lib/posts";
import Layout from "../../components/Layout";
import Category from "../../components/Category";
import BreadcrumbsList from "../../components/BreadcrumbsList";
import { getsort } from "../../firebase/firestore";
import { categoryprops } from "../../lib/tsutil";
import TopButton from "../../components/TopButton";
const Boardgame = ({
  length,
  postsData,
  lateStart,
  popularData,
}: categoryprops) => {
  return (
    <div>
      <Head>
        <title>Boardgame | MIXBLOG</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <TopButton />
      <Header />
      <Navbar />
      <Category category={"boardgame"} />
      <Layout lateStart={lateStart} popularData={popularData}>
        <BreadcrumbsList list={["boardgame"]} />
        <div className="articles_container">
          {postsData.map(({ id, date, title, description }) => (
            <Article
              id={id}
              date={date}
              title={title}
              key={id}
              description={description}
              category={"boardgame"}
            />
          ))}
        </div>
        <Paginationbar count={length} page={1} category={"boardgame"} />
      </Layout>
    </div>
  );
};
export async function getStaticProps() {
  const length = getCategoryPagelength("boardgame");
  const postsData = getCategoryArticle("boardgame", 1);
  const lateStart = getLatestarticle();
  const popularItem = await getsort();
  const popularData = getDesignationNameArticle(popularItem);
  return {
    props: {
      length,
      postsData,
      lateStart,
      popularData,
    },
  };
}
export default Boardgame;
