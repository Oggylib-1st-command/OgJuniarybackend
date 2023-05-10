import "./reviews.scss";
import { Rating } from "@mui/material";

export const Reviews = ({ state, setComment, comment }) => {
  return (
    <form className="reviews-form">
      <div className="reviews-form__rating">
        <h4 className="reviews-form__rating-title">Ваша оценка:</h4>
        <Rating
          name="simple-controlled"
          value={comment.value}
          onChange={(newValue) =>
            setComment({ ...comment, value: +newValue.target.value })
          }
          //precision={0.5}
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
          maxLength={150}
        ></textarea>
      </label>
    </form>
  );
};
