import { render, screen, waitFor } from '@testing-library/react';
import BookList from '../components/BookList';
import user from '@testing-library/user-event';
import { Provider } from "react-redux";
import { store } from "../state/store.ts";
import '@testing-library/jest-dom'

describe('BookList - Component test', () => {

    it('displays book list', () => {
        render(<Provider store={store}><BookList /></Provider>)

        // check for a default book title on the page
        const title = screen.queryByText('The 151 Secrets of Tetris')
        expect(title).toBeInTheDocument()
    })

    it('can remove book', async () => {
        render(<Provider store={store}><BookList /></Provider>)
        // const button = screen.queryByRole('button')
        const buttons = screen.getAllByRole('button', { name: /remove book/i })

        expect(buttons[0]).toBeInTheDocument()

        // Click the first button (if it exists)
        if (buttons.length > 0) {
            user.click(buttons[0]);
        }

        // Wait for the book element to be removed from the DOM
        await waitFor(() => {
            expect(screen.queryByText('The 151 Secrets of Tetris')).not.toBeInTheDocument();
        });

    })

})