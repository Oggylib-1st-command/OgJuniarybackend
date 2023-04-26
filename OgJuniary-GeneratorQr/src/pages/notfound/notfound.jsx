import "./notfound.scss";
import getImageKey from "../../components/getImageKey";

function NotFound() {
  return (
    <div className="notfound__inner">
      <img
        className="notfound__background"
        src={getImageKey("NotFound")}
        alt="background 404"
      />
    </div>
  );
}

export default NotFound;
