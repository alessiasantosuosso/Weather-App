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

function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#current-city");
  let searchCity = document.querySelector("#search-city");
  searchCity.value;
  let currentCity = (h1.innerHTML = `${searchCity.value}`);
  let city = `${currentCity}`;
  let unit = "metric";
  let apiKey = "52159f86daf1914403242452b28f1120";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(currentTemp);
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

let celsiusTemp = null;

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("click", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);
