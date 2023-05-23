import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosBookById = createAsyncThunk(
  "books/axiosBookById",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(`http://localhost:8000/book/${id}/`); // проверить почему отваливаются CORS, если убрать слеш

      if (response.status !== 200) {
        console.log("haha");
        throw new Error("server Error!");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState: {
    status: null,
    error: null,
    book: {
      id: 0,
      genres: [],
      comment: [],
      image: "",
      title: "",
      author: "",
      year: "",
      languagle: "",
      description: "",
    },
  },
  reducers: {
    addBook(state, { type, payload }) {
      state.book = { ...payload };
    },
    removeBook(state, action) {
      state.book = {
        id: 0,
        genres: [],
        comment: [],
        image: "",
        title: "",
        author: "",
        year: "",
        languagle: "",
        description: "",
      };
    },
  },
  extraReducers: {
    [axiosBookById.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [axiosBookById.fulfilled]: (state, { type, payload }) => {
      state.status = "resolved";
      state.book = { ...payload };
    },
    [axiosBookById.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { addBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;
