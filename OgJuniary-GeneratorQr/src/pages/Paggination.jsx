import React from "react";
import "./Paggination.scss";

const Paggination = ({ bookPerPage, totalBook, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBook / bookPerPage); i++) {
    pageNumbers.push(i);
  }
  const getPage = (number) => {
    // paginate(number);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    console.log(number);
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
            <a className="pagelink">{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paggination;
