import "./BookCardCatalog.scss";
import { Link } from "react-router-dom";

function BookCardCatalog({ id, title, author, image, holder }) {
  return (
    <div className="book-card__inner">
      <div className="book-card__image-block">
        <Link to={`${id}`}>
          <img src={image} alt="image book" className="book-card__image" />
        </Link>
      </div>
      <div className="book-card__title-block">
        <p className="book-card__title">{title}</p>
      </div>
      <div className="book-card__author-block">
        <p className="book-card__author">{author}</p>
      </div>
      <div className="book-card__holder-block">
        <p className="book-card__holder">{holder}</p>
      </div>
    </div>
  );
}

export default BookCardCatalog;
