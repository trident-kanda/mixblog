import {
  getDesignationNameArticle,
  getLatestarticle,
  getTagArticle,
  gettagPagelength,
  getTagPagePaths,
} from "../../lib/posts";
import { idcategoryparams, tagpageprops } from "../../lib/tsutil";
import Head from "next/head";
import TopButton from "../../components/TopButton";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Tag from "../../components/Tag";
import { getsort } from "../../firebase/firestore";
import Layout from "../../components/Layout";
import BreadcrumbsList from "../../components/BreadcrumbsList";
import Paginationbar from "../../components/Paginationbar";
import Article from "../../components/Article";
const Page = ({
  tag,
  page,
  length,
  lateStart,
  popularData,
  postsData,
}: tagpageprops) => {
  const pageNum = Number(page);
  return (
    <div>
      <Head>
        <title>
          {tag} ページ{page} | MIXBLOG
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <TopButton />
      <Header />
      <Navbar />
      <Tag tag={tag} />
      <Layout lateStart={lateStart} popularData={popularData}>
        <BreadcrumbsList list={[tag]} />
        <div className="articles_container">
          {postsData.map(({ id, date, title, description }) => (
            <Article
              id={id}
              date={date}
              title={title}
              key={id}
              category={tag}
              description={description}
            />
          ))}
        </div>
        <Paginationbar count={length} page={pageNum} tag={tag} />
      </Layout>
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const paths = getTagPagePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: idcategoryparams) {
  const tag = params.page[0];
  let page = params.page[2];
  if (!page) {
    page = 1;
  }
  const length = gettagPagelength(tag);
  const lateStart = getLatestarticle();
  const popularItem = await getsort();
  const popularData = getDesignationNameArticle(popularItem);
  const postsData = getTagArticle(tag, page);
  return {
    props: {
      tag,
      page,
      length,
      lateStart,
      popularData,
      postsData,
    },
  };
}
