import {
  getAllPostIds,
  getDesignationNameArticle,
  getLatestarticle,
  getPostData,
} from "../../lib/posts";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import maintextStyle from "./../../style/maintext.module.scss";
import Navbar from "../../components/Navbar";
import Common from "../../components/Common";
import BreadcrumbsList from "../../components/BreadcrumbsList";
import { useEffect } from "react";
import { countdb, getsort } from "../../firebase/firestore";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { idparams, idprops } from "../../lib/tsutil";
const Contents = ({ postData, lateStart, popularData }: idprops) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("xml", html);
    hljs.registerLanguage("css", css);
    hljs.highlightAll();
    countdb(postData.id);
  }, []);
  return (
    <div>
      <Head>
        <title>{postData.title} | MIXBLOG</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={postData.description} />
      </Head>
      <Header />
      <Navbar />
      <div className={maintextStyle.title}>
        <h1>{postData.title}</h1>
      </div>
      <Common lateStart={lateStart} popularData={popularData}>
        <BreadcrumbsList list={[postData.category, postData.title]} />
        <div className={maintextStyle.main_container}>
          <p className={maintextStyle.date}>{postData.date}</p>
          <Image
            src={`/tmb/${postData.id}.png`}
            alt="Thumbnails"
            width={1200}
            height={630}
          />
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className={maintextStyle.text_container}
          />
        </div>
      </Common>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: idparams) {
  const postData = await getPostData(params.id);
  const lateStart = getLatestarticle();
  const popularItem = await getsort();
  const popularData = getDesignationNameArticle(popularItem);

  return {
    props: {
      postData,
      lateStart,
      popularData,
    },
  };
}

export default Contents;
