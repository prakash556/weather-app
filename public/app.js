document.addEventListener('DOMContentLoaded', () => {
  const getWeatherButton = document.getElementById('getWeather');
  const cityInput = document.getElementById('city');
  const weatherData = document.getElementById('weatherData');

  getWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value;
    if (!city) {
      weatherData.innerText = 'Please enter a city name.';
      return;
    }

    try {
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();
      if (data.cod === 200) {
        const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        weatherData.innerHTML = `<p>City: ${data.name}</p>
                                 <p>Temperature: ${temperature} &#8451;</p>
                                 <p>Weather: ${data.weather[0].description}</p>`;
      } else {
        weatherData.innerText = 'City not found. Please check the city name.';
      }
    } catch (error) {
      weatherData.innerText = 'Error fetching weather data.';
    }
  });
});
