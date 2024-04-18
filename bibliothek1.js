const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = 4000;

const books = [
    {
        isbn: '978-3-16-148410-0',
        title: 'Der große Gatsby',
        year: 1925,
        author: 'F. Scott Fitzgerald'
    },
    {
        isbn: '978-3-446-25855-7',
        title: 'Harry Potter und der Stein der Weisen',
        year: 1997,
        author: 'J.K. Rowling'
    },
    {
        isbn: '978-3-596-52068-8',
        title: 'Der Herr der Ringe',
        year: 1954,
        author: 'J.R.R. Tolkien'
    },
    {
        isbn: '978-3-15-009432-0',
        title: '1984',
        year: 1949,
        author: 'George Orwell'
    },
    {
        isbn: '978-3-453-01879-8',
        title: 'To Kill a Mockingbird',
        year: 1960,
        author: 'Harper Lee'
    },
    {
        isbn: '978-3-499-25720-6',
        title: 'The Catcher in the Rye',
        year: 1951,
        author: 'J.D. Salinger'
    },
    {
        isbn: '978-3-492-30625-6',
        title: 'Pride and Prejudice',
        year: 1813,
        author: 'Jane Austen'
    },
    {
        isbn: '978-3-15-017650-7',
        title: 'Anna Karenina',
        year: 1877,
        author: 'Leo Tolstoy'
    },
    {
        isbn: '978-3-15-002322-1',
        title: 'The Great Gatsby',
        year: 1925,
        author: 'F. Scott Fitzgerald'
    },
    {
        isbn: '978-3-455-31535-7',
        title: 'Der Graf von Monte Christo',
        year: 1844,
        author: 'Alexandre Dumas'
    }
];


app.get('/books', (req,res)=>{
    res.send(books)
})

app.get('/books/:isbn', (req, res)=>{
    const isbn = req.params.isbn
    res.send(books.find((books) => books.isbn === isbn))
})

app.post('/books', (req,res)=>{
    const newBook = req.body
    res.send(newBook)
})

app.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params
    const updatedBook = req.body
    const index = books.findIndex(b => b.isbn === isbn)
    books[index] = updatedBook
    res.json(updatedBook)
});

app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params
    books.filter(b => b.isbn !== isbn)
    res.sendStatus(204)
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});