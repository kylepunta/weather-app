import { DOM } from "./domQueries.js";

export const settings = (function () {
  function convertCelsiusToFahrenheit() {
    DOM.content.temps.forEach((temp) => {
      let tempValue = temp.textContent;
      temp.textContent = Math.round((tempValue * 9) / 5 + 32);
    });
    return;
  }
  function convertFahrenheitToCelsius() {
    DOM.content.temps.forEach((temp) => {
      let tempValue = temp.textContent;
      temp.textContent = Math.round(((tempValue - 32) * 5) / 9);
    });
  }
  function selectCelsius() {
    console.log(DOM.content.units);
    DOM.content.units.forEach((unit) => {
      unit.textContent = "C";
    });
  }
  function selectFahrenheit() {
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
