import "./TakenBook.scss";
import getImageKey from "./../../../components/getImageKey";
import { useInfoUserId } from "./../../../api/api";
import { AdminTakenCard } from "../AdminTakenCard/AdminTakenCard";
export const TakenBook = ({ handleTaken, id }) => {
  const { infoUser } = useInfoUserId(id);
  console.log(infoUser.bookid);
  return (
    <div className="taken-book">
      <div className="taken-book__wrapper">
        <h3 className="taken-book__title">Взятые книги</h3>
        <button className="taken-book__btn" onClick={handleTaken}></button>
        <div className="taken-book__info">
          <img
            className="taken-book__info-avatar"
            src={getImageKey("UserIcon")}
            alt=""
          />
          <div className="taken-book__info-text">
            <div className="fullname">
              <span>{infoUser.name}</span>
              <span>{infoUser.surname}</span>
            </div>
            <span>{infoUser.email}</span>
          </div>
        </div>
        <hr />
        <div className="taken-book__list">{infoUser.bookid + ""}</div>
      </div>
    </div>
  );
};
