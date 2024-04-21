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

const categories = ['Arts', 'Biographies', 'Business', 'Gaming', 'Education', 'Engineering', 'Health', 'History', 'Law', 'Literature', 'Nonfiction', 'Travel', 'Other']
  
const BookDetailsPopup = ({ book, hideOverlay }: { book: Book | null, hideOverlay: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books.value);
    const [bookDetails, setBookDetails] = useState<Book>(BookDetailsDefault);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (book) {
            setBookDetails(book)
        } else {
            // retrieve a new id based on current max id
            let max = 0
            books.forEach((book) => {
                if (book.id > max) {
                    max = book.id
                }
            })
            setBookDetails({ ...bookDetails, id: max + 1 })
        }
    }, [book])

    const handleBookDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // validate that all fields are filled out
        if (!bookDetails.name || !bookDetails.price || !bookDetails.category || !bookDetails.description) {
            const requiredFields = ['name', 'price', 'category', 'description']
            const missingFields = requiredFields.filter(field => !bookDetails[field as keyof Book])

            setError(`Please fill out all fields. Missing: ${missingFields.join(', ')}.`)
            return
        }

        // if the book was initially null, create new book, otherwise update existing book
        if (!book) {
            dispatch(addBook(bookDetails))
        } else {
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
                        <input type="text" name="name" id="name" value={bookDetails.name} onChange={(e) => setBookDetails({ ...bookDetails, name: e.target.value })} aria-label="Book name" />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <div className='price-input-container'>
                            <span>$</span>
                            <input type="number" name="price" id="price" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: Math.round(parseFloat(e.target.value) * 100) / 100 })} aria-label="Book price" className='price-input' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} aria-label="Book category">
                            <option value=""></option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea rows={5} name="description" id="description" value={bookDetails.description} onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })} aria-label="Book description" />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <button type="submit" onClick={handleBookDetailsSubmit} className='add-book' aria-label="Submit">{book ? 'Update Book' : 'Add Book'}</button>
                </form>
            </div>
        </Overlay>
    )
}


export default BookDetailsPopup