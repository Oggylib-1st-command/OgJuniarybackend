import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Check.scss";

export const Check = ({ genre }) => {
  const [active, setActive] = useState(true);
  const [choose, setChoose] = useState([]);
  useEffect(() => {
    if (active) {
      setChoose(genre);
    }
  }, []);
  const handleCheck = (elem) => {
    setActive((even) => !even);
  };
  return (
    <div className="filter__label">
      <Link className="filter__genre-link" to="#">
        {genre}
      </Link>
      <span>0</span>
    </div>
  );
};
