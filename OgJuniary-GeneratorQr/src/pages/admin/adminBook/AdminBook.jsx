import "./adminBook.scss";
import { useState, useEffect } from "react";
import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";
import getImageKey from "../../../components/getImageKey";
import { Link, useParams } from "react-router-dom";
import QrPop from "../../../components/admin/QrPopUp/QrPopUp";
import DeletePop from "../../../components/admin/DeletePopUpBook/DeletePopUpBook";
import { useInfoBookId } from "../../api";
import CommentCard from "../../../components/admin/commentcard/commentcard";
import { Pagination } from "@mui/material";
import { Rating } from "@mui/material";

const Comment = [
  {
    id: 1,
    img: getImageKey("UserIcon"),
    name: "NIKITA",
    data: "23:23:23",
    rating: 4,
    text: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
  },
  {
    id: 2,
    img: getImageKey("UserIcon"),
    name: "NIKITA",
    data: "23:23:23",
    rating: 1,
    text: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
  },
  {
    id: 3,
    img: getImageKey("UserIcon"),
    name: "NIKITA",
    data: "23:23:23",
    rating: 3,
    text: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
  },
  {
    id: 4,
    img: getImageKey("UserIcon"),
    name: "NIKITA",
    data: "23:23:23",
    rating: 2.5,
    text: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
  },
];

function AdminBook() {
  const NumberPage = localStorage.getItem("page") || 1;
  const { id } = useParams();
  const { book } = useInfoBookId(id);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  //const [Comment] = useState([]);
  const [currentCommentpage, setCurrentCommentpage] = useState(NumberPage);
  const [Commentperpage] = useState(4);

  const lastCommentIndex = currentCommentpage * Commentperpage;
  const firstCommentIndex = lastCommentIndex - Commentperpage;
  const currentComment = Comment.slice(firstCommentIndex, lastCommentIndex);
  const countPage = Math.ceil(Comment.length / Commentperpage);

  const toggleQrPopup = () => {
    setIsQrOpen(!isQrOpen);
  };

  const toggleDeletePopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleChange = (e, p) => {
    setCurrentCommentpage(p);
    localStorage.setItem("page", p);
  };

  useEffect(() => {
    return localStorage.removeItem("page");
  }, []);

  return (
    <div>
      <Header />
      <Search catalog={true} sort={false} button={true} exit={true} />
      <QrPop isActive={isQrOpen} handleClose={toggleQrPopup} />
      <DeletePop
        isActive={isDeleteOpen}
        handleClose={toggleDeletePopup}
        id={id}
      />
      <div className="book__content">
        <div className="book__info">
          <div className="book__wrap">
            <div className="book__canvas">
              <img className="book__canvas-img" src={book.image} alt="book" />
            </div>
            <div className="book__but">
              <img
                className="book__but__trash"
                src={getImageKey("IconTrash")}
                alt=""
                onClick={toggleDeletePopup}
              />
              <Link className="book__but__edit-link" to="edit">
                <img
                  className="book__but__edit"
                  src={getImageKey("IconEdit")}
                  alt=""
                />
              </Link>
              <img
                className="book__but__QR"
                src={getImageKey("IconQR")}
                alt=""
                onClick={toggleQrPopup}
              />
            </div>
            <div className="book__text">
              <div className="book__text-title">{book.title} </div>
              <div className="book__text-author">Автор: {book.author}</div>
              <div className="book__text-year">Год издания: {book.year}</div>
              <div className="book__text-year">Язык: {book.language}</div>
              <div className="book__text-rating">
                <Rating
                  name="half-rating-read"
                  defaultValue={book.rating}
                  precision={0.5}
                  size="large"
                  readOnly
                />
              </div>
              <div className="book__text-language">Язык: {book.language}</div>
              <div className="book__text-genre">
                Жанры:
                <p>{book.genres + " "}</p>
              </div>
              <div className="book__text-description">
                Описание книги: {book.description}
              </div>
            </div>
          </div>
          <div className="book__comment">
            <p className="book__comment__text"> Отзывы </p>

            {Comment.length === 0 ? (
              <p className="book__comment__without">
                {" "}
                Ещё никто не оставил отзыва{" "}
              </p>
            ) : (
              <>
                {currentComment.map((obj) => (
                  <CommentCard
                    id={obj.id}
                    img={obj.img}
                    name={obj.name}
                    data={obj.data}
                    rating={obj.rating}
                    text={obj.text}
                  />
                ))}
                <div className="book__comment__pagination">
                  <Pagination
                    count={countPage}
                    color="primary"
                    page={currentCommentpage}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBook;
