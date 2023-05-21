import "./BlockGenres.scss";

export default function BlockGenres({ id, genre, clas }) {
  return (
    <div className={clas}>
      <span>{genre}</span>
    </div>
  );
}
