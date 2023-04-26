import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import getImageKey from "../getImageKey";
import Navbar from "../Navbar/navbar";

function Header() {
  const [active, setActive] = useState(true);
  const [text, setText] = useState("");
  const [show, setShow] = useState(true);
  function handleClick(e) {
    setText("");
    return setActive(!active);
  }
  return (
    <div className="header__inner">
      <Link className="header__logo-link" to="/">
        <img
          className="header__logo"
          src={getImageKey("Logo")}
          alt="logo icons"
          onClick={() => setShow(true)}
        />
        <p className="header__logo-text" onClick={() => setShow(true)}>
          Oggylib
        </p>
      </Link>
      <div className="header__form">
        <input
          className={
            active
              ? "header__form-input"
              : "header__form-input header__form-input--active"
          }
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
          placeholder="поиск"
        />
        <img
          className="header__form-icon"
          onClick={handleClick}
          src={getImageKey("searchIcon")}
          alt="search icon"
        />
      </div>
      <Navbar show={show} setShow={setShow} />
    </div>
  );
}

export default Header;
