import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { Pagination } from "@mui/material";
import { useInfoBook } from "./../../../api/api";
import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

function Catalog() {
  const { book } = useInfoBook();
  const NumberPage = localStorage.getItem("Page") || 1;
  const [currentPage, setCurrentPage] = useState(NumberPage);
  const [bookOnPage] = useState(20);
  const countPage = Math.ceil(book.length / bookOnPage);
  const lastBookOnPage = currentPage * bookOnPage;
  const firstBookOnPage = lastBookOnPage - bookOnPage;

  const handleChange = (prev, next) => {
    setCurrentPage(next);
    localStorage.setItem("page", prev);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    return localStorage.removeItem("page");
  }, []);

  return (
    <div>
      <div className="admin-catalog__inner">
        {book.slice(firstBookOnPage, lastBookOnPage).map((target) => (
          <BookCardCatalog
            key={target.id}
            id={target.id}
            title={target.title}
            author={target.author}
            image={target.image}
            holder={target.holder}
          />
        ))}
      </div>
      <Pagination
        className="paggination"
        count={countPage}
        color="primary"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}

export default Catalog;
