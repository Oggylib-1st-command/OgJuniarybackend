import { Link } from "react-router-dom";
import "./Paggination.scss";

const Paggination = ({ bookPerPage, totalBook, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBook / bookPerPage); i++) {
    pageNumbers.push(i);
  }
  const getPage = (number) => {
    paginate(number);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="paggination">
      <ul className="paggination__list">
        {pageNumbers.map((number) => (
          <li
            className="page-item"
            key={number}
            onClick={() => getPage(number)}
          >
            <Link className="pagelink">{number}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paggination;
