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
        updateBook: (state, action) => {
            state.value = state.value.map((book) => {
                if (book.id === action.payload.id) {
                    return action.payload;
                }
                return book;
            });
        },
    },
});

export const { addBook, removeBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;