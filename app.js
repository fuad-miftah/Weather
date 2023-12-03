const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/getWeather', async (req, res) => {
    const { cities } = req.body;
    const weatherResults = await getWeatherData(cities);
    res.json({ weather: weatherResults });
});

async function getWeatherData(cities) {
    const weatherResults = {};

    const apiKey = '';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    for (const city of cities) {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    q: city,
                    appid: apiKey,
                    units: 'metric',
                },
            });

            const temperature = response.data.main.temp;
            weatherResults[city] = `${temperature}C`;
        } catch (error) {
            console.error(`Error fetching weather for ${city}: ${error.message}`);
            weatherResults[city] = 'N/A';
        }
    }

    return weatherResults;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
