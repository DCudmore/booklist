import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../state/store.ts";
import user from '@testing-library/user-event';
import '@testing-library/jest-dom'
import BookDetailsPopup from '../components/BookDetailsPopup';

describe('BookDetailsPopup - Component test', () => {

    it('can add a book', async () => {
        render(<Provider store={store}><BookDetailsPopup book={null} hideOverlay={() => {}} /></Provider>)

        // get initial length of store
        const initialStoreItems = store.getState().books.value.length

        // fill out the input fields
        const nameInput = screen.getByLabelText('Name')
        const priceInput = screen.getByLabelText('Price')
        const categoryInput = screen.getByLabelText('Category')
        const descriptionInput = screen.getByLabelText('Description')

        await user.type(nameInput, 'New book title')
        await user.type(priceInput, '10')
        await user.selectOptions(categoryInput, 'Business')
        await user.type(descriptionInput, 'A fantastic book')
        
        // submit the form
        const submitButton = screen.getByRole('button', { name: /submit/i })
        user.click(submitButton)

        // check that the book was added to the store
        await waitFor(() => {
            expect(store.getState().books.value.length).toBe(initialStoreItems + 1)
        });
    })

    it('can update a book', async () => {
        // get first item from store
        const firstBook = store.getState().books.value[0]
        render(<Provider store={store}><BookDetailsPopup book={firstBook} hideOverlay={() => {}}/></Provider>)

        // fill out the input fields
        const nameInput = screen.getByLabelText('Name')
        const priceInput = screen.getByLabelText('Price')
        const categoryInput = screen.getByLabelText('Category')
        const descriptionInput = screen.getByLabelText('Description')

        await user.type(nameInput, " updated")
        await user.type(priceInput, String(firstBook.price))
        await user.selectOptions(categoryInput, 'Business')
        await user.type(descriptionInput, firstBook.description)

        // submit the form
        const submitButton = screen.getByRole('button', { name: /submit/i })

        // check that button exists
        expect(submitButton).toBeInTheDocument()

        user.click(submitButton)

        // check that the book was updated in the store
        await waitFor(() => {
            expect(store.getState().books.value[0].name).toBe("The 151 Secrets of Tetris updated")
        });
    })

})

