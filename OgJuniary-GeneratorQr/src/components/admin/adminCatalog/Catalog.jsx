import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { Pagination } from "@mui/material";
import { useInfoBook } from "./../../../api/api";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import MuiColor from "../../../pages/MuiColor";

function Catalog() {
  const theme = MuiColor();
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
      <ThemeProvider theme={theme}>
        <Pagination
          className="paggination"
          count={countPage}
          color="orange"
          page={currentPage}
          onChange={handleChange}
        />
      </ThemeProvider>
    </div>
  );
}

export default Catalog;
