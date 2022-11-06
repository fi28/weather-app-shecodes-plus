//we want day and and time

function currentTime(time) {
  let now = new Date();
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}
function updateForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-info");
  let forecastHTML = ``;
  forecast.forEach(function (forecastDaily, index) {
    //remember that we are already in the daily info due to the forecast.forEach
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="card bg-light mb-3 first-day" style="max-width: 22.5rem;">
            <div class="card-body">
              <p class="card-text">
                <img src=${forecastDaily.condition.icon_url} width="40px"/>
                <span class="forecast-text"> <span id = "fc-day">${formatDay(
                  forecastDaily.time
                )}</span>: <span id="fc-max">${Math.round(
          forecastDaily.temperature.maximum
        )}</span>°C/ <span id="fc-min">${Math.round(
          forecastDaily.temperature.minimum
        )}</span>°C</span>
              </p>
            </div>
          </div>`;
    }
  });
  // forecastHTML = forecastHTML `` close anythin that needs it  here
  forecastElement.innerHTML = forecastHTML;

  // forecastElement.innerHTML = `

  //         <div class="card bg-light mb-3 second-day" style="max-width: 22.5rem;">
  //           <div class="card-body">
  //             <p class="card-text">
  //               <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" width="40px"/>
  //               <span class="forecast-text"> <span id = "fc-day">Tuesday</span>: <span id="fc-max">24</span>°C/ <span id="fc-min">10</span>°C</span>
  //             </p>
  //           </div>
  //         </div>

  //         <div class="card bg-light mb-3 third-day" style="max-width: 22.5rem;">
  //           <div class="card-body">
  //             <p class="card-text">
  //               <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" width="40px"/>
  //               <span class="forecast-text"> <span id = "fc-day"> Wednesday</span>: <span id="fc-max">24</span>°C/ <span id="fc-min">19</span>°C</span>
  //             </p>
  //           </div>
  //         </div>
  //         <div class="card bg-light mb-3 fourth-day" style="max-width: 22.5rem;">
  //           <div class="card-body">
  //             <p class="card-text">
  //               <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" width="40px"/>
  //               <span class="forecast-text"> <span id = "fc-day"> Thursday</span>: <span id="fc-max">2</span>°C/ <span id="fc-min">10</span>°C</span>
  //             </p>
  //           </div>
  //         </div>
  //         <div class="card bg-light mb-3 fifth-day" style="max-width: 22.5rem;">
  //           <div class="card-body">
  //             <p class="card-text">
  //               <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" width="40px"/>
  //               <span class="forecast-text"> <span id = "fc-day"> Friday</span>: <span id="fc-max">24</span>°C/ <span id="fc-min">10</span>°C</span>
  //             </p>
  //           </div>
  //         </div>`;

  // console.log(response);
  console.log(response.data.daily);
}
function forecastSearch(city) {
  let cityName = city;
  cityName = city.trim();
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
  let timePlace = response.data.time;
  timePlace = timePlace * 1000;
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

let celsiusTemp = null;

search("Brisbane");
