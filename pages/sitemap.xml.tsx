import { GetServerSidePropsContext } from "next";

async function generateSitemapXml() {
  const { SitemapStream, streamToPromise } = require("sitemap");
  const { Readable } = require("stream");

  // An array with your links
  const links = [{ url: "/page-1/", changefreq: "daily", priority: 0.3 }];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: "https://mixblog.vercel.app/" });

  // Return a promise that resolves with your XML string
  return streamToPromise(Readable.from(links).pipe(stream)).then((data: any) =>
    data.toString()
  );
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  // この中でサイトマップのコードを生成して返す
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）
  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);
};

const Page = () => null;
export default Page;
