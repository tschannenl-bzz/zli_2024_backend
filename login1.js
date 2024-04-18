const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();


const username = process.env.USERNAME || 'zli';
const password = process.env.PASSWORD || 'zli1234';


const authMiddleware = basicAuth({
    users: { [username]: password },
    challenge: true
});


app.get('/public', (req, res) => {
    res.send('Öffentlicher Bereich');
});


app.get('/private', authMiddleware, (req, res) => {
    res.send('Privater Bereich');
});

app.get('/login', (req, res) => {
    res.send('Bitte geben Sie Benutzername und Passwort ein.');
});


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
