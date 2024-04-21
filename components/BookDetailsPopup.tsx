import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { addBook, updateBook } from "../state/books/bookSlice";
import { Book } from "../types/types";

const BookDetailsDefault: Book = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: ''
}

const BookDetailsPopup = ({ book }: { book: Book | null }) => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books.value);
    const [bookDetails, setBookDetails] = useState<Book>(BookDetailsDefault)
    useEffect(() => {
        console.log('book', book)
        if (book) {
            setBookDetails(book)
        } else {
            // retrieve a new id
            // get the current maximum
            let max = 0
            books.forEach((book) => {
                if (book.id > max) {
                    max = book.id
                }
            })
            console.log('new id', max + 1)
            setBookDetails({ ...bookDetails, id: max + 1 })
        }
    }, [book])

    const handleBookDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // validate that all fields are filled out
        if (!bookDetails.name || !bookDetails.price || !bookDetails.category || !bookDetails.description) {
            alert('Please fill out all fields')
            return
        }

        // dispatch action to add book
        console.log('bookDetails', bookDetails)

        // if the book was initially null, create new book, otherwise update existing book
        if (!book) {
            dispatch(addBook(bookDetails))
        } else {
            dispatch(updateBook(bookDetails))
        }

        // reset form
        setBookDetails(BookDetailsDefault)


        // close popup

    }

    return (
        <div>
            <form style={{ border: '1px solid black' }}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={bookDetails.name} onChange={(e) => setBookDetails({ ...bookDetails, name: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: Number(e.target.value) })} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={bookDetails.description} onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })} />
                </div>
                <button type="submit" onClick={handleBookDetailsSubmit}>{book ? 'Update Book' : 'Add Book'}</button>
            </form>
        </div>
    )
}


export default BookDetailsPopup