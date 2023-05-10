import "./catalog.scss";
import Card from "../../components/Card/Card";
import { Filter } from "../../components/Filtration/Filtration";
import { Link } from "react-router-dom";
import { useInfoBook } from "../api";

const genreMain = [
  {
    id: "1",
    viewTitle: "Все книги",
  },
];
function Catalog() {
  const { book } = useInfoBook();

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
          <select className="catalog__sort">
            <option>По новизне</option>
            <option>По популярности</option>
            <option>По алфавиту</option>
          </select>
        </div>
        {book.map((obj) => (
          <Card
            key={obj.id}
            id={obj.id}
            titleLink={obj.title.split(" ").join("")}
            image={obj.image}
            author={obj.author}
            title={obj.title}
            genre={obj.genres.join(", ")}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
