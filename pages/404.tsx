import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TopButton from "../components/TopButton";
import custom404Style from "./../style/custom404.module.scss";
import utilStyle from "../style/utils.module.scss";
const Custom404 = () => {
  return (
    <>
      <TopButton />
      <Header />
      <Navbar />
      <div className={`wrapper ${utilStyle.block}`}>
        <h1 className={custom404Style.error}>404</h1>
        <h2 className={custom404Style.error_message}>
          お探しのページは存在しません。
        </h2>
      </div>
    </>
  );
};

export default Custom404;
