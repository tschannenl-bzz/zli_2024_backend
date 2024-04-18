const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/now', (req, res) => {
    // Get timezone from query parameters, default to UTC if not provided
    const timezone = req.query.tz || 'UTC';
    const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });
    res.status(200).json({ currentTime });
});


let namesList = [];
app.post('/names', (req, res) => {
    const newName = req.body.name;
    namesList.push(newName);
    res.status(201).send(`Name "${newName}" added to the list`);
});

app.delete('/names', (req, res) => {
    const nameToRemove = req.query.name;
    namesList = namesList.filter(name => name !== nameToRemove);
    res.sendStatus(204);
});


app.get('/secret2', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Basic aGFja2VyOjEyMzQ=') {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});


app.get('/chuck', async (req, res) => {
    try {
        const name = req.query.name || 'Chuck Norris';
        const chuckResponse = await axios.get('https://api.chucknorris.io/jokes/random');
        const joke = chuckResponse.data.value.replace(/Chuck Norris/g, name);
        res.status(200).json({ joke });
    } catch (error) {
        console.error('Error fetching Chuck Norris joke:', error.message);
        res.sendStatus(500);
    }
});


let meObject = {
    Vorname: 'Max',
    Nachname: 'Mustermann',
    Alter: 30,
    Wohnort: 'Musterstadt',
    Augenfarbe: 'Blau'
};


app.patch('/me', (req, res) => {
    meObject = { ...meObject, ...req.body };
    res.status(200).json({ updatedMe: meObject });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
