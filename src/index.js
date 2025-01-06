import "./styles.css";
import {
  renderSearchUI,
  renderWorldUI,
  initialize,
  loadingState,
  removeSVGTitles,
} from "./UI.js";
import { weather, weatherState } from "./weather.js";
import { settings, settingsState } from "./settings.js";
import { DOM } from "./domQueries.js";

document.addEventListener("DOMContentLoaded", () => {
  loadingState.setLoadingState(true);

  initialize();

  weather
    .fetchWorldData()
    .then(() => {
      renderWorldUI.renderWorldWeather();
      removeSVGTitles();
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
      renderSearchUI.toggleSearchWeather();
      renderWorldUI.toggleWorldWeather();
      removeSVGTitles();
    });
});
