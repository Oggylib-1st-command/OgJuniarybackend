import axios from "axios";
import "./subgenres.scss";

export const SubGenres = ({ subGenres, setSort }) => {
  const handleGenre = (event) => {
    const getGenre = axios
      .get(`http://127.0.0.1:8000/filter/${event.target.id}/`)
      .then((data) => setSort(data.data));
  };
  return (
    <div className="subgenres__info">
      {subGenres.map((genre) => (
        <p
          key={genre.id}
          id={genre.id}
          className="subgenres__item"
          onClick={handleGenre}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};
