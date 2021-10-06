import navbarStyles from "../style/navbar.module.scss";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";
const Navbar = () => {
  return (
    <>
      <div className={navbarStyles.category_container}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/category/game">
          <a>Game</a>
        </Link>
        <Link href="/category/music">
          <a>Music</a>
        </Link>
        <Link href="/category/web">
          <a>Web</a>
        </Link>
        <Link href="/category/other">
          <a>Other</a>
        </Link>
      </div>
      <div className={navbarStyles.accordion_container}>
        <input type="checkbox" id="check" className={navbarStyles.checkbox} />
        <div className={navbarStyles.label_container}>
          <label htmlFor="check">
            <p>Menu</p>
            <HamburgerIcon />
          </label>
        </div>
        <ul className={navbarStyles.contents}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/category/game">
              <a>Game</a>
            </Link>
          </li>
          <li>
            <Link href="/category/boardgame">
              <a>Boardgame</a>
            </Link>
          </li>
          <li>
            <Link href="/category/web">
              <a>Web</a>
            </Link>
          </li>
          <li>
            <Link href="/category/other">
              <a>Other</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
