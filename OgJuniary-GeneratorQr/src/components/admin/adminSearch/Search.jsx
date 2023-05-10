import "./Search.scss";
import { Link, useNavigate } from "react-router-dom";
import getImageKey from "./../../getImageKey";
import { useAuth } from "./../../useAuth";
import Cookies from "js-cookie";

function Search() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
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
      <div className="admin__info">
        <button className="search__add-books">
          <Link to="add" className="search__add-link">
            Добавить книгу
          </Link>
        </button>
        <p className="menu__logout admin__logout" onClick={logout}>
          Выйти из аккаунта
        </p>
      </div>
    </div>
  );
}

export default Search;
