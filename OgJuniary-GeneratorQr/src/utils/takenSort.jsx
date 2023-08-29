import axios from "axios";
export const names = [
  {
    id: "1",
    state: "По новизне",
  },
  {
    id: "2",
    state: "По популярности",
  },
  {
    id: "3",
    state: "По алфавиту(убывание)",
  },
  {
    id: "4",
    state: "По алфавиту(возрастание)",
  },
];
export function takenSort(value) {
  switch (value) {
    case "1":
      return axios
        .get("http://127.0.0.1:8000/sorted/time/?sort=")
        .then((response) => response.data);
    case "2":
      return axios
        .get("http://127.0.0.1:8000/sorted/rating/?sort=")
        .then((response) => response.data);
    case "3":
      return axios
        .get("http://127.0.0.1:8000/sorted/book/?sort=desc")
        .then((response) => response.data);
    case "4":
      return axios
        .get("http://127.0.0.1:8000/sorted/book/?sort=")
        .then((response) => response.data);
    default:
      break;
  }
}

export function takenSortAdmin(value) {
  switch (value) {
    case "По алфавиту: От Я до А":
      return axios
        .get("http://127.0.0.1:8000/sorted/book/?sort=desc")
        .then((response) => response.data);
      break;
    case "По алфавиту: От А до Я":
      return axios
        .get("http://127.0.0.1:8000/sorted/book/?sort=")
        .then((response) => response.data);
      break;
    default:
      break;
  }
}
