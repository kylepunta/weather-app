import { renderUI } from "./UI.js";
import { weather } from "./weather.js";

const eventHandler = (function () {
  const menuBtn = document.querySelector(".menu-button");
  const settings = document.querySelector("aside");
  const closeSettingsBtn = document.querySelector(".close-settings-button");
  const fahrenheit = document.querySelector(".fahrenheit");
  const celsius = document.querySelector(".celsius");
  const tickBoxes = document.querySelectorAll("#tick-box");
  const searchInput = document.querySelector("#location");
  const searchBox = document.querySelector(".search-box");
  const searchBtn = document.querySelector("#search-button");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  function addMenuBtnListeners() {
    menuBtn.addEventListener("click", () => {
      settings.classList.toggle("hidden");
    });
  }
  function addSettingsListeners() {
    closeSettingsBtn.addEventListener("click", () => {
      settings.classList.toggle("hidden");
    });
    fahrenheit.addEventListener("click", () => {
      tickBoxes[0].setAttribute("id", "active-button");
      tickBoxes[1].removeAttribute("id", "active-button");
    });
    celsius.addEventListener("click", () => {
      tickBoxes[0].removeAttribute("id", "active-button");
      tickBoxes[1].setAttribute("id", "active-button");
    });
  }
  function addSearchListeners() {
    searchInput.addEventListener("focus", () => {
      searchBox.classList.add("active");
      searchBtn.setAttribute("id", "active-button");
    });

    searchInput.addEventListener("blur", () => {
      searchBox.classList.remove("active");
      searchBtn.removeAttribute("id", "active-button");
    });

    searchBtn.addEventListener("click", () => {});
  }
  function addArrowListeners() {
    leftArrow.addEventListener("click", () => {
      renderUI.previousHour();
    });
    rightArrow.addEventListener("click", () => {
      renderUI.nextHour();
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
