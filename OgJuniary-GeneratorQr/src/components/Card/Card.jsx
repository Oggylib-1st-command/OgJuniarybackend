import "./card.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useState } from "react";
function Card(props) {
  const [active, setActive] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <div className="card">
      <div className="card__inner">
        <Link to={`/catalog/${props.id}`}>
          <img
            className="card__img"
            src={props.image}
            alt="background card book"
          />
        </Link>
        <div className="card__info">
          <ul className="card__list">
            <Link
              className="card__list-item card-title"
              to={`/catalog/${props.id}`}
            >
              {props.title}
            </Link>
            <li className="card__list-item card-author">{props.author}</li>
          </ul>
          <div className="card__response">
            <div
              className={cn({
                card__heart: !heart,
                card__heart_active: heart,
              })}
              onClick={() => setHeart((state) => !state)}
            ></div>
            <button
              className={cn({
                card__btn: !active,
                card__btn_active: active,
              })}
              type="submit"
              onClick={() => setActive((state) => !state)}
            >
              {active ? "ВЕРНУТЬ" : "ВЗЯТЬ"}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Card;
