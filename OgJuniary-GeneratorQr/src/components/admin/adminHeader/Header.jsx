import "./Header.scss";

import getImageKey from "../../getImageKey";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container__inner">
      <Link className="header__logo-link" to="/admin/catalog">
        <img
          className="header__logo"
          src={getImageKey("Logo")}
          alt="logo icons"
        />
      </Link>
      <p className="admin__logo-text">Oggylib</p>
      <label className="search__pos">
        <img className="search__logo" src={getImageKey("searchIcon")} alt="" />
        <input className="search__input" type="text" placeholder="Поиск" />
      </label>
      <Link className="header__admin-books" to="/admin/catalog">
        Книги
      </Link>

      <Link className="header__admin-users" to="/admin/users">
        Пользователи
      </Link>
    </div>
  );
}

export default Header;
