import { renderSearchUI } from "./UI.js";
import { weather } from "./weather.js";
import { DOM } from "./domQueries.js";
import { settings } from "./settings.js";

const eventHandler = (function () {
  function addMenuBtnListeners() {
    DOM.settings.menu.addEventListener("click", () => {
      DOM.settings.settings.classList.toggle("hidden");
    });
  }
  function addSettingsListeners() {
    DOM.settings.close.addEventListener("click", () => {
      DOM.settings.settings.classList.toggle("hidden");
    });
    DOM.settings.fahrenheit.addEventListener("click", () => {
      DOM.settings.tickBoxes[0].setAttribute("id", "active-button");
      DOM.settings.tickBoxes[1].removeAttribute("id", "active-button");
      settings.selectFahrenheit();
      settings.convertCelsiusToFahrenheit();
    });
    DOM.settings.celsius.addEventListener("click", () => {
      DOM.settings.tickBoxes[0].removeAttribute("id", "active-button");
      DOM.settings.tickBoxes[1].setAttribute("id", "active-button");
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
  };
})();

export { eventHandler };
