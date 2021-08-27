import fs from "fs";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkrehype from "remark-rehype";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";
import gfm from "remark-gfm";
import html from "rehype-stringify";
import externalLinks from "remark-external-links";
import { NewsItem } from "sitemap";
const slug = require("remark-slug");
//日本語カテゴリ追加予定
const postsDirectory = path.join(process.cwd(), "posts");
const onePagelength = 14; //1ページに表示されるコンテンツ数

//汎用
const getAllPostData = (fileNames: string[]) => {
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
};

const getAllcategoryData = (fileNames: string[]) => {
  //全てのカテゴリを取得
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return matterResult.data.category;
  });
};

const getAlltagData = (fileNames: string[]) => {
  //全てのタグを取得
  const tagData: string[] = [];
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    if (matterResult.data.tag.length === 1) {
      tagData.push(matterResult.data.tag[0]);
    } else {
      matterResult.data.tag.forEach((tag: string) => {
        tagData.push(tag);
      });
    }
  });
  return tagData;
};

const getAllUpdateData = (fileNames: string[]) => {
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return matterResult.data.update;
  });
};

//データ保存
export function getAllIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });
}
//サイトマップで使うアップデートの日付を取得
export function getAllUpdate() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllUpdateData(fileNames);
  return allPostsData;
}
export async function getPostData(id: string) {
  //idの本文を取得
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await unified()
    .use(externalLinks, { target: "_blank", rel: ["nofollow", "noopener"] })
    .use(remarkParse)
    .use(slug)
    .use(remarkrehype)
    .use(gfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: "monokai" }),
    })
    .use(html, {
      upperDoctype: true,
      allowDangerousHtml: true,
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getDesignatedPagearticle(page: number) {
  //ページ数からonepagelength分取得
  let start: number;
  if (page === 1) {
    start = 0;
  } else {
    start = (page - 1) * onePagelength;
  }
  const last = start + onePagelength;
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  const sortData = allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return sortData.slice(start, last);
}

export function getCategoryArticle(category: string, page: number) {
  //カテゴリの記事をすべて取得する  ＊＊変更ページ分を取得
  let start: number;
  if (page === 1) {
    start = 0;
  } else {
    start = (page - 1) * onePagelength;
  }
  const last = start + onePagelength;
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  const filterData = allPostsData.filter((value: any) => {
    return value.category === category;
  });
  const sortData = filterData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortData.slice(start, last);
}

export function getTagArticle(tag: string, page: number) {
  let start: number;
  if (page === 1) {
    start = 0;
  } else {
    start = (page - 1) * onePagelength;
  }
  const last = start + onePagelength;
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  const filterData = allPostsData.filter((value: any) => {
    return value.tag === tag;
  });
  const sortData = filterData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return sortData.slice(start, last);
}

export function getLatestarticle() {
  //最新記事を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  const sortData = allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return sortData.slice(0, 3); //何個取得するか
}

export function getPagelength() {
  //必要なページ数
  const fileNames = fs.readdirSync(postsDirectory);
  //[ 'test.md', 'test2.md', 'test3.md', 'test4.md' ]
  const length = Math.ceil(fileNames.length / onePagelength); //ページ数
  return length;
}

export function getCategoryPagelength(category: string) {
  //必要なページ数
  const fileNames = fs.readdirSync(postsDirectory);
  const allCategoryData = getAllcategoryData(fileNames);
  const filterData = allCategoryData.filter((value: string) => {
    return value === category;
  });
  const length = Math.ceil(filterData.length / onePagelength); //ページ数
  if (length === 0) {
    return 1;
  }
  return length;
}

export function gettagPagelength(tag: string) {
  //指定したtagの必要なページ数
  const fileNames = fs.readdirSync(postsDirectory);
  const allTagData = getAlltagData(fileNames);
  const filterData = allTagData.filter((value: string) => {
    return value === tag;
  });
  const length = Math.ceil(filterData.length / onePagelength); //ページ数
  if (length === 0) {
    return 1;
  }
  return length;
}

export function getDesignationNameArticle(checkArray: string[]) {
  //人気記事を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  const filterData = allPostsData.filter((value) => {
    return checkArray.includes(value.id);
  });
  const sortData = filterData.sort((x, y) => {
    return checkArray.indexOf(x.id) - checkArray.indexOf(y.id);
  });
  return sortData;
}

//params
export function getPagenumber() {
  //ここで必要なページ数を取得(URL用)
  const fileNames = fs.readdirSync(postsDirectory);
  //[ 'test.md', 'test2.md', 'test3.md', 'test4.md' ]
  const pagelength = Math.ceil(fileNames.length / onePagelength); //ページ数
  const pages = [];
  for (let i = 2; i <= pagelength; i++) {
    pages.push(`${i}`);
  }
  return pages.map((element) => {
    return {
      params: {
        page: element,
      },
    };
  });
}

export function getAllPostIds() {
  //全てのidを取得
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getCategoryPagePaths() {
  //ここで必要なページ数を取得(URL用)
  const fileNames = fs.readdirSync(postsDirectory);
  const allCategoryData = getAllcategoryData(fileNames);
  const uniqueCategoryData = Array.from(new Set(allCategoryData));
  const params = uniqueCategoryData.map((Category) => {
    const filterData = allCategoryData.filter((value) => {
      return value === Category;
    });
    const pagelength = Math.ceil(filterData.length / onePagelength);
    const pages = [];
    for (let i = 2; i <= pagelength; i++) {
      pages.push(`${i}`);
    }
    //pages2,3,4
    return pages.map((element) => {
      return { params: { page: [Category, "page", element] } };
    });
  });
  return params.reduce((pre, current) => [...pre, ...current], []);
}

export function getTagPagePaths() {
  //tagに対応したデータを取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allTagData = getAlltagData(fileNames);
  const uniqueTagData = Array.from(new Set(allTagData));
  const params = uniqueTagData.map((tag) => {
    const filterData = allTagData.filter((value) => {
      return value === tag;
    });
    const pagelength = Math.ceil(filterData.length / onePagelength);
    const pages = [];
    for (let i = 1; i <= pagelength; i++) {
      pages.push(`${i}`);
    }
    return pages.map((element: string) => {
      if (element === "1") {
        return { params: { page: [tag] } };
      }
      return { params: { page: [tag, "page", element] } };
    });
  });
  return params.reduce((pre, current) => [...pre, ...current], []);
}

export function getAllcategory() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allCategoryData = getAllcategoryData(fileNames);
  //pathを送信
  return allCategoryData.map((element) => {
    return {
      params: {
        category: element,
      },
    };
  });
}

export function getAlltag() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allCategoryData = getAlltagData(fileNames);
  //pathを送信
  return allCategoryData.map((element) => {
    return {
      params: {
        tag: element,
      },
    };
  });
}
