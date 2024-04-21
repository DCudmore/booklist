import { useState } from 'react';
import { Book } from "../types/types";
import BookDetailsPopup from '../components/BookDetailsPopup';
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";

import { removeBook } from "../state/books/bookSlice";

const categoryToColor: Record<string, string> = {
    "Arts": "#00b894",
    "Biographies": "#00cec9",
    "Business": "#0984e3",
    "Gaming": "#6c5ce7",
    "Education": "#1289A7",
    "Engineering": "#fdcb6e",
    "Health": "#e17055",
    "History": "#d63031",
    "Law": "#e84393",
    "Literature": "#2d3436",
    "Nonfiction": "#EE5A24",
    "Travel": "#B53471",
    "Other": "#0652DD"
};

const BookItem = ({ book }: { book: Book }) => {
    const [showBookDetails, setShowBookDetails] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveBook = () => {
        dispatch(removeBook(book.id))
    }

    return (
        <>
            <li className='book-list-item'>
                <div className="book-name" onClick={() => setShowBookDetails(true)}>{book.name}</div>
                <div className="book-price">${book.price.toFixed(2)}</div>
                <div className="book-category">
                    <span style={{ backgroundColor: categoryToColor[book.category] || '#000' }} className='book-category-item'>{book.category}</span>
                </div>
                <div className='book-actions'>
                    <button onClick={handleRemoveBook} aria-label="Remove book" className='delete-book'>Remove</button>
                </div>
            </li>

            {showBookDetails && <BookDetailsPopup book={book} hideOverlay={() => setShowBookDetails(false)} />}
        </>
    )
}


export default BookItem