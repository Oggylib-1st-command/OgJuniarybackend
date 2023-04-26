import "./Filtration.scss";
import { Check } from "./../Check/Check";
import { useState } from "react";

const genre = [
  {
    id: "1",
    view: "Все книги",
  },
  {
    id: "2",
    view: "Фантастика",
  },
  {
    id: "3",
    view: "Детективы",
  },
  {
    id: "4",
    view: "Фэнтези",
  },
  {
    id: "5",
    view: "Личная эффективность",
  },
  {
    id: "6",
    view: "Личная эффективность",
  },
  {
    id: "7",
    view: "Личная эффективность ",
  },
];

export const Filter = ({ title }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="filter__list-item">
      <div className="filter__checkbox">
        {showMore
          ? genre.map((target) => <Check key={target.id} genre={target.view} />)
          : genre
              .slice(0, 4)
              .map((target) => <Check key={target.id} genre={target.view} />)}
      </div>
      <p className="show__btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Скрыть" : "Показать ещё"}
      </p>
    </div>
  );
};
