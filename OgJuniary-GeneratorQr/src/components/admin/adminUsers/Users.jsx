import "./Users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./../../useAuth";
import { AdminUsersCard } from "../adminUsersCard/AdminUsersCard";
import Cookies from "js-cookie";
import { AdminUsersDelete } from "../adminUsersDelete/AdminUsersDelete";
import { AdminUsersAdd } from "../adminUsersAdd/AdminUsersAdd";
import axios from "axios";
import { TakenBook } from "../adminTakenBook/TakenBook";
function Users() {
  const [user, setUser] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [userAdd, setUserAdd] = useState(false);
  const [userId, setUserId] = useState();
  const [userTaken, setUserTaken] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:8000/users/");
      setUser(res.data);
    };
    getUser();
  }, []);

  const handleDelete = (id) => {
    setUserId(id);
    setUserDelete(!userDelete);
  };
  const handleTaken = (id) => {
    setUserId(id);
    setUserTaken(!userTaken);
  };
  const handleAdd = (e) => {
    setUserAdd(!userAdd);
  };
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div
      className={
        userDelete || userAdd ? "admin__users disactive" : "admin__users"
      }
    >
      <div className="admin__users-top">
        <select className="admin__users-sort">
          <option value="">Сортировка: От А до Я</option>
          <option value="">Сортировка: От Я до А</option>
        </select>
        <div className="admin__info">
          <button className="admin__add-users" onClick={(e) => handleAdd(e)}>
            Добавить пользователя
          </button>
        </div>
      </div>
      <div className="admin__users-content">
        {userDelete && (
          <AdminUsersDelete handleDelete={handleDelete} id={userId} />
        )}
        {userAdd && <AdminUsersAdd handleAdd={handleAdd} />}
        {userTaken && <TakenBook handleTaken={handleTaken} id={userId} />}
        {user.map((e) => (
          <AdminUsersCard
            key={e.id}
            id={e.id}
            handleDelete={handleDelete}
            userName={e.name}
            surname={e.surname}
            mail={e.email}
            handleTaken={handleTaken}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;
