import { GetServerSidePropsContext } from "next";
import { getAllIds, getAllUpdate } from "../lib/posts";

async function generateSitemapXml(ids: string[], updates: string[]) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  xml += `
  <url>
        <loc>https://mixblog.vercel.app/</loc>
        <lastmod>2021-03-07</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
  `;
  ids.forEach(async (id, count) => {
    xml += `
      <url>
        <loc>https://mixblog.vercel.app/contents/${id}</loc>
        <lastmod>${updates[count]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      `;
  });
  xml += "</urlset>";

  return xml;
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const updates = getAllUpdate();
  const ids = getAllIds();
  const xml = await generateSitemapXml(ids, updates); // xmlコードを生成する処理（後で書く）
  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);
  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
