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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const names = ["По алфавиту(убывание)", "По алфавиту(возрастание)"];
function Users() {
  const [user, setUser] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [userAdd, setUserAdd] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [userTaken, setUserTaken] = useState(false);
  const [sort, setSort] = useState([]);
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
    console.log("delet");
  };
  const handleTaken = (id) => {
    setUserId(id);
    setUserTaken(!userTaken);
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    setUserAdd(!userAdd);
  };
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  const getSort = (value) => {
    switch (value) {
      case "По алфавиту(убывание)":
        axios
          .get("http://127.0.0.1:8000/sorted/user/?sort=desc")
          .then((response) => setSort(response.data));
        break;
      case "По алфавиту(возрастание)":
        axios
          .get("http://127.0.0.1:8000/sorted/user/?sort=")
          .then((response) => setSort(response.data));
        break;
      default:
        break;
    }
  };
  const handleChange = (event) => {
    setName(event.target.value);
    getSort(event.target.value);
  };
  return (
    <div
      className={
        userDelete || userAdd ? "admin__users disactive" : "admin__users"
      }
    >
      <div className="admin__users-top">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              onChange={handleChange}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} id="menu-item-select">
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
        {sort.length !== 0
          ? sort.map((e) => (
              <AdminUsersCard
                key={e.id}
                id={e.id}
                handleDelete={handleDelete}
                userName={e.name}
                surname={e.surname}
                mail={e.email}
                handleTaken={handleTaken}
              />
            ))
          : user.map((e) => (
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
