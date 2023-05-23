import "./Search.scss";
import { Link } from "react-router-dom";
import getImageKey from "./../../getImageKey";
import { useState } from "react";
import GenresCatalog from "../adminGenresCatalog/GenresCatalog";
import cn from "classnames";

function Search({ sort, catalog, button }) {
  const [genresActive, setGenresActive] = useState(false);
  const [activeSortMenu, setActiveSortMenu] = useState(false);
  const [typeSort, setTypeSort] = useState("От А до Я");
  return (
    <div className="search__container">
      <div className="search__inner">
        <GenresCatalog active={genresActive} setActive={setGenresActive} />
        <div>
          <div className="sort__inner">
            <div
              className={
                sort ? "sort__sort-block-menu" : "sort__sort-block-disable"
              }
            >
              <div
                className="sort__sort-block-active"
                onClick={() => setActiveSortMenu(!activeSortMenu)}
              >
                <img
                  className="sort__sort-logo"
                  src={getImageKey("IconSort")}
                  alt=""
                />
                <div className="sort__sorter"></div>
                <p className="sort__sort-text">Сортировка: {typeSort}</p>
                <img
                  className="sort__sort-more"
                  src={getImageKey("SortArrow")}
                  alt=""
                />
              </div>
              <div
                className={cn({
                  sort__menu__active: activeSortMenu,
                  sort__menu__disable: !activeSortMenu,
                })}
              >
                <ul className="sort__sort-menu-inner">
                  <li
                    onClick={() => {
                      setTypeSort("От А до Я");
                      setActiveSortMenu(false);
                    }}
                  >
                    По алфавиту: От А до Я
                  </li>
                  <li
                    onClick={() => {
                      setTypeSort("От Я до А");
                      setActiveSortMenu(false);
                    }}
                  >
                    По алфавиту: От Я до А
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                catalog ? "sort__catalog-active" : "sort__catalog-disable"
              }
              onClick={() => setGenresActive(true)}
            >
              <img
                className="sort__catalog-logo"
                src={getImageKey("IconCatalog")}
                alt=""
              />
              <p className="sort__catalog-text">Каталог</p>
            </div>
          </div>
        </div>
        <div className="admin__info">
          <button
            className={button ? "admin__add-books" : "admin__add-books-disable"}
          >
            <Link to="/admin/catalog/add" className="search__add-link">
              Добавить книгу
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
