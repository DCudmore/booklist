import { Book } from "../types/types";

const BookItem = ({ book }: { book: Book }) => {
    return (
        <div>
            <div>{book.name}</div>
            <div>{book.price}</div>
            <div>{book.category}</div>
            <div>{book.description}</div>
        </div>
    )
}


export default BookItem