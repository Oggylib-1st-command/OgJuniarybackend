import "./adminBook.scss";
import { useState, useEffect } from "react";
import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";
import getImageKey from "../../../components/getImageKey";
import { useParams } from "react-router-dom";
import QrPop from "../QrPopUp/QrPopUp";
import DeleetePop from "../DeletePopUpBook/DeletePopUpBook";
import { useInfoBookId } from "../../api";

function AdminBook() {
  const { id } = useParams();
  const { book } = useInfoBookId(id);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleQrPopup = () => {
    setIsQrOpen(!isQrOpen);
  };

  const toggleDeletePopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <div>
      <Header />
      <Search />
      <QrPop isActive={isQrOpen} handleClose={toggleQrPopup} />
      <DeleetePop isActive={isDeleteOpen} handleClose={toggleDeletePopup} id={id} />
      <div className="book__content">
        <div className="book__info">
          <div className="book__wrap">
            <div className="book__canvas">
              <img className="book__canvas-img" src={book.image} alt="book image" />
            </div>
            <div className="book__but">
              <img
                className="book__but__trash"
                src={getImageKey("IconTrash")}
                alt=""
                onClick={toggleDeletePopup}
              />
              <img
                className="book__but__edit"
                src={getImageKey("IconEdit")}
                alt=""
              />
              <img
                className="book__but__QR"
                src={getImageKey("IconQR")}
                alt=""
                onClick={toggleQrPopup}
              />
            </div>
            <div className="book__text">
              <div className="book__text-title">Название: {book.title} </div>
              <div className="book__text-author">Автор: {book.author}</div>
              <div className="book__text-year">Год издания: {book.year}</div>
              <div className="book__text-rating">
                Здесь будет рейтинг, а пока нам плевать на ваше мнение
              </div>
              <div className="book__text-genre">
                <span>Жанры:</span> {book.genres + "  "}
              </div>
              <div className="book__text-description">
                <span>Описание книги:</span> {book.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBook;
