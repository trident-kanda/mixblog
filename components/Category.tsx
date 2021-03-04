import { categorycomprops } from "../lib/tsutil";
import articlestyles from "../style/category.module.scss";
const Category = ({ category }: categorycomprops) => {
  return (
    <div className={articlestyles.category_container}>
      <p>CATEGORY</p>
      <h2>{category}</h2>
    </div>
  );
};

export default Category;
