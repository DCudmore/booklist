import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Book } from "../types/types";
import BookItem from "./BookItem";

const BookList = () => {
    const books = useSelector((state: RootState) => state.books.value);
    
    return (
        <div id="book-list-container">
            {books.length > 0 ?
                <ul id="book-list">
                    <li className='book-list-item'>
                        <div className="book-name">Name</div>
                        <div className="book-price">Price</div>
                        <div className="book-category">Category</div>
                        <div className='book-actions'></div>
                    </li> 

                    {books.map((book: Book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </ul>
                :
                <p id="no-books-found">{"No books found. Click 'Add Book' to add a new book"}</p>
            }
        </div>
    );
};


export default BookList;
