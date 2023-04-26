import "./card.scss";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="card">
      <div className="card__inner">
        <Link to={`/catalog/${props.titleLink}`}>
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
              to={`/catalog/${props.titleLink}`}
            >
              {props.title}
            </Link>
            <li className="card__list-item card-author">{props.author}</li>
            {/* <li className="card__list-item card-genre">{props.genre}</li> */}
          </ul>
          <div className="card__response">
            <div className="card__heart"></div>
            <button className="card__btn" type="submit">
              ВЗЯТЬ
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Card;
