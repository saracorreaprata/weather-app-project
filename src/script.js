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
document.getElementById(
  "dateInput"
).innerHTML = `${day},  ${hours} : ${minutes}`;

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
