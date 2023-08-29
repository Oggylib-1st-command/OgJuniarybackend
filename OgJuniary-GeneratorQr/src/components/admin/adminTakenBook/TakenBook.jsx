import "./TakenBook.scss";
import getImageKey from "./../../../components/getImageKey";
import { AdminTakenCard } from "../AdminTakenCard/AdminTakenCard";
import { useInfoUserId } from "./../../../api/api";
export const TakenBook = ({ handleTaken, id }) => {
  const { infoUserId } = useInfoUserId(id);
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
              <span>{infoUserId.name}</span>
              <span>{infoUserId.surname}</span>
            </div>
            <span>{infoUserId.email}</span>
          </div>
        </div>
        <hr />
        <div className="taken-book__list">
          {infoUserId.bookid ? (
            infoUserId.bookid.length > 1 ? (
              infoUserId.bookid.map((book, index) => (
                <AdminTakenCard key={book} id={book} index={index} />
              ))
            ) : (
              <h3>У пользователя нет взятых книг</h3>
            )
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};
