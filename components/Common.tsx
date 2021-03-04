import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { commonprops } from "../lib/tsutil";
import Aside from "./Aside";
import Footer from "./Footer";
const Common = ({ children, lateStart, popularData }: commonprops) => {
  return (
    <div>
      <div className="wrapper">
        <main>
          <div className="container">{children}</div>
        </main>
        <Aside lateStart={lateStart} popularData={popularData} />
      </div>
      <Footer />
    </div>
  );
};

export default Common;
