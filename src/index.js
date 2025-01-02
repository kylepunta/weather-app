import "./styles.css";
import { eventHandler } from "./eventListeners.js";
import { renderSearchUI, renderWorldUI } from "./UI.js";
import { weather } from "./weather.js";

const settings = document.querySelector("aside");
const tickBoxes = document.querySelectorAll("#tick-box");

settings.classList.add("hidden");
tickBoxes[1].setAttribute("id", "active-setting");

eventHandler.addMenuBtnListeners();
eventHandler.addSettingsListeners();
eventHandler.addSearchListeners();

const hours = document.querySelectorAll(".hours > div");

hours[0].classList.add("first-hour");
hours[7].classList.add("last-hour");

for (let i = 0; i < 8; i++) {
  hours[i].setAttribute("id", "active-hour");
}

renderSearchUI.renderHourlyWeather();
eventHandler.addArrowListeners();
renderSearchUI.renderWeeklyWeather();
renderSearchUI.renderCurrentWeather();
renderSearchUI.renderWeeklyWeatherInfo();
renderSearchUI.renderPrecipitationIcons();

// renderSearchUI.hideCurrentWeatherInfo();
renderWorldUI.hideWorldWeatherInfo();

// weather.fetchWorldData().then(() => {
//   renderWorldUI.renderWorldWeather();
// });
