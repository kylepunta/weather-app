import "./styles.css";
import { eventHandler } from "./eventListeners.js";
import { renderUI } from "./UI.js";

const settings = document.querySelector("aside");
const tickBoxes = document.querySelectorAll("#tick-box");

settings.classList.add("hidden");
tickBoxes[1].setAttribute("id", "active-setting");

eventHandler.addMenuBtnListeners();
eventHandler.addSettingsListeners();
eventHandler.addSearchListeners();

// const hours = document.querySelectorAll(".hours > div");

// hours[0].classList.add("first-hour");
// hours[7].classList.add("last-hour");

// for (let i = 0; i < 8; i++) {
//   hours[i].setAttribute("id", "active-hour");
// }

const hourTemperatureContainers =
  document.querySelectorAll(".hour-temperature");

hourTemperatureContainers.forEach((container) => {
  const temp = document.createElement("p");
  temp.textContent = "4°";
  container.appendChild(temp);
});

renderUI.renderHourlyWeather();
eventHandler.addArrowListeners();
renderUI.renderWeeklyWeather();
renderUI.renderCurrentWeather();
renderUI.renderWeeklyWeatherInfo();
renderUI.renderWorldWeatherInfo();
// renderUI.hideCurrentWeatherInfo();
renderUI.hideWorldWeatherInfo();
renderUI.renderPrecipitationInfo();
