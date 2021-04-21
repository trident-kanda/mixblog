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
const slug = require("remark-slug");
//日本語カテゴリ追加予定
const postsDirectory = path.join(process.cwd(), "posts");
const onePagelength = 14; //1ページに表示されるコンテンツ数

//汎用
const getAllPostData = (fileNames: string[]) => {
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id

    return {
      id,
      ...matterResult.data,
    };
  });
};

const getAllcategoryData = (fileNames: string[]) => {
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return matterResult.data.category;
  });
};

const getAllUpdateData = (fileNames: string[]) => {
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
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

export function getAllUpdate() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllUpdateData(fileNames);
  return allPostsData;
}
export async function getPostData(id: string) {
  //idの本文を取得
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(slug)
    .use(remarkrehype)
    .use(gfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: "monokai" }),
    })
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id
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
  // Sort posts by date
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
export function getLatestarticle() {
  //最新記事を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  // Sort posts by date
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

export function getDesignationNameArticle(checkArray: string[]) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = getAllPostData(fileNames);
  // Sort posts by date
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

export function getCategoryPagenumber() {
  //ここで必要なページ数を取得(URL用)
  const fileNames = fs.readdirSync(postsDirectory);
  const allCategoryData = getAllcategoryData(fileNames);
  const uniqueCategoryData = Array.from(new Set(allCategoryData));
  //1
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
