//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useInfoBookId } from "../api";
import { useParams } from "react-router-dom";
import { ReviewsCard } from "./../../components/ReviewsCard/ReviewsCard";
import { Reviews } from "./../../components/Reviews/Reviews";

import "./book.scss";

const Book = () => {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState({
    value: 0,
    text: "",
  });
  const { id } = useParams();
  const { book } = useInfoBookId(id);

  useEffect(() => {
    if (comment.text && !active) {
      console.log("Оценка отправлена");
      console.log(comment.text);
      setComment({ ...comment, value: 0, text: "" });
    } else {
      console.log("Пока нет");
    }
  }, [comment, active]);

  return (
    <div className="user-book">
      <div className="user-book__card">
        <img className="book__img" src={book.image} alt="book images" />
        <h3 className="book__title">{book.title}</h3>
        <h5 className="book__author">{book.author}</h5>
        <div className="book__response">
          <div className="book__heart"></div>
          <button className="book__btn" type="submit">
            ВЗЯТЬ
          </button>
        </div>
        <div className="book__description">
          <p>{book.description}</p></div>
        <div className="book__rating">
          <p className="book__rating-title">ОБЩИЙ РЕЙТИНГ КНИГИ:</p>
          <Rating
            name="simple-controlled"
            readOnly
            //precision={0.5}
            size="large"
          />
        </div>
        <table className="book__table">
          <tbody className="table__list">
            <tr className="table__list-item">
              <td className="table__list-options">Жанры:</td>
              <td className="table__list-info">
                {book.genres + ' '}
              </td>
            </tr>
            <tr className="table__list-item">
              <td className="table__list-options">Язык:</td>
              <td className="table__list-info">{book.language}</td>
            </tr>
            <tr className="table__list-item">
              <td className="table__list-options">Год издания:</td>
              <td className="table__list-info">{book.year}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="user-book__reviews">
        <button className="reviews__btn" onClick={() => setActive(!active)}>
          {active ? "ОПУБЛИКОВАТЬ ОТЗЫВ" : "ОСТАВИТЬ ОТЗЫВ"}
        </button>
        <div className="reviews__info">
          {active ? (
            <Reviews state={active} setComment={setComment} comment={comment} />
          ) : (
            active
          )}
          <hr />
          <ReviewsCard />
        </div>
      </div>
    </div>
  );
};

export { Book };
