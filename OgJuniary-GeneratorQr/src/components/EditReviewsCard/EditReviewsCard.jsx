import { useState } from "react";
import "./editReviewsCard.scss";
import { Rating } from "@mui/material";
import axios from "axios";
export const EditReviewsCard = ({ reviews, idUser, id, setEdit }) => {
  const [reviewsUser] = useState(reviews.filter((el) => el.owner === idUser));
  const [comment, setComment] = useState({
    text: reviewsUser[0].text,
    value: reviewsUser[0].value,
    book: id,
    owner: idUser,
  });
  const handlePublish = () => {
    const patchReviews = async () => {
      await axios.patch(
        `http://127.0.0.1:8000/reviews/${reviewsUser[0].id}/`,
        comment
      );
    };
    patchReviews();
    setEdit((edit) => !edit);
    window.location.reload();
  };
  const handleDelete = () => {
    const deleteReviews = async () => {
      await axios.delete(`http://127.0.0.1:8000/reviews/${reviewsUser[0].id}/`);
    };
    deleteReviews();
    setEdit((edit) => !edit);
    window.location.reload();
  };
  return (
    <div className="edit__card">
      <div className="edit__card-info">
        <button className="edit__btn-publish" onClick={handlePublish}>
          ОПУБЛИКОВАТЬ
        </button>
        <button className="edit__btn-delete" onClick={handleDelete}>
          УДАЛИТЬ
        </button>
      </div>
      <form className="reviews-form">
        <div className="reviews-form__rating">
          <h4 className="reviews-form__rating-title">Ваша оценка:</h4>
          <Rating
            name="simple-controlled"
            value={comment.value}
            onChange={(newValue) =>
              setComment({ ...comment, value: +newValue.target.value })
            }
            size="large"
          />
        </div>
        <label className="reviews-form__label">
          Комментарий:
          <textarea
            value={comment.text}
            onChange={(newValue) =>
              setComment({ ...comment, text: newValue.target.value })
            }
            maxLength={1500}
          ></textarea>
        </label>
      </form>
    </div>
  );
};
