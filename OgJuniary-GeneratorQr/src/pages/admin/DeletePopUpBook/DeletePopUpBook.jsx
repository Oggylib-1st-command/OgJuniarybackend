import axios from "axios";
import "./DeletePopUpBook.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

function DeletePop(props) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:8000/api/books/${props.id}`);
    navigate(-1);
  };
  return (
    <div
      className={
        !props.isActive ? "DeletePop__bg" : "DeletePop__bg DeletePop--active"
      }
    >
      <div
        className={
          !props.isActive ? "DeletePop" : "DeletePop DeletePop--active"
        }
      >
        <p className="DeletePop__text">Вы точно хотите удалить книгу?</p>
        <div className="DeletePop__but">
          <button className="DeletePop__but__Yes" onClick={handleDelete}>
            Да
          </button>
          <button className="DeletePop__but__No" onClick={props.handleClose}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePop;
