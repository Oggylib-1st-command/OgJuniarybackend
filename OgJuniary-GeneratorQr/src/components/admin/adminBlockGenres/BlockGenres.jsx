import "./BlockGenres.scss";
import axios from "axios";
import { useState } from "react";
import getImageKey from "../../getImageKey";
export default function BlockGenres({
  id,
  genre,
  clas,
  subGenres,
  setSortBook,
  setActive,
  setShowMore,
  showMore,
}) {
  const handleGenre = (event) => {
    const getGenre = axios
      .get(`http://127.0.0.1:8000/filter/${event.target.id}/`)
      .then((data) => setSortBook(data.data));
    setActive(false);
  };
  return (
    <div className={clas}>
      <span>{genre}</span>
      {showMore ? (
        <div className="exit__genres" onClick={() => setShowMore(null)}>
          <img className="exit__iconL" src={getImageKey("ArrowBack")} />
        </div>
      ) : (
        ""
      )}
      {showMore
        ? subGenres.map((genre) => (
            <p
              key={genre.id}
              id={genre.id}
              className="admin-subgenres__item"
              onClick={handleGenre}
            >
              {genre.name}
            </p>
          ))
        : subGenres.slice(0, 5).map((genre) => (
            <p
              key={genre.id}
              id={genre.id}
              className="admin-subgenres__item"
              onClick={handleGenre}
            >
              {genre.name}
            </p>
          ))}
      <p
        className="show__btn-admin"
        onClick={(e) => {
          e.stopPropagation();
          setShowMore(id);
        }}
      >
        {showMore ? "" : `Всe ${subGenres.length}`}
      </p>
    </div>
  );
}
