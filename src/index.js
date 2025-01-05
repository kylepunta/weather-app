import "./styles.css";
import { eventHandler } from "./eventListeners.js";
import { renderSearchUI, renderWorldUI } from "./UI.js";
import { weatherState, weather } from "./weather.js";
import { DOM } from "./domQueries.js";
import { settings } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
  settings.selectCelsius();
  console.log("DOM.worldWeather.descriptions:", DOM.worldWeather.infos);
  console.log("Length of descriptions:", DOM.worldWeather.infos.length);
  console.log("Length of world data:", weatherState.getWorldData().length);
  console.log("DOM.worldWeather.temperatures", DOM.worldWeather.temperatures);

  DOM.settings.settings.classList.add("hidden");
  DOM.settings.tickBoxes[1].setAttribute("id", "active-setting");

  eventHandler.addMenuBtnListeners();
  eventHandler.addSettingsListeners();
  eventHandler.addSearchListeners();

  DOM.hourlyWeather.hours[0].classList.add("first-hour");
  DOM.hourlyWeather.hours[7].classList.add("last-hour");

  for (let i = 0; i < 8; i++) {
    DOM.hourlyWeather.hours[i].setAttribute("id", "active-hour");
  }

  eventHandler.addArrowListeners();

  // renderSearchUI.hideCurrentWeatherInfo();
  renderWorldUI.hideWorldWeatherInfo();

  weather
    .fetchWorldData()
    .then(() => {
      console.log(weatherState.getWorldData());
      renderWorldUI.renderWorldWeather();
    })
    .then(() => {
      renderWorldUI.showWorldWeatherInfo();
    });
});
