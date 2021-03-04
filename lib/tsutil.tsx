export interface indexprops {
  length: number;
  postsData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface pageprops {
  length: number;
  page: string;
  postsData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface idprops {
  postData: {
    title: string;
    category: string;
    date: string;
    description: string;
    id: string;
    contentHtml: string;
  };
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
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
  postsData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface categorypageprops {
  length: number;
  category: string;
  page: string;
  postsData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface articleprops {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
}
export interface asideprops {
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface asidearticleprops {
  articleData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface breadprops {
  list: string[];
}
export interface categorycomprops {
  category: string;
}
export interface commonprops {
  children: React.ReactNode;
  lateStart: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
  popularData: {
    category: string;
    date: string;
    description: string;
    id: string;
    title: string;
  }[];
}
export interface paginationbarprops {
  count: number;
  page: number;
  category: string;
}
