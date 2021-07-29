import HeaderStyle from "./../style/Header.module.scss";
import Link from "next/link";
import HeaderIcon from "./icon/HeaderIcon";
const Header = () => {
  return (
    <header className={HeaderStyle.header}>
      <Link href="/">
        <a>
          <HeaderIcon />
        </a>
      </Link>
    </header>
  );
};

export default Header;
