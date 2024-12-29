import "./styles.css";
import { eventHandler } from "./eventListeners.js";

const settings = document.querySelector("aside");
const tickBoxes = document.querySelectorAll("#tick-box");

settings.classList.add("hidden");
tickBoxes[1].setAttribute("id", "active-setting");

eventHandler.addMenuBtnListeners();
eventHandler.addSettingsListeners();
eventHandler.addSearchListeners();
