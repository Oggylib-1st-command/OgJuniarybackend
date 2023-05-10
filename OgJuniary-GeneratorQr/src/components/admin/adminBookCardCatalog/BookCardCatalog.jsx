import "./BookCardCatalog.scss";
import { Link } from "react-router-dom";

function BookCardCatalog({ id, title, author, image }) {
  return (
    <div className="book-card__inner">
      <div className="book-card__image-block">
        <Link to={`${id}`}>
          <img src={image} alt="image book" className="book-card__image" />
        </Link>
      </div>
      <p className="book-card__title">{title}</p>
      <p className="book-card__author">{author}</p>
      <p className="book-card__holder"></p>
    </div>
  );
}

export default BookCardCatalog;
