import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { googleLogout } from "@react-oauth/google";
import { useAuth } from "../useAuth";
import getImageKey from "../getImageKey";

function Navbar({ show, setShow }) {
  const [autf, setAutf] = useState(false);
  const [info, setInfo] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    Cookies.remove("profile");
    setAutf(false);
    setInfo([]);
    signout(() => navigate("/login", { replace: true }));
  };
  const handleClick = () => {
    setShow((current) => !current);
  };
  useEffect(() => {
    const local = Cookies.get("profile");
    if (local) {
      setInfo(JSON.parse(local));
      setAutf(true);
    }
  }, [autf]);
  return (
    <div className="wrapper">
      <button
        className={show ? "menu__btn" : "menu__btn menu__btn--active"}
        onClick={handleClick}
      >
        <span></span>
      </button>
      <nav className="menu">
        <ul className={show ? "menu__list" : "menu__list menu__list--active"}>
          <li className="menu__list-item">
            {autf ? (
              <div>
                <div>
                  <img
                    className="menu__list-img user-img"
                    src={info.picture}
                    alt="icons avatar"
                  />
                </div>
                <div className="menu__list-info">
                  <p className="menu__fullname">{info.name}</p>
                  {/* <p className="menu__fullname">{`${info.name} ${info.surname}`}</p> */}
                  <p className="menu__email">{info.email}</p>
                  <p className="menu__logout" onClick={logout}>
                    Выйти из аккаунта
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <img
                  className="menu__list-img"
                  src={getImageKey("searchIcon")}
                  alt="icons avatar"
                />
                <div className="menu__list-info">
                  <p className="menu__fullname">Без названия</p>
                  <p className="menu__email">Без названия</p>
                </div>
              </div>
            )}
          </li>
          <hr />
          <li className="menu__list-item">
            <img
              className="menu__list-img"
              src={getImageKey("HeartIcon")}
              alt=""
            />
            <NavLink
              className="menu__list-link"
              to="/favorites"
              onClick={handleClick}
            >
              Избранное
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img
              className="menu__list-img"
              src={getImageKey("CatalogIcon")}
              alt=""
            />
            <NavLink
              className="menu__list-link"
              to="/catalog"
              onClick={handleClick}
            >
              Каталог
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img
              className="menu__list-img"
              src={getImageKey("HistoryIcon")}
              alt=""
            />
            <NavLink
              className="menu__list-link"
              to="/history"
              onClick={handleClick}
            >
              История
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img
              className="menu__list-img"
              src={getImageKey("TakenBookIcon")}
              alt=""
            />
            <NavLink
              className="menu__list-link"
              to="/takenbook"
              onClick={handleClick}
            >
              Взятые книги
            </NavLink>
          </li>
          <hr />
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
