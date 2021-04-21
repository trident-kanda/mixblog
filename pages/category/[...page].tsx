import Head from "next/head";
import Article from "../../components/Article";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Paginationbar from "../../components/Paginationbar";
import {
  getCategoryArticle,
  getCategoryPagelength,
  getCategoryPagenumber,
  getDesignationNameArticle,
  getLatestarticle,
} from "../../lib/posts";
import Layout from "../../components/Layout";
import Category from "../../components/Category";
import BreadcrumbsList from "../../components/BreadcrumbsList";
import { getsort } from "../../firebase/firestore";
import { categorypageprops, idcategoryparams } from "../../lib/tsutil";

const Page = ({
  length,
  category,
  page,
  postsData,
  lateStart,
  popularData,
}: categorypageprops) => {
  const pageNum = Number(page);
  const upperCategory = category.slice(0, 1).toUpperCase() + category.slice(1);
  return (
    <div>
      <Head>
        <title>
          {upperCategory} ページ{page} | MIXBLOG
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Header />
      <Navbar />
      <Category category={category} />
      <Layout lateStart={lateStart} popularData={popularData}>
        <BreadcrumbsList list={[category]} />
        <div className="article_container">
          {postsData.map(({ id, date, title, description }) => (
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
        <Paginationbar count={length} page={pageNum} category={category} />
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = getCategoryPagenumber();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: idcategoryparams) {
  const category = params.page[0];
  const page = params.page[2];
  const length = getCategoryPagelength(category);
  const postsData = getCategoryArticle(category, page);
  const lateStart = getLatestarticle();
  const popularItem = await getsort();
  const popularData = getDesignationNameArticle(popularItem);
  return {
    props: {
      length,
      category,
      page,
      postsData,
      lateStart,
      popularData,
    },
  };
}

export default Page;
