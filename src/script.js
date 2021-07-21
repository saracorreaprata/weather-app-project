let now = new Date();

let paragraph = document.querySelector("#dates");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[now.getDay()];

let Data = document.querySelector("p#theDate");
document.getElementById("dateInput").innerHTML = `${day},  ${hours} : ${minutes}`;

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index > 6){
    forecastHTML = forecastHTML + 

    `
            <div class="col-2">
              <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
              width="42"
            />
              <div class="weather-forecast-temperature">
                <spam class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)} </spam>
              <spam class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)} </spam>
              </div>
            </div>
    `;
  }
  });

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
console.log(coordinates);
let apiKey = "1e6fb4f833abbe200b61146f7fadcf8f";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function getCurrentTemperature(response) {
  let countries = document.querySelector("p#countries");
  countries.innerHTML = `${response.data.name}`;

  let currentTemperature = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}<small>ºC</small>`;

  let currentHumidity = document.querySelector("li.humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let currentWind = document.querySelector("li.wind");
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Wind: ${wind}km/h`;

  let currentFeel = document.querySelector("li.feels");
  let feel = Math.round(response.data.main.feels_like);
  currentFeel.innerHTML = `Feels Like ${feel}ºC`;

  let currentDescription = document.querySelector("p.weather");
  currentDescription.innerHTML = `<small>${response.data.weather[0].description}</small>`;

  getForecast(response.data.coord);

}

function retrivePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1e6fb4f833abbe200b61146f7fadcf8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemperature);
}

function updateCurrentData(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityInput").value;
  let apiKey = "1e6fb4f833abbe200b61146f7fadcf8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemperature);
}

function city(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

let submitting = document.querySelector("#search-form");
submitting.addEventListener("submit", updateCurrentData);

navigator.geolocation.getCurrentPosition(retrivePosition);
