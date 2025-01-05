export const DOM = {
  content: {
    sections: document.querySelectorAll("section"),
    units: document.querySelectorAll(".temp-unit"),
    temps: document.querySelectorAll(".temp"),
  },
  settings: {
    settings: document.querySelector("aside"),
    menu: document.querySelector(".menu-button"),
    close: document.querySelector(".close-settings-button"),
    tickBoxes: document.querySelectorAll("#tick-box"),
    celsius: document.querySelector(".celsius"),
    fahrenheit: document.querySelector(".fahrenheit"),
  },
  loading: {},
  search: {
    searchButton: document.querySelector("#search-button"),
    searchBox: document.querySelector(".search-box"),
    searchInput: document.querySelector("#location"),
    city: document.querySelector(".city-name > p"),
    country: document.querySelector(".country-name > p"),
  },
  worldWeather: {
    icons: document.querySelectorAll(".world-city-icon"),
    temperatures: document.querySelectorAll(".world-city-temperature > .temp"),
    infos: document.querySelectorAll(".world-city-info"),
    names: document.querySelectorAll(".world-city-name > p"),
    section: document.querySelector("section:last-of-type"),
  },
  currentWeather: {
    icon: document.querySelector(".weather-icon"),
    temperature: document.querySelector(
      ".temperature-icon > .temperature-figure"
    ),
    info: document.querySelector(".current-weather-description > p"),
    windSpeed: document.querySelector(".current-wind-speed"),
    UVIndex: document.querySelector(".current-uv-index"),
    humidity: document.querySelector(".current-humidity"),
    feelsLikeTemperature: document.querySelector(
      ".current-feels-like-temperature"
    ),
  },
  weeklyWeather: {
    icons: document.querySelectorAll(".weekly-weather-icon"),
    temperatures: document.querySelectorAll(
      ".weekly-temperature > p:first-child"
    ),
    days: document.querySelectorAll(".weekly-day > p"),
    infos: document.querySelectorAll(".weekly-weather-description > p"),
  },
  hourlyWeather: {
    leftArrow: document.querySelector(".left-arrow"),
    rightArrow: document.querySelector(".right-arrow"),
    hours: document.querySelectorAll(".hours > div"),
    icons: document.querySelectorAll(".hour-weather-icon"),
    temperatures: document.querySelectorAll(
      ".hour-temperature > p:first-child"
    ),
  },
  precipitation: {
    icons: document.querySelectorAll(".precipitation-icon"),
    probability: document.querySelectorAll(".precipitation-chance > p"),
    days: document.querySelectorAll(".precipitation-day > p"),
  },
  sunTimes: {
    sunrise: document.querySelector(".sunrise-time > p"),
    sunset: document.querySelector(".sunset-time > p"),
  },
};
