"./adminUsersCard.scss";
import getImageKey from "./../../../components/getImageKey";
import { Link } from "react-router-dom";
export const AdminUsersEdit = ({
  handleDelete,
  handleTaken,
  handleEdit,
  userName,
  surname,
  mail,
  id,
}) => {
  return (
    <>
      <div className="users__info">
        <img
          className="users__info-avatar"
          src={getImageKey("UserIcon")}
          alt=""
        />
        <div className="users__info-text">
          <div className="fullname">
            <span>{userName}</span>
            <span>{surname}</span>
          </div>
          <span>{mail}</span>
        </div>
      </div>
      <div className="users__options">
        <div className="users__choosen">
          <span>
            <Link
              className="users__choosen-text"
              to="#"
              onClick={() => handleTaken(id)}
            >
              Перейти в “Взятые книги”
            </Link>
          </span>
        </div>
        <div className="users__options-img">
          <img
            className="users__options-edit"
            src={getImageKey("IconEdit")}
            alt="edit icon"
            onClick={handleEdit}
          ></img>
          <img
            className="users__options-delete"
            src={getImageKey("IconTrash")}
            alt="delete icon"
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
    </>
  );
};
