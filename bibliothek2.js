const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();
const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Beispiel Daten für Bücher
let books = [
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

// Beispiel Daten für Ausleihen
let lends = [];

// GET /books - Gibt die Liste von allen Büchern als JSON zurück
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/{isbn} - Gibt alle Informationen zu einem Buch als JSON zurück
app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

// POST /books - Erstellt ein neues Buch in der Liste und gibt dasselbe Objekt wieder als JSON zurück
app.post('/books', (req, res) => {
    const { isbn, title, year, author } = req.body;
    if (!isbn || !title || !year || !author) {
        res.status(422).send('Alle Attribute müssen ausgefüllt sein');
    } else {
        const newBook = { isbn, title, year, author };
        books.push(newBook);
        res.json(newBook);
    }
});

// PUT /books/{isbn} - Überschreibt das Buch in der Liste und gibt dasselbe Objekt wieder als JSON zurück
app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const { title, year, author } = req.body;
    const index = books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        if (!title || !year || !author) {
            res.status(422).send('Alle Attribute müssen ausgefüllt sein');
        } else {
            books[index] = { isbn, title, year, author };
            res.json(books[index]);
        }
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

// DELETE /books/{isbn} - Löscht das Buch in der Liste
app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const index = books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        books.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

// GET /lends - Gibt alle Ausleihen als JSON zurück
app.get('/lends', (req, res) => {
    res.json(lends);
});

// GET /lends/{id} - Gibt alle Informationen zu einer Ausleihe als JSON zurück
app.get('/lends/:id', (req, res) => {
    const id = req.params.id;
    const lend = lends.find(lend => lend.id === id);
    if (lend) {
        res.json(lend);
    } else {
        res.status(404).send('Ausleihe nicht gefunden');
    }
});

// POST /lends - Leiht ein neues Buch aus
app.post('/lends', (req, res) => {
    const { customer_id, isbn } = req.body;
    const book = books.find(book => book.isbn === isbn);
    if (!customer_id || !isbn) {
        res.status(422).send('Alle Attribute müssen ausgefüllt sein');
    } else if (!book) {
        res.status(404).send('Buch nicht gefunden');
    } else if (lends.find(lend => lend.isbn === isbn && !lend.returned_at)) {
        res.status(409).send('Das Buch ist bereits ausgeliehen');
    } else if (lends.filter(lend => lend.customer_id === customer_id && !lend.returned_at).length >= 3) {
        res.status(409).send('Der Kunde hat bereits 3 ausgeliehene Bücher');
    } else {
        const newLend = {
            id: Date.now().toString(),
            customer_id,
            isbn,
            borrowed_at: new Date(),
            returned_at: null
        };
        lends.push(newLend);
        res.json(newLend);
    }
});


app.delete('/lends/:id', (req, res) => {
    const id = req.params.id;
    const lendIndex = lends.findIndex(lend => lend.id === id);
    if (lendIndex !== -1) {
        lends[lendIndex].returned_at = new Date();
        res.sendStatus(204);
    } else {
        res.status(404).send('Ausleihe nicht gefunden');
    }
});

app.get('/swagger-ui', (req, res) => {
    try {
        const jsonFilePath = 'openapi3_0.json';

        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');


        const data = JSON.parse(jsonData);


        res.json(data);
    } catch (error) {
        console.error('Fehler beim Lesen der JSON-Datei:', error);

        res.status(500).send('Interner Serverfehler');
    }
});


const app = express();
app.use(bodyParser.json());


const validUser = {
    email: "desk@library.example",
    password: "m295"
};

// Session-Status
let isAuthenticated = false;
let authenticatedUser = null;


const authenticate = (req, res, next) => {
    if (isAuthenticated) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === validUser.email && password === validUser.password) {
        isAuthenticated = true;
        authenticatedUser = email;
        res.status(201).json({ email: authenticatedUser });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.delete('/logout', (req, res) => {
    isAuthenticated = false;
    authenticatedUser = null;
    res.status(204).send();
});

app.get('/verify', (req, res) => {
    if (isAuthenticated) {
        res.status(200).json({ email: authenticatedUser });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.get('/lends', authenticate, (req, res) => {
    res.status(200).send("Authenticated user can access this resource");
});


app.get('/test', authenticate, (req, res) => {
    res.status(200).send("Authenticated user can access this resource");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
