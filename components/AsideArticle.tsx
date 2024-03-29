import Link from "next/link";
import Image from "next/image";
import utilstyles from "../style/utils.module.scss";
import articlestyles from "../style/asidearticle.module.scss";
import { asidearticleprops } from "../lib/tsutil";
const AsideArticle = ({ articleData }: asidearticleprops) => {
  return (
    <>
      {articleData.map(({ id, title }) => (
        <div key={id} className={articlestyles.content}>
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
          <div className={articlestyles.title}>
            <Link href={`/contents/${id}`}>
              <a>{title}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default AsideArticle;
