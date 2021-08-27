import Router from "next/router";
import Pagination from "@material-ui/lab/Pagination";
import paginationStyle from "./../style/pagination.module.scss";
import { useState } from "react";
import { paginationbarprops } from "../lib/tsutil";
const Paginationbar = ({ count, page, category, tag }: paginationbarprops) => {
  const [nowpage, change] = useState(page);
  const onChange = (e: any, value: number) => {
    if (category === "home") {
      //1の時index 2以上はそのまま
      if (value === 1) {
        Router.push("/");
      } else {
        Router.push(`/page/${value}`);
      }
    }
    if (tag) {
      if (value === 1) {
        Router.push(`/tag/${tag}`);
      } else {
        Router.push(`/category/${tag}/page/${value}`);
      }
    } else {
      if (value === 1) {
        Router.push(`/category/${category}`);
      } else {
        Router.push(`/category/${category}/page/${value}`);
      }
    }
  };
  return (
    <div className={paginationStyle.pagination}>
      <Pagination
        count={count}
        size="large"
        onChange={onChange}
        defaultPage={nowpage}
      />
    </div>
  );
};

export default Paginationbar;
