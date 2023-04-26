import "./BookCardCatalog.scss";

function BookCardCatalog({ title, author, image }) {
  return (
    <div className="book-card__inner">
      <div className="book-card__image-block">
        <img src={image} alt="" className="book-card__image" />
      </div>
      <p className="book-card__title">{title}</p>
      <p className="book-card__author">{author}</p>
      <p className="book-card__holder"></p>
    </div>
  );
}

export default BookCardCatalog;
