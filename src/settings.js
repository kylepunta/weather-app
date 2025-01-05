import { DOM } from "./domQueries.js";

export const settingsState = (function () {
  let state = {
    temperatureUnit: null,
  };
  return {
    resetState: () => (state.temperatureUnit = "celsius"),
    setTemperatureUnit: (unit) => (state.temperatureUnit = unit),
    getTemperatureUnit: () => state.temperatureUnit,
  };
})();

export const settings = (function () {
  function convertCelsiusToFahrenheit() {
    if (settingsState.getTemperatureUnit() === "celsius") {
      return;
    }
    DOM.content.temps.forEach((temp) => {
      let tempValue = temp.textContent;
      temp.textContent = Math.round((tempValue * 9) / 5 + 32);
    });
    return;
  }
  function convertFahrenheitToCelsius() {
    if (settingsState.getTemperatureUnit() === "fahrenheit") {
      return;
    }
    DOM.content.temps.forEach((temp) => {
      let tempValue = temp.textContent;
      temp.textContent = Math.round(((tempValue - 32) * 5) / 9);
    });
  }
  function selectCelsius() {
    DOM.settings.tickBoxes[0].removeAttribute("id", "active-setting");
    DOM.settings.tickBoxes[1].setAttribute("id", "active-setting");
    settingsState.setTemperatureUnit("celsius");
    DOM.content.units.forEach((unit) => {
      unit.textContent = "C";
    });
  }
  function selectFahrenheit() {
    DOM.settings.tickBoxes[0].setAttribute("id", "active-setting");
    DOM.settings.tickBoxes[1].removeAttribute("id", "active-setting");
    settingsState.setTemperatureUnit("fahrenheit");
    DOM.content.units.forEach((unit) => {
      unit.textContent = "F";
    });
  }
  return {
    selectCelsius,
    selectFahrenheit,
    convertCelsiusToFahrenheit,
    convertFahrenheitToCelsius,
  };
})();
