import "./Search.scss";
import { Link } from "react-router-dom";
import getImageKey from "./../../getImageKey";
import { useState } from "react";
import GenresCatalog from "../adminGenresCatalog/GenresCatalog";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { removeBook } from "../../../store/books/Slice";
import { takenSortAdmin } from "../../../utils/takenSort";
import Catalog from "../adminCatalog/Catalog";
function Search({ sort, catalog, button }) {
  const dispatch = useDispatch();
  const [genresActive, setGenresActive] = useState(false);
  const [activeSortMenu, setActiveSortMenu] = useState(false);
  const [sortBook, setSortBook] = useState([]);
  const [typeSort, setTypeSort] = useState("От А до Я");
  const handleChange = (event) => {
    takenSortAdmin(event.target.textContent).then((data) => setSortBook(data));
  };
  return (
    <>
      <div className="search__container">
        <div className="search__inner">
          <GenresCatalog
            active={genresActive}
            setActive={setGenresActive}
            setSortBook={setSortBook}
          />
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
                      onClick={(e) => {
                        setTypeSort("От А до Я");
                        handleChange(e);
                        setActiveSortMenu(false);
                      }}
                    >
                      По алфавиту: От А до Я
                    </li>
                    <li
                      onClick={(e) => {
                        setTypeSort("От Я до А");
                        handleChange(e);
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
              className={
                button ? "admin__add-books" : "admin__add-books-disable"
              }
            >
              <Link
                to="/admin/catalog/add"
                //onClick={dispatch(removeBook)}
                className="search__add-link"
              >
                Добавить книгу
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Catalog sortBook={sortBook} />
    </>
  );
}

export default Search;
