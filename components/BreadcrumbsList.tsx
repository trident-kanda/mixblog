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
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        {list.map((element: string, count: number) => {
          if (count === list.length - 1) {
            return (
              <div key={count}>
                <Typography className={BreadcrumbsStyle.capitalize}>
                  {element}
                </Typography>
              </div>
            );
          } else {
            return (
              <div key={count}>
                <Link href={`/category/${element}`}>
                  <a className={BreadcrumbsStyle.capitalize}>{element}</a>
                </Link>
              </div>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsList;
