export { Page }
import { useState } from 'react'
import './index.css'
import Booklist from "../../components/BookList";
import BookDetailsPopup from '../../components/BookDetailsPopup';
function Page() {
  const [showAddBook, setShowAddBook] = useState(false)
  return (
    <>
      <div id="page-header">
        <h1>Your Booklist</h1>
        <button onClick={() => setShowAddBook(true)} aria-label="Add book" className='add-book'>+ Add Book</button>
      </div>
      {showAddBook && <BookDetailsPopup book={null} hideOverlay={() => setShowAddBook(false)}/>}
      <Booklist />
    </>
  )
}
