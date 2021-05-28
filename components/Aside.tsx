import { asideprops } from "../lib/tsutil";
import asideStyle from "./../style/aside.module.scss";
import AsideArticle from "./AsideArticle";
const Aside = ({ lateStart, popularData }: asideprops) => {
  return (
    <aside>
      <div className={asideStyle.aside_container}>
        <h2 className={asideStyle.category}>人気記事</h2>
        <AsideArticle articleData={popularData} />
        <h2 className={asideStyle.category}>最新記事</h2>
        <AsideArticle articleData={lateStart} />
      </div>
    </aside>
  );
};

export default Aside;
