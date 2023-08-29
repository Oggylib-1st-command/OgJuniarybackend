import "./reviewsCard.scss";
import { Rating } from "@mui/material";
import getImageKey from "../getImageKey";
export const ReviewsCard = ({
  editState,
  name,
  surname,
  date,
  rating,
  image,
  text,
  setEdit,
  edit,
}) => {
  return (
    <div className="reviews__card">
      <div className="reviews__card-header">
        <img src={image} alt="" className="reviews__img" />
        <div className="reviews__card-info">
          <span className="reviews__name">{name}</span>
          <span className="reviews__surname">{surname}</span>
          <br />
          <span className="reviews__date">
            {date.slice(0, 10).replace(/-/g, ".")}
          </span>
        </div>
        <div className="reviews__rating">
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
            precision={1}
          />
        </div>
      </div>
      <div className="reviews__content">
        {editState ? (
          <img
            className="reviews__card-edit"
            src={getImageKey("IconEdit")}
            onClick={() => setEdit(!edit)}
            alt="edit icon"
          />
        ) : (
          ""
        )}
        <p className="reviews__content-text">{text}</p>
      </div>
      <hr />
    </div>
  );
};
