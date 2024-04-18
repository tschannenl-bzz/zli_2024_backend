const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();


app.use(session({
    secret: 'geheimnisvollesGeheimnis',
    resave: false,
    saveUninitialized: true
}));

// Parser für JSON-Anfragen
app.use(bodyParser.json());

app.post('/name', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Name fehlt');
    }
    req.session.name = name;
    res.send('Name gespeichert');
});


app.get('/name', (req, res) => {
    const name = req.session.name;
    if (!name) {
        return res.status(404).send('Name nicht gefunden');
    }
    res.send(`Gespeicherter Name: ${name}`);
});

app.delete('/name', (req, res) => {
    delete req.session.name;
    res.send('Name gelöscht');
});


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
