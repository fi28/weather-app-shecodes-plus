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
  console.log(response.data.wind.speed);
  let cityName = document.querySelector("#chosen-city");
  cityName.innerHTML = `${response.data.name}`;
  document.querySelector("#current-temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#temp-range"
  ).innerHTML = `Min/Max: ${response.data.main.temp_min}/${response.data.main.temp_max}°C`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed}km/hr`;
}

function search(city) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiURL);

  axios.get(apiURL).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

// function updateLocation(response) {
//   console.log(response.data.name);
//   console.log(response.data.main.temp);
//   console.log(response.data.weather[0].description);
//   console.log(response.data.main.humidity);
//   console.log(response.data.wind.speed);

//   document.querySelector("#chosen-city").innerHTML = `${response.data.name}`;
//   document.querySelector(
//     "#current-temperature-value"
//   ).innerHTML = `${Math.round(response.data.main.temp)}`;
//   document.querySelector(
//     "#temp-range"
//   ).innerHTML = `Min/Max: ${response.data.main.temp_min}/${response.data.main.temp_max}°C`;
//   document.querySelector(
//     "#weather-description"
//   ).innerHTML = `${response.data.weather[0].description}`;
//   document.querySelector(
//     "#humidity"
//   ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
//   document.querySelector(
//     "#wind"
//   ).innerHTML = `${response.data.wind.speed}km/hr`;
// }
function locationData(position) {
  console.log(position);
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
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

search("Brisbane");
