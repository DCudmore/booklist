import { useState } from 'react'
import { Book } from "../types/types";
import BookDetailsPopup from '../components/BookDetailsPopup';
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";

import { removeBook } from "../state/books/bookSlice";
const BookItem = ({ book }: { book: Book }) => {
    const [showBookDetails, setShowBookDetails] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveBook = () => {
        console.log('handleRemoveBook', book)
        dispatch(removeBook(book.id))
    }

    return (
        <>
        <div>
            <div onClick={() => setShowBookDetails(true)}>{book.name}</div>
            <div>{book.price}</div>
            <div>{book.category}</div>
            <div>{book.description}</div>
            <div>
                <button onClick={handleRemoveBook}>Remove</button>
            </div>
        </div>

        {showBookDetails && <BookDetailsPopup book={book} />}
        </>
    )
}


export default BookItem