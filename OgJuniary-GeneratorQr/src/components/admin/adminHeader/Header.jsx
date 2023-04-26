import "./Header.scss";

import getImageKey from "../../getImageKey";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../useAuth";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div className="container__inner">
      <Link className="header__logo-link" to="/admin/catalog">
        <img
          className="header__logo"
          src={getImageKey("Logo")}
          alt="logo icons"
        />
      </Link>

      <p className="header__logo-text">Oggylib</p>
      <Link className="header__admin-books" to="/admin/catalog">
        Книги
      </Link>

      <Link className="header__admin-users" to="/admin/users">
        Пользователи
      </Link>
      <button className="menu__logout" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

export default Header;
