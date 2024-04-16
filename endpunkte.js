const express = require('express');
const {response} = require("express");
const {readFile} = require("fs");
const app = express();
const fs = require('fs');

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
//8
app.get('/secret', (req,res)=>{
    res.status(403).send()
})


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})