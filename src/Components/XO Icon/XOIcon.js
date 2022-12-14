import xIcon from "../../Assets/X.svg";
import oIcon from "../../Assets/O.svg";
import "./XOIcon.css";

const XOIcon = ({ name }) => {
  switch (name) {
    case "circle":
      return (
        <img src={oIcon} alt="" height="70%" width="70%" className="xoIcon" />
      );
    case "cross":
      return (
        <img src={xIcon} alt="" height="70%" width="70%" className="xoIcon" />
      );

    default:
      return <div className="blankCard"></div>;
  }
};

export default XOIcon;
