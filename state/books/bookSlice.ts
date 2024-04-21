import { createSlice } from "@reduxjs/toolkit";
import initialBookData from "./bookData.json";
import { Book } from "../../types/types";

interface BooksState {
    value: Book[];
}

const initialState: BooksState = {
    value: initialBookData,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.value.push(action.payload);
        },
        removeBook: (state, action) => {
            state.value = state.value.filter((book) => book.id !== action.payload);
        },
    },
});

export const { addBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;