import React from "react";
import "./GenresCatalog.scss";
import { Link } from "react-router-dom";
import getImageKey from "../../getImageKey";
import { useInfoGenre } from "./../../../pages/api.jsx";
import BlockGenres from "../adminBlockGenres/BlockGenres";

const GenresCatalog = ({ active, setActive }) => {
  const { genre } = useInfoGenre();
  return (
    <div
      className={
        active ? "genres__container genres__active" : "genres__no-active"
      }
    >
      <div
        className="genres__background-exit"
        onClick={() => setActive(false)}
      ></div>
      <div className="genres__inner">
        <div className="genres__head">
          <div className="exit" onClick={() => setActive(false)}>
            <img className="exit__iconL" src={getImageKey("IconCloseX")} />
          </div>
        </div>
        <div className="genres__genre">
          <div className="genres__list">
            {genre.map((target) => (
              <BlockGenres
                id={target.id}
                genre={target.name}
                clas={"genres__block"}
              />
            ))}
          </div>
        </div>
        <Link className="genres__all-genres" to="/admin/catalog/allgenres">
          <p>Все жанры</p>
        </Link>
      </div>
    </div>
  );
};

export default GenresCatalog;
