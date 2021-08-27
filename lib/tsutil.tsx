type articleData = {
  category: string;
  date: string;
  description: string;
  id: string;
  title: string;
  update: string;
  tag: string[];
};

export interface indexprops {
  length: number;
  postsData: articleData[];
  lateStart: articleData[];
  popularData: articleData[];
}

export interface pageprops {
  length: number;
  page: string;
  postsData: articleData[];
  lateStart: articleData[];
  popularData: articleData[];
}
export interface idprops {
  postData: {
    title: string;
    category: string;
    date: string;
    description: string;
    id: string;
    contentHtml: string;
    update: string;
    tag: string[];
  };
  lateStart: articleData[];
  popularData: articleData[];
}
export interface idparams {
  params: {
    id: string;
  };
}
export interface idcategoryparams {
  params: {
    page: [string, string, number];
  };
}
export interface categoryprops {
  length: number;
  postsData: articleData[];
  lateStart: articleData[];
  popularData: articleData[];
}
export interface categorypageprops {
  length: number;
  category: string;
  page: string;
  postsData: articleData[];
  lateStart: articleData[];
  popularData: articleData[];
}
export interface articleprops {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
}
export interface asideprops {
  lateStart: articleData[];
  popularData: articleData[];
}
export interface asidearticleprops {
  articleData: articleData[];
}
export interface breadprops {
  list: string[];
}
export interface categorycomprops {
  category: string;
}
export interface commonprops {
  children: React.ReactNode;
  lateStart: articleData[];
  popularData: articleData[];
}
export interface paginationbarprops {
  count: number;
  page: number;
  category: string;
  tag?: string;
}
