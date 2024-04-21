import { createSlice } from "@reduxjs/toolkit";
import initialBookData from "./bookData.json";
type Book =  {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
}

interface BooksState {
    value: Book[];
}

const initialState: BooksState = {
    value: initialBookData,
};

const counterSlice = createSlice({
    name: "counter",
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

export const { addBook, removeBook } = counterSlice.actions;

export default counterSlice.reducer;