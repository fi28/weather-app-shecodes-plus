//we want day and and time
function farenhiteConversion(event) {
  event.preventDefault;

  let currentTemp = document.querySelector("#current-temperature-value");
  currentFarenhiteTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = `${currentFarenhiteTemp}`;
  celsiusLink.classList.remove("active");
  farenhiteLink.classList.add("active");
}
function celsiusConversion(event) {
  event.preventDefault;
  let currentTemp = document.querySelector("#current-temperature-value");
  currentTemp.innerHTML = `${celsiusTemp}`;
  celsiusLink.classList.add("active");
  farenhiteLink.classList.remove("active");
}

function currentTime(time) {
  let now = new Date(time);
  // console.log(now);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayNumber = now.getDay();
  let day = days[dayNumber];
  console.log(day);
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeDay = `${day} ${hour}:${minutes}`;
  let timeIs = document.querySelector("#time-of-day");
  timeIs.innerHTML = `${timeDay}`;
  // return timeDay;
  // let timeDay = currentTime(now);
}
function updateForecast(response) {
  // console.log(response);
  console.log(response.data);
}
function forecastSearch(city) {
  let cityName = city;
  let apiKey = "f3a9oa3363ft3b740c40b00ab384f6d4";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(updateForecast);
}

function updateTemperature(response) {
  // console.log(response.data.condition.icon_url);

  let cityName = document.querySelector("#chosen-city");
  cityName.innerHTML = `${response.data.city}`;

  celsiusTemp = Math.round(response.data.temperature.current);
  document.querySelector(
    "#current-temperature-value"
  ).innerHTML = `${celsiusTemp}`;
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels Like ${response.data.temperature.feels_like} °C`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.condition.description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/hr`;

  let weatherImage = document.querySelector("#main-icon");
  weatherImage.setAttribute("src", `${response.data.condition.icon_url}`);
  weatherImage.setAttribute("alt", `${response.data.condition.description}`);
  let timePlace = response.data.time * 1000;
  // console.log(timePlace);
  currentTime(timePlace);

  // Forecast Info - not working
  let city = `${response.data.city}`;
  forecastSearch(city);
}

function search(city) {
  let apiKey = "f3a9oa3363ft3b740c40b00ab384f6d4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  // console.log(apiURL);

  axios.get(apiURL).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

function locationData(position) {
  // console.log(position);
  let apiKey = "f3a9oa3363ft3b740c40b00ab384f6d4";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  console.log(apiURL);

  axios.get(apiURL).then(updateTemperature);
}
function getPosition() {
  // console.log("yay");
  navigator.geolocation.getCurrentPosition(locationData);
}

let cityForm = document.querySelector("#searchcity");
cityForm.addEventListener("submit", updateCity);

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getPosition);

let farenhiteLink = document.querySelector("#farenhite-link");
farenhiteLink.addEventListener("click", farenhiteConversion);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConversion);

let celsiusTemp = null;

search("Brisbane");
