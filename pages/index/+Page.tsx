export { Page }
import { useState } from 'react'
import './index.css'
import Booklist from "../../components/Booklist";
import BookDetailsPopup from '../../components/BookDetailsPopup';
function Page() {
  const [showAddBook, setShowAddBook] = useState(false)
  return (
    <>
      <button onClick={() => setShowAddBook(true)}>Add Book</button>
      {showAddBook && <BookDetailsPopup book={null} />}
      <Booklist />
    </>
  )
}
