import "./Search.scss";
import { Link } from "react-router-dom";
import getImageKey from "./../../getImageKey";

function Search() {
  return (
    <div className="search__inner">
      <div>
        <div className="sort__inner">
          <div className="sort__catalog">
            <img src={getImageKey("IconCatalog")} alt="" />
            <p>Каталог</p>
          </div>
          <div className="sort__sort-block">
            <select className="sort__sorter"></select>
            <img
              className="sort__sort-logo"
              src={getImageKey("IconSort")}
              alt=""
            />
          </div>
        </div>
      </div>
      <label className="search__pos">
        <img className="search__logo" src={getImageKey("searchIcon")} alt="" />
        <input className="search__input" type="text" placeholder="Поиск" />
      </label>
      <button className="search__add-books">
        <Link to="add" className="search__add-link">
          Добавить книгу
        </Link>
      </button>
    </div>
  );
}

export default Search;
