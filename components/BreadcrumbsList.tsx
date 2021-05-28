import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";
import BreadcrumbsStyle from "./../style/Breadcrumbs.module.scss";
import { Typography } from "@material-ui/core";
import { breadprops } from "../lib/tsutil";
const BreadcrumbsList = ({ list }: breadprops) => {
  return (
    <div className={BreadcrumbsStyle.breadcrumbs_container}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href="/">
          <a>Home</a>
        </Link>
        {list.map((element: string, count: number) => {
          if (count === list.length - 1) {
            return (
              <Typography className={BreadcrumbsStyle.capitalize} key={count}>
                {element}
              </Typography>
            );
          } else {
            return (
              <Link href={`/category/${element}`} key={count}>
                <a className={BreadcrumbsStyle.capitalize}>{element}</a>
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsList;
