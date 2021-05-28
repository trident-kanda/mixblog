import { commonprops } from "../lib/tsutil";
import Aside from "./Aside";
import Footer from "./Footer";
const Layout = ({ children, lateStart, popularData }: commonprops) => {
  return (
    <>
      <div className="wrapper">
        <main>
          <div className="container">{children}</div>
        </main>
        <Aside lateStart={lateStart} popularData={popularData} />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
