import "./EmptyList.scss";
import getImageKey from "../getImageKey";
import { useNavigate } from "react-router-dom";

const EmptyList = (props) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="empty">
        {props.title === undefined ? (
          <></>
        ) : (
          <>
            <div className="empty__title">
              <button className="empty__title__back" onClick={navigate(-1)}>
                <img src={getImageKey("ArrowBack")} alt="#"></img>
              </button>
              <p className="empty__title__text"> {props.title} </p>
            </div>
          </>
        )}
        <div className="empty__content">
          <img
            src={getImageKey(props.img)}
            alt=""
            className="empty__content__img"
          />
          <p className="empty__content__text"> {props.text} </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
