import ArrowIcon from "./icon/ArrowIcon";
const returnTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const TopButton = () => {
  return (
    <div className="circle" onClick={returnTop}>
      <ArrowIcon />
    </div>
  );
};

export default TopButton;
