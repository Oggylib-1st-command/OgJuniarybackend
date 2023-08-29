import "./filtrationCatalog.scss";
import { Link } from "react-router-dom";
import { Check } from "./../../components/Check/Check";
import { useState } from "react";
import { useGenres } from "./../../api/api.jsx";
export const FiltrationCatalog = ({ setState, setSort, state }) => {
  const [showMore, setShowMore] = useState(false);
  const { genre } = useGenres();
  return (
    <>
      <h3 className="filter__genre">Жанры</h3>
      <Link
        to="#"
        className="filter__link"
        onClick={() => setState((state) => !state)}
      >
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
      <div className="filter__list-item">
        <div className="filter__checkbox">
          {showMore
            ? genre.map((target) => (
                <Check
                  key={target.id}
                  genre={target.main}
                  names={target.name}
                  setSort={setSort}
                />
              ))
            : genre
                .slice(0, 5)
                .map((target) => (
                  <Check
                    key={target.id}
                    genre={target.main}
                    names={target.name}
                    setSort={setSort}
                  />
                ))}
        </div>
        <p
          className="show__btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Скрыть" : "Показать ещё"}
        </p>
      </div>
    </>
  );
};
