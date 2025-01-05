import { icons as weatherIconsModule } from "./icons.js";
import { weather, weatherState } from "./weather.js";
import { DOM } from "./domQueries.js";
import { settings, settingsState } from "./settings.js";
import { eventHandler } from "./eventListeners.js";
const loadingState = (function () {
  let state = {
    isLoading: false,
  };
  return {
    getLoadingState: () => state.isLoading,
    setLoadingState: (status) => {
      state.isLoading = status;
      if (status) {
        console.log(DOM.content.loading);
        console.log(DOM.content.sections);
        DOM.content.loading.classList.remove("hidden");
        DOM.content.sections.forEach((section) => {
          section.classList.add("hidden");
        });
      } else {
        DOM.content.loading.classList.add("hidden");
        DOM.content.sections.forEach((section) => {
          section.classList.remove("hidden");
        });
      }
    },
  };
})();

const initialize = function () {
  console.log("Initializing...");

  settingsState.setTemperatureUnit("celsius");
  eventHandler.addMenuBtnListeners();
  eventHandler.addSettingsListeners();
  eventHandler.addSearchListeners();
  eventHandler.addArrowListeners();
  eventHandler.addBackBtnListeners();

  DOM.hourlyWeather.hours[0].classList.add("first-hour");
  DOM.hourlyWeather.hours[7].classList.add("last-hour");

  for (let i = 0; i < 8; i++) {
    DOM.hourlyWeather.hours[i].setAttribute("id", "active-hour");
  }
};

const renderWorldUI = (function () {
  DOM.worldWeather.infos.forEach((info) => {
    const p = document.createElement("p");
    info.appendChild(p);
  });
  function toggleWorldWeather() {
    DOM.worldWeather.section.classList.toggle("hidden");
  }
  function renderWorldWeather() {
    const worldNames = weatherState.getWorldData().map((city) => {
      return city.address.charAt(0) + city.address.slice(1);
    });
    const worldTemps = weatherState.getWorldData().map((city) => {
      return Math.round(city.currentConditions.temp);
    });
    const worldIcons = weatherState.getWorldData().map((city) => {
      return city.currentConditions.icon;
    });
    DOM.worldWeather.names.forEach((name, index) => {
      console.log(name);
      name.textContent = worldNames[index];
    });
    DOM.worldWeather.temperatures.forEach((temp, index) => {
      console.log(temp);
      temp.textContent = worldTemps[index];
    });
    DOM.worldWeather.icons.forEach((icon, index) => {
      icon.innerHTML = "";
      switch (worldIcons[index]) {
        case "clear-day":
          icon.appendChild(weatherIconsModule.getClearDayIcon());
          DOM.worldWeather.infos[index].textContent = "Sunny";
          break;
        case "clear-night":
          icon.appendChild(weatherIconsModule.getClearNightIcon());
          DOM.worldWeather.infos[index].textContent = "Clear";
          break;
        case "partly-cloudy-day":
          icon.appendChild(weatherIconsModule.getPartlyCloudyDayIcon());
          DOM.worldWeather.infos[index].textContent = "Partly Cloudy";
          break;
        case "partly-cloudy-night":
          icon.appendChild(weatherIconsModule.getPartlyCloudyNightIcon());
          DOM.worldWeather.infos[index].textContent = "Partly Cloudy";
          break;
        case "cloudy":
          icon.appendChild(weatherIconsModule.getCloudyIcon());
          DOM.worldWeather.infos[index].textContent = "Cloudy";
          break;
        case "fog":
          icon.appendChild(weatherIconsModule.getFogIcon());
          DOM.worldWeather.infos[index].textContent = "Foggy";
          break;
        case "wind":
          icon.appendChild(weatherIconsModule.getWindIcon());
          DOM.worldWeather.infos[index].textContent = "Windy";
          break;
        case "rain":
          icon.appendChild(weatherIconsModule.getRainIcon());
          DOM.worldWeather.infos[index].textContent = "Rainy";
          break;
        case "snow":
          icon.appendChild(weatherIconsModule.getSnowIcon());
          DOM.worldWeather.infos[index].textContent = "Snowy";
          break;
      }
    });
  }
  return {
    renderWorldWeather,
    toggleWorldWeather,
  };
})();

