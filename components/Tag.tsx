import articlestyles from "../style/category.module.scss";
type props = {
  tag: string;
};
const Tag = ({ tag }: props) => {
  return (
    <div className={articlestyles.category_container}>
      <p>TAG</p>
      <h2>{tag}</h2>
    </div>
  );
};

export default Tag;
