import "./Header.scss";

import Cookies from "js-cookie";
import { useAuth } from "./../../useAuth";
import getImageKey from "../../getImageKey";
import { Link, useNavigate } from "react-router-dom";

function Header({ HeaderChoiceUser, HeaderChoiceBook }) {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div className="admin-header__inner">
      <div className="admin-header__logo-text-container">
        <Link className="admin-header__logo-link" to="/admin/catalog">
          <img
            className="admin-header__logotipe"
            src={getImageKey("Logo")}
            alt="logo icons"
          />
          <p className="admin-header__logo-text">Oggylib</p>
        </Link>
      </div>
      <label className="admin-header__search-position">
        <img
          className="admin-header__search-logo"
          src={getImageKey("searchIcon")}
          alt=""
        />
        <input
          className="admin-header__search-input"
          type="text"
          placeholder="Поиск"
        />
      </label>

      <label className="admin-header__block-text">
        <Link
          to="/admin/users"
          className={
            HeaderChoiceUser
              ? "admin-header__admin-users-active"
              : "admin-header__admin-users-unactive"
          }
        >
          Пользователи
        </Link>

        <Link
          to="/admin/catalog"
          className={
            HeaderChoiceBook
              ? "admin-header__admin-books-active"
              : "admin-header__admin-books-unactive"
          }
        >
          Книги
        </Link>
      </label>
      <div className="admin-header__exit" onClick={logout}>
        <img src={getImageKey("HeaderExit")} alt="" />
      </div>
    </div>
  );
}

export default Header;
