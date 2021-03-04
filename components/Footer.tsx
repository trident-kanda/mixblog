import Link from "next/link";
import footerStyle from "./../style/footer.module.scss";
const Footer = () => {
  return (
    <footer>
      <div className={footerStyle.footer1}>
        <p>
          © 2021
          <Link href="/">
            <a> MIXBLOG</a>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
