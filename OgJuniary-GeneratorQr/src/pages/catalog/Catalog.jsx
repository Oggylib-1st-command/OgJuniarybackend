import "./catalog.scss";
import Card from "../../components/Card/Card";
import { Filter } from "../../components/Filtration/Filtration";
import { Link } from "react-router-dom";
import { useInfoBook, useInfoUser } from "./../../api/api";
import EmptyList from "./../../components/EmptyList/EmptyList";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const names = [
  "По новизне",
  "По популярности",
  "По алфавиту(убывание)",
  "По алфавиту(возрастание)",
];
const genreMain = [
  {
    id: "1",
    viewTitle: "Все книги",
  },
];
const Catalog = () => {
  const { book } = useInfoBook();
  const { infoUser } = useInfoUser();
  const [sort, setSort] = useState([]);
  const [name, setName] = useState("");
  const getSort = (value) => {
    switch (value) {
      case "По новизне":
        axios
          .get("http://127.0.0.1:8000/sorted/time/?sort=")
          .then((response) => setSort(response.data));
        break;
      case "По популярности":
        axios
          .get("http://127.0.0.1:8000/sorted/rating/?sort=")
          .then((response) => setSort(response.data));
        break;
      case "По алфавиту(убывание)":
        axios
          .get("http://127.0.0.1:8000/sorted/book/?sort=desc")
          .then((response) => setSort(response.data));
        break;
      case "По алфавиту(возрастание)":
        axios
          .get("http://127.0.0.1:8000/sorted/book/?sort=")
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
    <div className="catalog__inner">
      <div className="catalog__content">
        <div className="catalog__search">
          <button className="catalog__filtration" type="submit">
            <p className="filter__text">Каталог</p>
            <div className="filter__info">
              <h3 className="filter__genre">Жанры</h3>
              <Link to="#" className="filter__link">
                <svg
                  width="26px"
                  height="26px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Menu / Close_LG">
                      {" "}
                      <path
                        id="Vector"
                        d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </Link>
              {genreMain.map((target) => (
                <Filter key={target.id} title={target.viewTitle} />
              ))}
            </div>
          </button>
          <Box sx={{ minWidth: 100 }}>
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
        </div>
        {book.length === 0 ? (
          <EmptyList
            title={undefined}
            img={"EmptyCatalog"}
            text={"В библиотеке нет книг"}
          />
        ) : (
          <>
            {sort.length !== 0
              ? sort.map((obj) => (
                  <Card
                    key={obj.id}
                    id={obj.id}
                    image={obj.image}
                    author={obj.author}
                    title={obj.title}
                    genre={obj.genres.join(", ")}
                    bookings={obj.bookings}
                    infoUser={infoUser}
                  />
                ))
              : book.map((obj) => (
                  <Card
                    key={obj.id}
                    id={obj.id}
                    image={obj.image}
                    author={obj.author}
                    title={obj.title}
                    genre={obj.genres.join(", ")}
                    bookings={obj.bookings}
                    owner={obj.owner}
                    infoUser={infoUser}
                  />
                ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
