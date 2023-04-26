import "./book.scss";
import { useParams } from "react-router-dom";

const Book = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export { Book };
