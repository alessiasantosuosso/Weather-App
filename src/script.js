function currentDate() {
  let date = document.querySelector("p#date-time");
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  date.innerHTML = `${day}, ${hour}:${minutes}`;
}

currentDate();

function search(city) {
  let apiKey = "52159f86daf1914403242452b28f1120";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentTemp);
}

function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#current-city");
  let searchCity = document.querySelector("#search-city");
  searchCity.value;
  h1.innerHTML = `${searchCity.value}`;
  search(searchCity.value);
}

function currentTemp(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  celsiusTemp = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);

  descriptionElement = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = descriptionElement;

  windElement = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind speed: ${windElement} mph`;

  humidityElement = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityElement}%`;

  getForecast(response.data.coord);
}

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitElement = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitElement);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}
function getForecast(coordinates) {
  let apiKey = "52159f86daf1914403242452b28f1120";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row border-0">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
        <div class="weather-forecast-date">
          ${forecastDay.dt}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png" alt="">
          <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"> ${forecastDay.temp.max}° </span>
            <span class="weather-forecast-temp-min">${forecastDay.temp.min}°</span>
          </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("London");

let celsiusTemp = null;

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("click", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);
