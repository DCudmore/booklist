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
        dispatch(removeBook(book.id))
    }

    return (
        <>
        <li className='book-list-item'>
            <div className="book-name" onClick={() => setShowBookDetails(true)}>{book.name}</div>
            <div className="book-price">${book.price.toFixed(2)}</div>
            <div className="book-category">{book.category}</div>
            <div className='book-actions'>
                <button onClick={handleRemoveBook} aria-label="Remove book" className='delete-book'>Remove</button>
            </div>
        </li>

        {showBookDetails && <BookDetailsPopup book={book} hideOverlay={() => setShowBookDetails(false)} />}
        </>
    )
}


export default BookItem