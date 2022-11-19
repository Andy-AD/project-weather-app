import "./style.css";

const searchBtn = document.getElementById("search");
const searchField = document.getElementById("input-city");
const areaNameDisplay = document.getElementById("city");
const tempDisplay = document.getElementById("temp");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchField.value === "") return;
  if (iconDisplay.firstElementChild) {
    iconDisplay.firstElementChild.remove();
  }
  weatherHandler(searchField.value);
  searchField.value = "";
});

async function weatherHandler(city) {
  const weatherData = await getWeatherData(city);
  displayWeather(weatherData);
}

async function getWeatherData(city) {
  try {
    const cityCoordinates = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4b7532780c2ede1a5223f0e7284a89f0`
    ).then((response) => {
      return response.json();
    });
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityCoordinates[0].lat}&lon=${cityCoordinates[0].lon}&APPID=4b7532780c2ede1a5223f0e7284a89f0&units=metric`
    ).then((response) => {
      return response.json();
    });
    return weatherData;
  } catch (err) {
    console.error(err);
  }
}

async function displayWeather(weather) {
  const icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  iconDisplay.appendChild(icon);
  areaNameDisplay.textContent = `${weather.name}, ${weather.sys.country}`;
  tempDisplay.textContent = `${Math.round(weather.main.temp)}\u00B0 C`;
  descriptionDisplay.textContent = `Feels like: ${Math.round(
    weather.main.feels_like
  )}\u00B0 C. | ${weather.weather[0].description}`;
  console.log(weather)
}

weatherHandler("Zdolbuniv");