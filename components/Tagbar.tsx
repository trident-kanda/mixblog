import Link from "next/link";
import tagStyle from "../style/tag.module.scss";
type props = {
  tagList: string[];
};
const Tagbar = ({ tagList }: props) => {
  return (
    <div className={tagStyle.tag_container}>
      {tagList.map((tag, num) => {
        return (
          <Link href={`/tag/${tag}`} key={num}>
            <a className={tagStyle.tag}>{tag}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default Tagbar;
