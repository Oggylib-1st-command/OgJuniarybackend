import { configureStore } from "@reduxjs/toolkit";
import bookReduser from "./books/Slice";

export default configureStore({
  reducer: {
    books: bookReduser,
  },
});
