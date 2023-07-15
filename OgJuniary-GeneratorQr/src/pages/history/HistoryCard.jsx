import "./history.scss";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { useInfoUser } from "./../../api/api";
export const HistoryCard = (props) => {
  console.log(props);
  const { unfoUser } = useInfoUser();
  const [history] = useState([]);
  useEffect(() => {
    props.user.map((el) => {
      const filt = props.book.filter((hist) => hist.id === el);
      history.push(filt[0]);
    });
  }, []);
  return (
    <>
      {history
        ? history.map((el) => (
            <Card
              key={el.id}
              id={el.id}
              image={el.image}
              author={el.author}
              title={el.title}
              genre={el.genres.join(", ")}
              bookings={el.bookings}
              infoUser={unfoUser}
            />
          ))
        : "fefuhuerfu"}
    </>
  );
};
