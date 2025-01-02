import { icons } from "./icons.js";
import { weather } from "./weather.js";

const renderWorldUI = (function () {
  const parser = new DOMParser();
  function hideWorldWeatherInfo() {
    const section = document.querySelector("section:last-of-type");
    section.setAttribute("id", "hidden");
  }
  function showWorldWeatherInfo() {
    const section = document.querySelector("section:last-of-type");
    section.removeAttribute("id", "hidden");
  }
  async function renderWorldWeather() {
    const cityNames = await weather.fetchWorldCityNames();
    const cityTemperatures = await weather.fetchWorldCityTemperatures();
    const currentWeatherConditions = await weather.fetchWorldCityConditions();

    const weatherIcons = document.querySelectorAll(".world-city-icon");
    const weatherTemps = document.querySelectorAll(".world-city-temperature");
    const weatherInfos = document.querySelectorAll(".world-city-info");
    const weatherNames = document.querySelectorAll(".world-city-name > p");

    weatherInfos.forEach((info) => {
      const p = document.createElement("p");
      info.appendChild(p);
    });

    const weatherDescriptions = document.querySelectorAll(
      ".world-city-info > p"
    );

    for (let i = 0; i < weatherNames.length; i++) {
      weatherNames[i].textContent = cityNames[i];
    }

    for (let i = 0; i < weatherTemps.length; i++) {
      const p = document.createElement("p");
      p.textContent = cityTemperatures[i];
      const unit = document.createElement("p");
      unit.textContent = "C";
      weatherTemps[i].appendChild(p);
      weatherTemps[i].appendChild(unit);
    }

    for (let i = 0; i < currentWeatherConditions.length; i++) {
      switch (currentWeatherConditions[i]) {
        case "clear-day":
          weatherIcons[i].appendChild(icons.getClearDayIcon());
          weatherDescriptions[i].textContent = "Sunny";
          break;
        case "clear-night":
          weatherIcons[i].appendChild(icons.getClearNightIcon());
          weatherDescriptions[i].textContent = "Clear";
          break;
        case "partly-cloudy-day":
          weatherIcons[i].appendChild(icons.getPartlyCloudyDayIcon());
          weatherDescriptions[i].textContent = "Partly Cloudy";
          break;
        case "partly-cloudy-night":
          weatherIcons[i].appendChild(icons.getPartlyCloudyNightIcon());
          weatherDescriptions[i].textContent = "Partly Cloudy";
          break;
        case "cloudy":
          weatherIcons[i].appendChild(icons.getCloudyIcon());
          weatherDescriptions[i].textContent = "Cloudy";
          break;
        case "fog":
          weatherIcons[i].appendChild(icons.getFogIcon());
          weatherDescriptions[i].textContent = "Foggy";
          break;
        case "wind":
          weatherIcons[i].appendChild(icons.getWindIcon());
          weatherDescriptions[i].textContent = "Windy";
          break;
        case "rain":
          weatherIcons[i].appendChild(icons.getRainIcon());
          weatherDescriptions[i].textContent = "Rainy";
          break;
        case "snow":
          weatherIcons[i].appendChild(icons.getSnowIcon());
          weatherDescriptions[i].textContent = "Snowy";
          break;
      }
    }
  }
  return {
    hideWorldWeatherInfo,
    showWorldWeatherInfo,
    renderWorldWeather,
  };
})();