const renderSearchUI = (function () {
  let start = 0;
  let end = 7;

  function renderNoResult(city) {
    DOM.content.noResultText.textContent = `No result found for ${city}`;
    DOM.content.noResultSection.classList.toggle("hidden");
    DOM.content.loadingPage.classList.toggle("hidden");
  }
  function clearResults() {}
  async function renderCityAndCountryName() {
    const { cityName, countryName } = weather.fetchCityAndCountryName();
    DOM.search.city.textContent = cityName;

    DOM.search.country.textContent = countryName;
  }
  function toggleSearchWeather() {
    console.log(DOM.content.searchWeather);
    DOM.content.searchWeather.forEach((section) => {
      section.classList.toggle("hidden");
    });
    console.log(DOM.content.searchWeather);
  }
  async function renderCurrentWeather() {
    const { temp, icon, windSpeed, UVIndex, humidity, feelsLikeTemp } =
      weather.fetchCurrentData();
    DOM.currentWeather.temperature.textContent = temp;
    DOM.currentWeather.icon.innerHTML = "";
    DOM.currentWeather.windSpeed.textContent = windSpeed;
    DOM.currentWeather.UVIndex.textContent = UVIndex;
    DOM.currentWeather.humidity.textContent = humidity;
    DOM.currentWeather.feelsLikeTemperature.textContent = feelsLikeTemp;
    switch (icon) {
      case "clear-day":
        DOM.currentWeather.icon.appendChild(
          weatherIconsModule.getClearDayIcon()
        );
        DOM.currentWeather.info.textContent = "Sunny";
        break;
      case "clear-night":
        DOM.currentWeather.icon.appendChild(
          weatherIconsModule.getClearNightIcon()
        );
        DOM.currentWeather.info.textContent = "Clear";
        break;
      case "partly-cloudy-day":
        DOM.currentWeather.icon.appendChild(
          weatherIconsModule.getPartlyCloudyDayIcon()
        );
        DOM.currentWeather.info.textContent = "Partly Cloudy";
        break;
      case "partly-cloudy-night":
        DOM.currentWeather.icon.appendChild(
          weatherIconsModule.getPartlyCloudyNightIcon()
        );
        DOM.currentWeather.info.textContent = "Partly Cloudy";
        break;
      case "cloudy":
        DOM.currentWeather.icon.appendChild(weatherIconsModule.getCloudyIcon());
        DOM.currentWeather.info.textContent = "Cloudy";
        break;
      case "fog":
        DOM.currentWeather.icon.appendChild(weatherIconsModule.getFogIcon());
        DOM.currentWeather.info.textContent = "Foggy";
        break;
      case "wind":
        DOM.currentWeather.icon.appendChild(weatherIconsModule.getWindIcon());
        DOM.currentWeather.info.textContent = "Windy";
        break;
      case "rain":
        DOM.currentWeather.icon.appendChild(weatherIconsModule.getRainIcon());
        DOM.currentWeather.info.textContent = "Rainy";
        break;
      case "snow":
        DOM.currentWeather.icon.appendChild(weatherIconsModule.getSnowIcon());
        DOM.currentWeather.info.textContent = "Snowy";
        break;
    }
  }
  async function renderHourlyWeather() {
    const { temps, icons } = weather.fetchHoursData();

    DOM.hourlyWeather.icons.forEach((icon) => {
      console.log("clearing");
      icon.innerHTML = "";
    });

    DOM.hourlyWeather.temperatures.forEach((hourTemperature, index) => {
      hourTemperature.textContent = temps[index];
    });

    for (let i = 0; i < DOM.hourlyWeather.icons.length; i++) {
      switch (icons[i]) {
        case "clear-day":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getClearDayIcon()
          );
          break;
        case "clear-night":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getClearNightIcon()
          );
          break;
        case "partly-cloudy-day":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getPartlyCloudyDayIcon()
          );
          break;
        case "partly-cloudy-night":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getPartlyCloudyNightIcon()
          );
          break;
        case "cloudy":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getCloudyIcon()
          );
          break;
        case "fog":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getFogIcon()
          );
          break;
        case "wind":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getWindIcon()
          );
          break;
        case "rain":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getRainIcon()
          );
          break;
        case "snow":
          DOM.hourlyWeather.icons[i].appendChild(
            weatherIconsModule.getSnowIcon()
          );
          break;
      }
    }

    // setInterval(() => {
    //   hours.forEach((hour) => {
    //     hour.removeAttribute("id", "active-hour");
    //   });

    //   if (start === 16) {
    //     start = 0;
    //     end = 7;
    //   } else {
    //     start++;
    //     end++;
    //   }
    //   if (end === 23) {
    //     end = 7;
    //     start = 0;
    //   } else {
    //     end--;
    //     start--;
    //   }

    //   for (let i = start; i <= end; i++) {
    //     hours[i].setAttribute("id", "active-hour");
    //   }
    // }, 2000);
  }
  function renderWeeklyWeather() {
    const { temps, icons, dayNames } = weather.fetchWeekData();
    DOM.weeklyWeather.temperatures.forEach((dayTemperature, index) => {
      dayTemperature.textContent = temps[index];
    });
    DOM.weeklyWeather.icons.forEach((icon, index) => {
      icon.innerHTML = "";
      switch (icons[index]) {
        case "clear-day":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getClearDayIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Sunny";
          break;
        case "clear-night":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getClearNightIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Clear";
          break;
        case "partly-cloudy-day":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getPartlyCloudyDayIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Partly Cloudy";
          break;
        case "partly-cloudy-night":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getPartlyCloudyNightIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Partly Cloudy";
          break;
        case "cloudy":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getCloudyIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Cloudy";
          break;
        case "fog":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getFogIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Foggy";
          break;
        case "wind":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getWindIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Windy";
          break;
        case "rain":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getRainIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Rainy";
          break;
        case "snow":
          DOM.weeklyWeather.icons[index].appendChild(
            weatherIconsModule.getSnowIcon()
          );
          DOM.weeklyWeather.infos[index].textContent = "Snowy";
          break;
      }
    });
    DOM.weeklyWeather.days.forEach((day, index) => {
      day.textContent = dayNames[index];
    });
  }

  function renderPrecipitation() {
    DOM.precipitation.icons.forEach((icon) => {
      icon.innerHTML = "";
      icon.appendChild(weatherIconsModule.getPrecipitationIcon());
    });
    const { precipitation, dayNames } = weather.fetchPrecipitation();
    DOM.precipitation.probability.forEach((day, index) => {
      day.textContent = `${precipitation[index]}%`;
    });
    DOM.precipitation.days.forEach((day, index) => {
      day.textContent = dayNames[index];
    });
  }
  function renderSunriseAndSunset() {
    const { sunrise, sunset } = weather.fetchSunRiseAndSunsetTimes();
    DOM.sunTimes.sunrise.textContent = sunrise;
    DOM.sunTimes.sunset.textContent = sunset;
  }
  function previousHour() {
    DOM.hourlyWeather.hours.forEach((hour) => {
      hour.removeAttribute("id", "active-hour");
    });
    if (start === 0) {
      start = 16;
      end = 23;
    } else {
      start--;
      end--;
    }
    for (let i = start; i <= end; i++) {
      DOM.hourlyWeather.hours[i].setAttribute("id", "active-hour");
    }
  }
  function nextHour() {
    DOM.hourlyWeather.hours.forEach((hour) => {
      hour.removeAttribute("id", "active-hour");
    });
    if (end === 23) {
      start = 0;
      end = 7;
    } else {
      end++;
      start++;
    }
    for (let i = start; i <= end; i++) {
      DOM.hourlyWeather.hours[i].setAttribute("id", "active-hour");
    }
  }

  return {
    renderCityAndCountryName,
    renderWeeklyWeather,
    nextHour,
    previousHour,
    renderHourlyWeather,
    renderCurrentWeather,
    clearResults,
    renderPrecipitation,
    renderSunriseAndSunset,
    toggleSearchWeather,
    renderNoResult,
  };
})();

export { loadingState, initialize, renderWorldUI, renderSearchUI };
