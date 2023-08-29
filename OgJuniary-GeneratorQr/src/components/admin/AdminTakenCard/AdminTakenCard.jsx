import "./TakenCard.scss";
import { useInfoBookId } from "../../../api/api";
export const AdminTakenCard = ({ id, index }) => {
  const { book } = useInfoBookId(id);
  return !book ? (
    <h4>loading...</h4>
  ) : (
    <h3 className="taken-book__list-item">{`${index + 1})${book.title}`}</h3>
  );
};
