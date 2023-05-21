import "./commentcard.scss";
import { Rating } from "@mui/material";
import { useState } from "react";
import cn from "classnames";

function CommentCard(props) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  console.log(props);
  return (
    <div className="comment__content">
      <div className="comment__head">
        <img
          className="comment__UserIcon"
          src={props.img}
          alt={"UserIcon"}
        ></img>
        <div classname="comment__info">
          <p className="comment__info__name">{props.name}</p>
          <p className="comment__info__data">{props.data}</p>
        </div>
        <div className="comment__rating">
          <Rating
            name="half-rating-read"
            defaultValue={props.rating}
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
        <button
          className="comment__text__but"
          onClick={() => setIsDescriptionExpanded((prevState) => !prevState)}
        >
          {isDescriptionExpanded ? "Свернуть" : "Развернуть"}
        </button>
      </div>
    </div>
  );
}

export default CommentCard;
