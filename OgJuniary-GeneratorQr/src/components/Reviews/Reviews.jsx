import "./reviews.scss";
import { Rating } from "@mui/material";
export const Reviews = ({ setComment, comment, rating, setRating }) => {
  return (
    <form className="reviews-form">
      <div className="reviews-form__rating">
        <h4 className="reviews-form__rating-title">Ваша оценка:</h4>
        <Rating
          name="simple-controlled"
          value={rating.value}
          onChange={(newValue) =>
            setRating({ ...rating, value: +newValue.target.value })
          }
          precision={0.5}
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
  );
};
