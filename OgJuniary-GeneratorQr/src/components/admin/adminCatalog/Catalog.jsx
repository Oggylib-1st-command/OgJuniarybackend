import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { Pagination } from "@mui/material";
import { useInfoBook } from "./../../../api/api";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";

import MuiColor from "../../../pages/MuiColor";

function Catalog({ sortBook }) {
  const theme = MuiColor();
  const { book } = useInfoBook();
  const NumberPage = parseInt(localStorage.getItem("page")) || 1;
  const [currentPage, setCurrentPage] = useState(NumberPage);
  const bookOnPage = 20;
  const countPage =
    sortBook.length !== 0
      ? Math.ceil(sortBook.length / bookOnPage)
      : Math.ceil(book.length / bookOnPage);
  const lastBookOnPage = currentPage * bookOnPage;
  const firstBookOnPage = lastBookOnPage - bookOnPage;

  const handleChange = (prev, next) => {
    setCurrentPage(next);
    localStorage.setItem("page", next);
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
      <div className="admin-catalog__wrapper">
        <div className="admin-catalog__inner">
          {sortBook.length === 0
            ? book
                .slice(firstBookOnPage, lastBookOnPage)
                .map((target) => (
                  <BookCardCatalog
                    key={target.id}
                    id={target.id}
                    title={target.title}
                    author={target.author}
                    image={target.image}
                    holder={target.holder}
                  />
                ))
            : sortBook
                .slice(firstBookOnPage, lastBookOnPage)
                .map((target) => (
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
      </div>
      {book.length === 0 ? (
        <></>
      ) : (
        <ThemeProvider theme={theme}>
          <Pagination
            className="paggination"
            count={countPage}
            color="orange"
            page={currentPage}
            onChange={handleChange}
          />
        </ThemeProvider>
      )}
    </div>
  );
}

export default Catalog;
