import Image from "next/image";
import Link from "next/link";
import utilstyles from "../style/utils.module.scss";
import articlestyles from "../style/article.module.scss";
import { articleprops } from "./../lib/tsutil";
const Article = ({ category,tag, id, title, description, date }: articleprops) => {
  return (
    <article className={articlestyles.article}>
      <div className={articlestyles.article_container}>
        <div className={articlestyles.category}>
          {
            tag &&
            <Link href={`/tag/${category}`}>
            <a>{category}</a>
          </Link>       
          }
          {
            category &&
            <Link href={`/category/${category}`}>
            <a>{category}</a>
          </Link>
          }
        </div>
        <Link href={`/contents/${id}`}>
          <a>
            <Image
              className={utilstyles.pointer}
              src={`/tmb/${id}.png`}
              alt="Thumbnails"
              width={1200}
              height={630}
            />
          </a>
        </Link>

        <p className={articlestyles.date}>{date}</p>
        <div className={articlestyles.title}>
          <h2>
            <Link href={`/contents/${id}`}>
              <a className={utilstyles.pointer}>{title}</a>
            </Link>
          </h2>
        </div>
        <div className={articlestyles.description}>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Article;
