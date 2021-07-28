import topButtonStyle from "../style/topButton.module.scss";
import ArrowIcon from "./icon/ArrowIcon";
const returnTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const TopButton = () => {
  return (
    <div className={topButtonStyle.circle} onClick={returnTop}>
      <ArrowIcon />
    </div>
  );
};

export default TopButton;
