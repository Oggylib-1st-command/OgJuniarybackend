import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { useState, useEffect } from "react";
import axios from "axios";

function Catalog() {
  const [book, setBook] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentpage, setCurrentpage] = useState(1);
  // const [bookperpage] = useState(10);
  useEffect(() => {
    const getBook = async () => {
      //setLoading(true);
      const res = await axios.get("http://localhost:8000/book/");
      setBook(res.data);
      //setLoading(false);
    };

    getBook();
  }, []);
  return (
    <div className="admin-catalog__inner">
      {book.map((target) => (
        <BookCardCatalog
          key={target.id}
          title={target.title}
          author={target.author}
          image={target.image}
        />
      ))}
    </div>
  );
}

export default Catalog;
