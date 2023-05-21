import Header from "../../../components/admin/adminHeader/Header";
import "./AllGenres.scss";
import { useInfoGenre } from "../../api";
import BlockGenres from "../../../components/admin/adminBlockGenres/BlockGenres";

const AllGenres = () => {
  const { genre } = useInfoGenre();
  return (
    <div>
      <Header />
      {genre.map((target) => (
        <BlockGenres id={target.id} genre={target.name} clas="block__inner" />
      ))}
    </div>
  );
};

export default AllGenres;
