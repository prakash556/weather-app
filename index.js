const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML and CSS)
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City parameter is required.');
  }

  try {
    const apiKey = "b0ecde0aa7msh4000c55386b3d0ap1a619djsn5b8ac1b1b077"; // Replace with your OpenWeatherMap API key
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    res.status(500).send('Could not fetch weather data.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
