import "./catalog.scss";
import Card from "../../components/Card/Card";
import { useInfoBook, useInfoUser } from "./../../api/api";
import EmptyList from "./../../components/EmptyList/EmptyList";
import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cn from "classnames";
import { takenSort } from "../../utils/takenSort";
import { names } from "../../utils/takenSort";
import { FiltrationCatalog } from "../../components/FiltrationCatalog/FiltrationCatalog";
const Catalog = () => {
  const { book } = useInfoBook();
  const { infoUser } = useInfoUser();
  const [sort, setSort] = useState([]);
  const [name, setName] = useState("");
  const [state, setState] = useState(false);
  const handleChange = (event) => {
    setName(event.target.value);
    takenSort(event.target.value).then((data) => setSort(data));
  };
  return (
    <div className="catalog__inner">
      <div className="catalog__content">
        <div className="catalog__search">
          <button
            className={cn({
              catalog__filtration: !state,
              catalog__filtration_active: state,
            })}
            type="submit"
            onClick={() => setState((state) => !state)}
          >
            <p className="filter__text">Фильтрация</p>
          </button>
          <div
            className={cn({
              filter__info: !state,
              filter__info_active: state,
            })}
          >
            {state ? (
              <FiltrationCatalog
                setState={setState}
                setSort={setSort}
                state={state}
              />
            ) : (
              <></>
            )}
          </div>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                onChange={handleChange}
                onClick={() => setState(false)}
                displayEmpty
                renderValue={name !== "" ? undefined : () => "Каталог"}
              >
                {names.map((elem) => (
                  <MenuItem key={elem.id} value={elem.id} id="menu-item-select">
                    {elem.state}
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
