import "./card.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Card(props) {
  const local = JSON.parse(Cookies.get("profile"));
  const [name, setName] = useState("ВЗЯТЬ");
  const [active, setActive] = useState(props.bookings ? true : false);
  const [isBookings] = useState(props.owner === local.id);
  const [heart, setHeart] = useState(false);
  const booking = () => {
    if (!active && local) {
      const postBook = async () => {
        const bookings = await axios.patch(
          `http://localhost:8000/books/${props.id}/`,
          {
            owner: local.id,
            bookings: props.id,
          }
        );
        window.location.reload();
      };
      postBook();
    } else {
      const postBook = async () => {
        const bookings = await axios.patch(
          `http://localhost:8000/books/${props.id}/`,
          {
            bookings: "",
          }
        );
        window.location.reload();
      };
      postBook();
    }
    setActive((state) => !state);
  };
  const favorites = () => {
    setHeart((heart) => !heart);
    const postFavorites = async () => {
      const favorite = await axios.patch(
        `http://localhost:8000/users/${local.id}/`,
        {
          bookid_favorites: props.id,
        }
      );
      console.log(favorite);
    };
    if (!heart) {
      postFavorites();
    }
  };
  useEffect(() => {
    if (active && isBookings) {
      setName("ВАШЕ");
    } else if (active && !isBookings) {
      setName("ЗАНЯТО");
    } else if (!active) {
      setName("ВЗЯТЬ");
    }
  }, [active]);
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
            <li className="card__list-item">
              <Link className="card-title" to={`/catalog/${props.id}`}>
                <p>{props.title}</p>
              </Link>
            </li>
            <li className="card__list-item card-author">
              <p>{props.author}</p>
            </li>
          </ul>
          <div className="card__response">
            <div
              className={cn({
                card__heart: !heart,
                card__heart_active: heart,
              })}
              onClick={favorites}
            ></div>
            <div
              className={cn({
                active__block: active && isBookings,
                active__block_booking: active && !isBookings,
              })}
            >
              <button
                className={cn({
                  card__btn: !active,
                  card__btn_active: active,
                })}
                type="submit"
                onClick={booking}
              >
                {name}
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Card;
