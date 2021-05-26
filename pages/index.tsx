import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Paginationbar from "../components/Paginationbar";
import {
  getDesignatedPagearticle,
  getDesignationNameArticle,
  getLatestarticle,
  getPagelength,
} from "../lib/posts";
import Article from "../components/Article";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { getsort } from "../firebase/firestore";
import { indexprops } from "../lib/tsutil";
const Home = ({ postsData, length, lateStart, popularData }: indexprops) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>MIXBLOG</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="ゲーム、ボードゲーム、ウェブ技術など色々な情報を発信するブログです。自分が趣味を通して得た便利な情報や、共有したいと思った情報をマイペースに更新していきます。"
        />
        <meta
          name="google-site-verification"
          content="7W7JOSSyUIT6QHSI1-007H6fs52VA8_3slTP69q2oMM"
        />
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
        <Paginationbar count={length} page={1} category={"home"} />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const postsData = getDesignatedPagearticle(1); //1~14の記事を取得するよう変更
  const length: number = getPagelength(); //ページの必要数
  const lateStart = getLatestarticle();
  const popularItem = await getsort();
  const popularData = getDesignationNameArticle(popularItem);
  return {
    props: {
      postsData,
      length,
      lateStart,
      popularData,
    },
  };
}

export default Home;
