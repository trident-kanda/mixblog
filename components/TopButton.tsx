import topButtonStyle from "../style/topButton.module.scss";
import ArrowIcon from "./icon/arrowIcon";

const TopButton = () => {
  return (
    <div className={topButtonStyle.circle}>
      <ArrowIcon />
    </div>
  );
};

export default TopButton;
