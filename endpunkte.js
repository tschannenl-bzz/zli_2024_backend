const express = require('express');
const {response} = require("express");
const {readFile} = require("fs");
const app = express();
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: True}));
//1
app.get('/now', (req, res) => {
    const currentTime = new Date().toLocaleString();
    res.send(`Aktuelle Zeit: ${currentTime}`)
});
//2
app.get('/zli', (req,res)=>{
    const url = 'https://www.zli.ch/'
    res.redirect(url)
})
//3
app.get('/name', (req,res)=> {
    const names = [
        'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
        'Kate', 'Liam', 'Mia', 'Nora', 'Oliver', 'Penelope', 'Quinn', 'Ryan', 'Sophia', 'Thomas'
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    res.send(`Random Name: ${randomName}`)
})
//4
app.get('/html', (req, res)=> {
    const file = 'C:\\Users\\leont\\ÜK_Backend_2024\\index.html'
    res.sendFile(file)
})
//5
app.get('/image', (req, res) => {
    const imagePath = "sinnerman.png"
    fs.readFile(imagePath, (err, data) => {
        res.contentType('image/jpeg');
        res.send(data);
    });
});
//6
app.get('/teapot', (req, res)=>{
    res.status(418).send('Tassenkopf')
})
//7
app.get('/user-agent', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`User-Agent: ${userAgent}`);
});
//8
app.get('/secret', (req,res)=>{
    res.status(403).send()
})

//10
app.get('/me', (req, res) => {
    const personalInfo = {
        "Vorname": "Max",
        "Nachname": "Mustermann",
        "Alter": 30,
        "Wohnort": "Musterstadt",
        "Augenfarbe": "Blau"
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(personalInfo));
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})