import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Book } from "../types/types";
import BookItem from "./BookItem";
const BookList = () => {
    const books = useSelector((state: RootState) => state.books.value);
    console.log('books in booklist', books)
    return (
        <div>
            {
                books.map((book: Book) => (
                    <BookItem key={book.id} book={book} />
                ))
            }
        </div>
    );
};


export default BookList;