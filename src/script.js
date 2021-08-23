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
function currentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("p#temperature");
  temperature.innerHTML = `${currentTemp}°C`;
}

function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#current-city");
  let searchCity = document.querySelector("#search-city");
  searchCity.value;
  let currentCity = (h1.innerHTML = `${searchCity.value}`);
  let apiKey = "52159f86daf1914403242452b28f1120";
  let city = `${currentCity}`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentTemp);
}

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("click", changeCity);
