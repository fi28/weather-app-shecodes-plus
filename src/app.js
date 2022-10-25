//we want day and and time

function currentTime(now) {
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
  return timeDay;
}

function updateTemperature(response) {
  console.log(response.data.condition.icon_url);
  let cityName = document.querySelector("#chosen-city");
  cityName.innerHTML = `${response.data.city}`;
  document.querySelector("#current-temperature-value").innerHTML = Math.round(
    response.data.temperature.current
  );
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
  // document.querySelector(
  //   ".main-icon"
  // ).innerHTML = <img src = `${response.data.condition.icon_url}` >
}

function search(city) {
  let apiKey = "f3a9oa3363ft3b740c40b00ab384f6d4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiURL);

  axios.get(apiURL).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

function locationData(position) {
  console.log(position);
  let apiKey = "f3a9oa3363ft3b740c40b00ab384f6d4";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  console.log(apiURL);

  axios.get(apiURL).then(updateTemperature);
}
function getPosition() {
  console.log("yay");
  navigator.geolocation.getCurrentPosition(locationData);
}

let now = new Date();
let timeDay = currentTime(now);
let timeIs = document.querySelector("#time-of-day");
timeIs.innerHTML = `${timeDay}`;

let cityForm = document.querySelector("#searchcity");
cityForm.addEventListener("submit", updateCity);

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getPosition);

search("Narrabri");
