import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { addBook, updateBook } from "../state/books/bookSlice";
import { Book } from "../types/types";
import Overlay from "./Overlay";
const BookDetailsDefault: Book = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: ''
}

const BookDetailsPopup = ({ book, hideOverlay }: { book: Book | null, hideOverlay: () => void }) => {
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
            console.log('Please fill out all fields')
            console.log('bookDetails', bookDetails)
            return
        }

        // dispatch action to add book
        console.log('bookDetails', bookDetails)

        // if the book was initially null, create new book, otherwise update existing book
        if (!book) {
            dispatch(addBook(bookDetails))
        } else {
            console.log('updateBook', bookDetails)
            dispatch(updateBook(bookDetails))
        }

        // reset form
        setBookDetails(BookDetailsDefault)

        // close popup
        hideOverlay()

    }

    return (
        <Overlay hideOverlay={hideOverlay}>
            <div>
                {<h2 className='update-book-heading'>{book ? 'Update Book Details' : 'Add Book'}</h2>}
                <form className='book-details-form'>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={bookDetails.name} onChange={(e) => setBookDetails({ ...bookDetails, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <div className='price-input-container'>
                            <span>$</span>
                            <input type="number" name="price" id="price" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: Math.round(parseFloat(e.target.value) * 100) / 100 })} className='price-input' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea rows={5} name="description" id="description" value={bookDetails.description} onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })} />
                    </div>
                    <button type="submit" onClick={handleBookDetailsSubmit} className='add-book'>{book ? 'Update Book' : 'Add Book'}</button>
                </form>
            </div>
        </Overlay>
    )
}


export default BookDetailsPopup