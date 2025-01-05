import { loadingState, renderSearchUI, renderWorldUI } from "./UI.js";
import { weather } from "./weather.js";
import { DOM } from "./domQueries.js";
import { settings, settingsState } from "./settings.js";

const eventHandler = (function () {
  function addMenuBtnListeners() {
    DOM.settings.menu.addEventListener("click", () => {
      DOM.settings.settings.classList.toggle("hidden");
    });
  }
  function addBackBtnListeners() {
    DOM.content.backButton.addEventListener("click", () => {
      console.log(DOM.content.backButton);
      DOM.content.noResultSection.classList.toggle("hidden");
      DOM.content.loadingPage.classList.toggle("hidden");
      loadingState.setLoadingState(true);
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
  }
  function addSettingsListeners() {
    DOM.settings.close.addEventListener("click", () => {
      DOM.settings.settings.classList.toggle("hidden");
    });
    DOM.settings.fahrenheit.addEventListener("click", () => {
      DOM.settings.tickBoxes[0].setAttribute("id", "active-button");
      DOM.settings.tickBoxes[1].removeAttribute("id", "active-button");
      if (settingsState.getTemperatureUnit() === "fahrenheit") {
        return;
      }
      settings.selectFahrenheit();
      settings.convertCelsiusToFahrenheit();
    });
    DOM.settings.celsius.addEventListener("click", () => {
      DOM.settings.tickBoxes[0].removeAttribute("id", "active-button");
      DOM.settings.tickBoxes[1].setAttribute("id", "active-button");
      if (settingsState.getTemperatureUnit() === "celsius") {
        return;
      }
      settings.selectCelsius();
      settings.convertFahrenheitToCelsius();
    });
  }
  function addSearchListeners() {
    DOM.search.searchInput.addEventListener("focus", () => {
      DOM.search.searchBox.classList.add("active");
      DOM.search.searchButton.setAttribute("id", "active-button");
    });

    DOM.search.searchInput.addEventListener("blur", () => {
      DOM.search.searchBox.classList.remove("active");
      DOM.search.searchButton.removeAttribute("id", "active-button");
    });

    DOM.search.searchButton.addEventListener("click", weather.handleSearch);
  }
  function addArrowListeners() {
    DOM.hourlyWeather.leftArrow.addEventListener("click", () => {
      renderSearchUI.previousHour();
    });
    DOM.hourlyWeather.rightArrow.addEventListener("click", () => {
      renderSearchUI.nextHour();
    });
  }
  return {
    addMenuBtnListeners,
    addSettingsListeners,
    addSearchListeners,
    addArrowListeners,
    addBackBtnListeners,
  };
})();

export { eventHandler };
