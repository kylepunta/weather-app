import "./styles.css";
import { eventHandler } from "./eventListeners.js";
import {
  renderSearchUI,
  renderWorldUI,
  initialize,
  loadingState,
} from "./UI.js";
import { weatherState, weather } from "./weather.js";
import { DOM } from "./domQueries.js";
import { settings, settingsState } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
  loadingState.setLoadingState(true);

  initialize();

  weather
    .fetchWorldData()
    .then(() => {
      renderWorldUI.renderWorldWeather();
    })
    .finally(() => {
      if (settingsState.getTemperatureUnit() === "fahrenheit") {
        settings.selectFahrenheit();
      } else {
        settings.selectCelsius();
      }

      loadingState.setLoadingState(false);
      renderSearchUI.toggleSearchWeather();
    })
    .catch((error) => {
      console.log("Error fetching world data", error);
      loadingState.setLoadingState(false);
    });
});