const renderSearchUI = (function () {
  const parser = new DOMParser();

  const hours = document.querySelectorAll(".hours > div");
  const hourWeatherIcons = document.querySelectorAll(".hour-weather-icon");
  const currentWeatherIcon = document.querySelector(".weather-icon");
  const weeklyWeatherInfos = document.querySelectorAll(
    ".weekly-weather-description"
  );
  const precipitationIcons = document.querySelectorAll(".precipitation-icon");
  let start = 0;
  let end = 7;

  async function renderCity() {
    const cityName = document.querySelector(".city-name > p");
    cityName.textContent = await weather.fetchCityName();

    const countryName = document.querySelector(".country-name > p");
    countryName.textContent = await weather.fetchCountryName();
  }

  function renderPrecipitationIcons() {
    precipitationIcons.forEach((icon) => {
      const svgString = `<svg fill="#000000" height="40px" width="60px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 476 476" xml:space="preserve">
   <g transform="translate(0 -540.36)">
     <g>
       <g>
         <path d="M302.2,839.66L302.2,839.66c39.7,0,77.1-15.7,105.4-44.1c28.5-28.5,44.1-66.2,44.1-106.1c0-82.2-67.1-149.1-149.6-149.1
           c-29.4,0-57.8,8.4-82.2,24.2c-21.7,14.1-39.3,33.6-51.2,56.6c-10.2-3.1-20.7-4.6-32.6-4.6c-29.9,0-57.9,11.4-79,32.3
           c-21.2,21-32.9,49.1-32.9,79.2c0,61.6,50.2,111.6,111.9,111.6H302.2z M44.2,728.16c0-50.5,41.2-91.6,91.9-91.6v0
           c12.7,0,23.5,2,33.9,6.4c5,2.1,10.8-0.2,13-5.2c20.7-47,67.5-77.3,119.2-77.3c71.5,0,129.6,57.9,129.6,129.1
           c0,71.8-58.1,130.2-129.6,130.2H136.1C85.4,819.76,44.2,778.66,44.2,728.16z"/>
         <path d="M141.2,885.66l-24.5,25.4c-3.8,3.9-3.7,10.3,0.3,14.1c1.9,1.9,4.4,2.8,6.9,2.8c2.6,0,5.2-1,7.2-3.1l24.5-25.4
           c3.8-3.9,3.7-10.3-0.3-14.1C151.4,881.56,145,881.66,141.2,885.66z"/>
         <path d="M243.1,885.66l-24.5,25.4c-3.8,3.9-3.7,10.3,0.3,14.1c1.9,1.9,4.4,2.8,6.9,2.8c2.6,0,5.2-1,7.2-3.1l24.5-25.4
           c3.8-3.9,3.7-10.3-0.3-14.1C253.3,881.56,246.9,881.66,243.1,885.66z"/>
         <path d="M345,885.66l-24.5,25.4c-3.8,3.9-3.7,10.3,0.3,14.1c1.9,1.9,4.4,2.8,6.9,2.8c2.6,0,5.2-1,7.2-3.1l24.5-25.4
           c3.8-3.9,3.7-10.3-0.3-14.1C355.2,881.56,348.8,881.66,345,885.66z"/>
         <path d="M460.9,885.36c-3.9-3.8-10.3-3.7-14.1,0.3l-24.5,25.4c-3.8,3.9-3.7,10.3,0.3,14.1c1.9,1.9,4.4,2.8,6.9,2.8
           c2.7,0,5.3-1,7.2-3.1l24.5-25.4C465,895.56,464.9,889.16,460.9,885.36z"/>
         <path d="M39.3,885.66l-24.5,25.4c-3.8,3.9-3.7,10.3,0.3,14.1c1.9,1.9,4.4,2.8,6.9,2.8c2.6,0,5.2-1,7.2-3.1l24.5-25.4
           c3.8-3.9,3.7-10.3-0.3-14.1C49.5,881.56,43.1,881.66,39.3,885.66z"/>
         <path d="M192.2,974.96l-24.5,24.4c-3.9,3.9-3.9,10.2,0,14.1c2,1.9,4.5,2.9,7.1,2.9c2.6,0,5.1-1,7-2.9l24.5-24.4
           c3.9-3.9,3.9-10.2,0-14.1C202.4,971.06,196.1,971.06,192.2,974.96z"/>
         <path d="M294.1,974.96l-24.5,24.4c-3.9,3.9-3.9,10.2,0,14.1c2,1.9,4.5,2.9,7.1,2.9c2.6,0,5.1-1,7-2.9l24.5-24.4
           c3.9-3.9,3.9-10.2,0-14.1C304.3,971.06,298,971.06,294.1,974.96z"/>
         <path d="M396,974.96l-24.5,24.4c-3.9,3.9-3.9,10.2,0,14.1c2,1.9,4.5,2.9,7.1,2.9c2.6,0,5.1-1,7-2.9l24.5-24.4
           c3.9-3.9,3.9-10.2,0-14.1C406.2,971.06,399.9,971.06,396,974.96z"/>
         <path d="M90.3,974.96l-24.5,24.4c-3.9,3.9-3.9,10.2,0,14.1c2,1.9,4.5,2.9,7.1,2.9c2.6,0,5.2-1,7-2.9l24.5-24.4
           c3.9-3.9,3.9-10.2,0-14.1C100.5,971.06,94.2,971.06,90.3,974.96z"/>
       </g>
     </g>
   </g>
   </svg>`;
      const precipitationIcon = parser.parseFromString(
        svgString,
        "image/svg+xml"
      ).documentElement;
      icon.appendChild(precipitationIcon);
    });
  }

  function hideCurrentWeatherInfo() {
    const sections = document.querySelectorAll("section");
    for (let i = 1; i < sections.length - 1; i++) {
      sections[i].setAttribute("id", "hidden");
    }
  }

  function showCurrentWeatherInfo() {
    const sections = document.querySelectorAll("section");
    for (let i = 1; i < sections.length - 1; i++) {
      sections[i].removeAttribute("id", "hidden");
    }
  }

  function renderCurrentWeather() {
    renderPartlyCloudyDayIcon(currentWeatherIcon);
  }

  function renderHourlyWeather() {
    for (let i = 0; i < 8; i++) {
      hours[i].setAttribute("id", "active-hour");
    }

    hourWeatherIcons.forEach((icon) => {
      renderCloudyIcon(icon);
    });

    setInterval(() => {
      if (start == 16) {
        start = 0;
      } else {
        start++;
      }
      if (end == 23) {
        end = 7;
      } else {
        end++;
      }
      hours.forEach((hour) => {
        hour.removeAttribute("id", "active-hour");
      });

      for (let i = start; i <= end; i++) {
        hours[i].setAttribute("id", "active-hour");
      }
    }, 5000);
  }
  function previousHour() {
    hours.forEach((hour) => {
      hour.removeAttribute("id", "active-hour");
    });
    if (start == 0) {
      start = 16;
      end = 23;
    } else {
      start--;
      end--;
    }
    for (let i = start; i <= end; i++) {
      hours[i].setAttribute("id", "active-hour");
    }
  }
  function nextHour() {
    hours.forEach((hour) => {
      hour.removeAttribute("id", "active-hour");
    });
    if (end == 23) {
      start = 0;
      end = 7;
    } else {
      end++;
      start++;
    }
    for (let i = start; i <= end; i++) {
      hours[i].setAttribute("id", "active-hour");
    }
  }
  function renderWeeklyWeather() {
    const weeklyWeatherTemperatures = document.querySelectorAll(
      ".weekly-temperature"
    );
    const weeklyWeatherIcons = document.querySelectorAll(
      ".weekly-weather-icon"
    );
    weeklyWeatherTemperatures.forEach((dayTemperature) => {
      const temp = document.createElement("p");
      temp.textContent = "10°";
      dayTemperature.appendChild(temp);
    });
    weeklyWeatherIcons.forEach((icon) => {
      renderRainIcon(icon);
    });
  }

  function renderRainIcon(container) {
    container.appendChild(icons.getRainIcon());
  }
  function renderPartlyCloudyDayIcon(container) {
    container.appendChild(icons.getPartlyCloudyDayIcon());
  }
  function renderCloudyIcon(container) {
    container.appendChild(icons.getCloudyIcon());
  }
  function renderSunnyIcon(container) {
    container.appendChild(icons.getSunnyIcon());
  }
  function renderWeeklyWeatherInfo() {
    weeklyWeatherInfos.forEach((info) => {
      const weatherInfo = document.createElement("p");
      weatherInfo.textContent = "Rainy";
      info.appendChild(weatherInfo);
    });
  }

  return {
    renderCity,
    renderWeeklyWeatherInfo,
    renderSunnyIcon,
    renderCloudyIcon,
    renderPartlyCloudyDayIcon,
    renderRainIcon,
    renderWeeklyWeather,
    nextHour,
    previousHour,
    renderHourlyWeather,
    renderCurrentWeather,
    showCurrentWeatherInfo,
    hideCurrentWeatherInfo,
    renderPrecipitationIcons,
  };
})();

export { renderWorldUI, renderSearchUI };
