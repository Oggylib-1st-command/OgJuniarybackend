import "./takenBook.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "../../components/Card/Card";
import { useInfoUser } from "./../../api/api";
import { Link, useNavigate } from "react-router-dom";
export const TakenBook = () => {
  const { infoUser } = useInfoUser();
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const local = JSON.parse(Cookies.get("profile"));
    const getBooking = async () => {
      const bookTaken = await axios.get("http://127.0.0.1:8000/books/");
      const userTakenBook = bookTaken.data.filter(
        (el) => +el.owner === local.id
      );
      setBooking(userTakenBook);
    };
    getBooking();
  }, []);
  return (
    <div className="taken">
      <div className="taken__inner">
        <div className="taken__top">
          <h2 className="taken__top-title">
            <Link
              href="#"
              className="taken__arrow"
              onClick={() => navigate(-1)}
            >
              <svg
                width="55"
                height="24"
                viewBox="0 0 55 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.939342 10.9393C0.353558 11.5251 0.353558 12.4749 0.939342 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939342 10.9393ZM55 10.5L2 10.5V13.5L55 13.5V10.5Z"
                  fill="black"
                />
              </svg>
            </Link>
            Взятые книги
          </h2>
        </div>
        <div className="taken__list">
          {booking.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              image={card.image}
              author={card.author}
              title={card.title}
              genre={card.genres.join(", ")}
              bookings={card.bookings}
              infoUser={infoUser}
              owner={card.owner}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
