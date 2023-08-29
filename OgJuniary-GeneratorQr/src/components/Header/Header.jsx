import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import getImageKey from "../getImageKey";
import Navbar from "../Navbar/navbar";
import axios from "axios";

function Header() {
  const [active, setActive] = useState(true);
  const [text, setText] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  function handleClick(e) {
    setText("");
    if (text) {
      postForm();
    }
    return setActive(!active);
  }
  const postForm = () => {
    const postSearch = async () => {
      const search = await axios.get(`http://127.0.0.1:8000/search/?q=${text}`);
      navigate(`/catalog/${search.data[0]?.id || ""}`);
    };
    if (text) postSearch();
    else console.log("Field is empty");
  };
  const handleEnter = (key) => {
    if (key.code === "Enter") {
      setText("");
      postForm();
    }
  };
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
          onKeyDown={handleEnter}
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
