# Frontend Developer test - Bookstore

The project is a single-page application for managing a list of books. The main page displays a list of books, each showing the book's name, price, category, and a delete button. Users can add, modify, or remove books.

You can view a [hosted Demo here](https://github.com){:target="_blank"}

Folders of interest:

* The home page is built from "./pages/index/+Page.tsx"
* Components are all in "./components"
* Redux logic is found in "./state"
* Test files are in "./tests"
* Types are in "./types"

## Installation

To install locally:

```bash
git clone https://github.com/dcudmore/booklist.git
cd booklist
yarn install
yarn dev
```

To run tests, simply run the following in the home directory:

```
yarn test
```

## Features / Details

This app was built with the following in mind:

* Built with Vike (powered by Vite) in order to enable SSR
* Uses Redux and Redux Toolkit
* Tests cover the main functionality of adding, removing, and editing book items
* While there are minimal tests and types for this small project, I structured the app in a way that I feel like is scalable if the app was extended further
* The app features a basic Github actions workflow to deploy to Github Pages