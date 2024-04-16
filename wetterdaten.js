
const express = require('express');
const request = require('request');
const port = 3000;
const app = express();

app.get('/temperature/:plz', (req, res) => {
    const plz = req.params.plz;
    const apiUrl = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;
    request.get({

        url: apiUrl,

        json: true,

        headers: {'User-Agent': 'request'}

    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err);

        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);

        } else {

// Assuming the temperature is available in the response data
            const temperature = data.currentWeather.temperature;

            res.send(`Wetter in PLZ ${plz} ist ${temperature}°C`);

        }

    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});