import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import getImageKey from "../getImageKey";
import Cookies from "js-cookie";
import { useLogin, useInfoUser } from "./../../api/api";

import "./login.scss";

function Login() {
  const [form, setForm] = useState({ password: "", email: "" });
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const { login, user, profile } = useLogin();
  const { signin, fromPage } = useAuth();
  const { infoUser } = useInfoUser();
  useEffect(() => {
    // const tempUser =
    //   infoUser.find((elem) => elem.email === profile.email) || [];
    if (profile.length !== 0) {
      //tempUser.picture = profile.picture;
      Cookies.set("profile", JSON.stringify(profile), {
        expires: 7,
      });
      signin(user, () => navigate(fromPage, { replace: true }));
    } else {
      console.log("ОШИБКА ВХОДА");
    }
  }, [profile]);

  const handleForm = (elem) => {
    if (form.email === "1" && form.password === "1") {
      signin(user, () => navigate("/admin/catalog", { replace: true }));
      Cookies.set("admin", true, {
        expires: 7,
      });
    } else {
      elem.preventDefault();
      setError((current) => !current);
      setForm((prevState) => ({ email: "", password: "" }));
      setTimeout(() => {
        window.location.reload();
      }, 150000);
    }
  };
  return (
    <div className="container">
      <div className="container__inner">
        <Link className="header__logo-link" to="/login">
          <img
            className="header__logo"
            src={getImageKey("Logo")}
            alt="logo icons"
          />
        </Link>
        <p className="header__logo-text">Oggylib</p>
      </div>
      <div className="form__inner">
        <form className="form__signin" action="">
          <h2 className="form__title">АВТОРИЗАЦИЯ</h2>
          <label className="form__label">
            <img className="form__icon" src={getImageKey("userIcon")} alt="" />
            <input
              className={error ? "form__input" : "form__input form--active"}
              type="text"
              value={form.email}
              onChange={(e) =>
                setForm((prevState) => ({ ...form, email: e.target.value }))
              }
              placeholder="Введите email"
            />
          </label>
          <label className="form__label">
            <img
              className={"form__icon"}
              src={getImageKey("passwordIcon")}
              alt=""
            />
            <input
              className={error ? "form__input" : "form__input form--active"}
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prevState) => ({ ...form, password: e.target.value }))
              }
              placeholder="Введите пароль"
            />
          </label>
          <p
            className={
              error ? "form__error" : "form__error form__error--active"
            }
          >
            Неправильный логин или пароль
          </p>
          <button className="form__singin-btn" onClick={(e) => handleForm(e)}>
            Войти
          </button>
          <p className="form__subtext">или</p>
        </form>
        <button className="form__google-btn" onClick={() => login()}>
          <img
            className="google-icon"
            src={getImageKey("googleIcon")}
            alt="google icon"
          />
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
