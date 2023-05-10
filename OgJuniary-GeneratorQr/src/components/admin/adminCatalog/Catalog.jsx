import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { useInfoBook } from "../../../pages/api";

function Catalog() {
  //const [book, setBook] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentpage, setCurrentpage] = useState(1);
  // const [bookperpage] = useState(10);
  // useEffect(() => {
  //   const getBook = async () => {
  //     const res = await axios.get("http://localhost:8000/book/");
  //     setBook(res.data);
  //   };

  //   getBook();
  // }, []);

  const { book } = useInfoBook();

  return (
    <div className="admin-catalog__inner">
      {book.map((target) => (
        <BookCardCatalog
          key={target.id}
          id={target.id}
          title={target.title}
          author={target.author}
          image={target.image}
        />
      ))}
    </div>
  );
}

export default Catalog;
