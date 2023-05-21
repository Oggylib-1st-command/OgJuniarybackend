import "./Search.scss";
import { Link, useNavigate } from "react-router-dom";
import getImageKey from "./../../getImageKey";
import { useAuth } from "./../../useAuth";
import { useState } from "react";
import Cookies from "js-cookie";
import GenresCatalog from "../adminGenresCatalog/GenresCatalog";

function Search({ sort, catalog, button, exit }) {
  const [genresActive, setGenresActive] = useState(false);
  const [activeSortMenu, setActiveSortMenu] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
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
                <p className="sort__sort-text">Сортировка: От А до Я</p>
                <img
                  className="sort__sort-more"
                  src={getImageKey("SortArrow")}
                  alt=""
                />
              </div>
              <div
                className={
                  activeSortMenu
                    ? "sort__sort-menu-active"
                    : "sort__sort-menu-disactive"
                }
              >
                <ul className="sort__sort-menu-inner">
                  <li>По алфавиту: От А до Я</li>
                  <li>По алфавиту: От Я до А</li>
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
          <p
            className={
              exit ? "menu__logout admin__logout" : "admin__logout-disable"
            }
            onClick={logout}
          >
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
