import "./commentcard.scss";
import { Rating } from "@mui/material";
import { useState } from "react";
import cn from "classnames";
import axios from "axios";
function CommentCard(props) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const deleteForm = () => {
    const deleteReviews = async () => {
      await axios.delete(`http://127.0.0.1:8000/reviews/${props.id}/`);
    };
    deleteReviews();
    window.location.reload();
  };
  return (
    <div className="comment__content">
      <div className="comment__head">
        <img
          className="comment__UserIcon"
          src={props.img}
          alt={"UserIcon"}
        ></img>
        <div classname="comment__info">
          <p className="comment__info__name">
            {`${props.name} ${props.surname}`}
          </p>
          <p className="comment__info__data">{props.data.slice(0, 10)}</p>
        </div>
        <div className="comment__rating">
          <Rating
            name="half-rating-read"
            value={+props.rating}
            precision={0.5}
            size="large"
            readOnly
          />
        </div>
      </div>
      <div className="comment__text">
        <div
          className={cn({
            comment__text__title__expanded: isDescriptionExpanded,
            comment__text__title__hidden: !isDescriptionExpanded,
          })}
        >
          {props.text}
        </div>
      </div>
      <div className="comment__but">
        <button
          className="comment__but__expand"
          onClick={() => setIsDescriptionExpanded((prevState) => !prevState)}
        >
          {isDescriptionExpanded ? "Свернуть" : "Развернуть"}
        </button>
        <button className="comment__but__delete" onClick={deleteForm}>
          Удалить отзыв
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
