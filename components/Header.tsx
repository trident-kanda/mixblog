import HeaderStyle from "./../style/Header.module.scss";
import utilStyle from "./../style/utils.module.scss";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className={HeaderStyle.header}>
      <Link href="/">
        <a>
          <Image
            src="/logo.png"
            alt="MIXBLOG"
            width={297}
            height={135}
            className={utilStyle.pointer}
          />
        </a>
      </Link>
    </header>
  );
};

export default Header;
