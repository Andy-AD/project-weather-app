import "./style.css";

async function getCoordinates(location) {
  if (!location) return;
  try {
    const coordinatesResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=4b7532780c2ede1a5223f0e7284a89f0`
    );
    const coordinatesData = await coordinatesResponse.json();
    const lat = coordinatesData[0].lat;
    const lon = coordinatesData[0].lon;
    return { lat, lon };
  } catch (err) {
    console.log(err);
  }
}

async function getWeather({ lat, lon }) {
  try {
    const fetchWeather = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=4b7532780c2ede1a5223f0e7284a89f0&units=metric`
    );
    const weatherData = await fetchWeather.json();
    return {
      city: weatherData.name,
      country: weatherData.sys.country,
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
    };
  } catch (err) {
    console.log(err);
  }
}
getCoordinates("Calgary")
  .then(getWeather)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
