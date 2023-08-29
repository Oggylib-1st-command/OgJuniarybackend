import { useState } from "react";
import "./Check.scss";
import cn from "classnames";
import { SubGenres } from "../SubGenres/SubGenres";
export const Check = ({ genre, names, setSort }) => {
  const [active, setActive] = useState(false);
  const handleChange = (event) => {
    event.stopPropagation();
    setActive((active) => !active);
  };
  return (
    <>
      <div className="filter__label">
        <a className="filter__genre-link" onClick={handleChange}>
          {genre}
        </a>
        <span>{genre.length}</span>
      </div>
      <div
        className={cn({
          filter__animate: !active,
          filter__animate_active: active,
        })}
      >
        {active ? <SubGenres setSort={setSort} subGenres={names} /> : <></>}
      </div>
    </>
  );
};
