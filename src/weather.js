import { loadingState, renderSearchUI } from "./UI.js";

const weatherState = (function () {
  let state = {
    worldCities: [
      "New York",
      "London",
      "Sydney",
      "Tokyo",
      "Berlin",
      "Los Angeles",
    ],
    searchResult: null,
    worldData: [],
    currentData: [],
    weekData: [],
    hoursData: [],
    currentCity: null,
    currentCountry: null,
  };
  return {
    getState: () => state,
    resetState: () =>
      (state = {
        searchResult: [],
        worldData: [],
        currentData: null,
        weekData: [],
        hoursData: [],
        currentCity: null,
        currentCountry: null,
      }),
    setSearchResult: (data) => (state.searchResult = data),
    getSearchResult: () => state.searchResult,
    addWorldData: (data) => state.worldData.push(data),
    addCurrentData: (data) => (state.currentData = data),
    addWeekData: (data) => state.weekData.push(data),
    addHoursData: (data) => state.hoursData.push(data),
    getCurrentData: () => state.currentData,
    getWorldData: () => state.worldData,
    getWeekData: () => state.weekData,
    getHoursData: () => state.hoursData,
    getCurrentCity: () => state.currentCity,
    setCurrentCity: () => {
      const search = document.querySelector("#location").value;
      const city = search.toLowerCase();
      state.currentCity = city;
      console.log(city);
    },
    getCurrentCountry: () => state.currentCountry,
    setCurrentCountry: () =>
      (state.currentCountry = state.searchResult.resolvedAddress
        .split(",")
        .pop()),
    getWorldCities: () => state.worldCities,
  };
})();

const weather = (function () {
  const API_Key = "2R7G4LV5HPBTDPEQYAMRW4K2U";
  // Handle search function
  async function handleSearch() {
    weatherState.resetState();
    weatherState.setCurrentCity();
    try {
      const searchResult = await fetchSearchResult();
      weatherState.setSearchResult(searchResult);
      weatherState.setCurrentCountry();
      renderSearchUI.renderCityAndCountryName();
      renderSearchUI.renderCurrentWeather();
      renderSearchUI.renderHourlyWeather();
      renderSearchUI.renderWeeklyWeather();
      renderSearchUI.renderPrecipitation();
      renderSearchUI.renderSunriseAndSunset();
    } catch (error) {
      console.log(`Error handling search`, error.message);
    }
  }
  // fetching general weather data
  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_Key}&contentType=json`,
        { mode: "cors" }
      );
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(`Error fetching data for ${city}`, error.message);
      return null;
    }
  }
  async function fetchSearchResult() {
    if (loadingState.getLoadingState === true) {
      console.log("Still loading");
      return;
    }
    loadingState.setLoadingState(true);

    try {
      const weatherData = await fetchWeatherData(weatherState.getCurrentCity());

      weatherState.setSearchResult(weatherData);
      console.log("Fetched search data", weatherData);
      return weatherData;
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        loadingState.setLoadingState(false);
        console.log("Finished loading");
      }, 100);
    }
  }
  function fetchCurrentData() {
    const searchResult = weatherState.getSearchResult();
    console.log("Search Result", searchResult);
    weatherState.addCurrentData(searchResult.currentConditions);
    console.log(weatherState.getCurrentData());

    const temp = Math.round(weatherState.getCurrentData().temp);
    const icon = weatherState.getCurrentData().icon;
    const windSpeed = Math.round(weatherState.getCurrentData().windspeed);
    const UVIndex = weatherState.getCurrentData().uvindex;
    const humidity = Math.round(weatherState.getCurrentData().humidity);
    const feelsLikeTemp = Math.round(weatherState.getCurrentData().feelslike);
    return { temp, icon, windSpeed, UVIndex, humidity, feelsLikeTemp };
  }
  function fetchWeekData() {
    const searchResult = weatherState.getSearchResult();
    for (let i = 0; i < 7; i++) {
      weatherState.addWeekData(searchResult.days[i]);
    }
    console.log("Fetched week data", weatherState.getWeekData());

    const temps = weatherState.getWeekData().map((day) => {
      return day.temp;
    });
    const icons = weatherState.getWeekData().map((day) => {
      return day.icon;
    });
    const dayNames = weatherState.getWeekData().map((day) => {
      const date = new Date(day.datetime);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      return dayName;
    });
    console.log(temps);
    console.log(icons);
    console.log(dayNames);
    return { temps, icons, dayNames };
  }
  function fetchHoursData() {
    for (let i = 0; i < 24; i++) {
      weatherState.addHoursData(
        weatherState.getSearchResult().days[0].hours[i]
      );
    }
    console.log("Fetched hours data", weatherState.getHoursData());

    const temps = weatherState.getHoursData().map((hour) => {
      return Math.round(hour.temp);
    });
    const icons = weatherState.getHoursData().map((hour) => {
      return hour.icon;
    });
    return { temps, icons };
  }
  async function fetchWorldData() {
    try {
      const fetchRequests = weatherState.getWorldCities().map(async (city) => {
        try {
          const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_Key}&contentType=json`,
            { mode: "cors" }
          );
          if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.log(error.message);
        }
      });
      const fetchResults = await Promise.all(fetchRequests);
      fetchResults.forEach((data) => {
        weatherState.addWorldData(data);
      });
      return weatherState.getWorldData();
    } catch (error) {
      console.log(error.message);
    }
  }

  // fetching specific weather data
  function fetchCityAndCountryName() {
    const cityName = weatherState
      .getCurrentCity()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const countryName =
      weatherState.getCurrentCountry().charAt(0) +
      weatherState.getCurrentCountry().slice(1);

    return { cityName, countryName };
  }
  function fetchPrecipitation() {
    const precipitation = weatherState.getWeekData().map((day) => {
      return day.precipprob;
    });
    const dayNames = weatherState.getWeekData().map((day) => {
      const date = new Date(day.datetime);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      return dayName;
    });
    console.log(precipitation);
    return { precipitation, dayNames };
  }
  function fetchSunRiseAndSunsetTimes() {
    const sunrise = weatherState.getCurrentData().sunrise.slice(0, 5);
    const sunset = weatherState.getCurrentData().sunset.slice(0, 5);
    console.log(sunrise);
    console.log(sunset);
    return { sunrise, sunset };
  }
  return {
    handleSearch,
    fetchWeatherData,
    fetchSearchResult,
    fetchWorldData,
    fetchCityAndCountryName,
    fetchHoursData,
    fetchWeekData,
    fetchCurrentData,
    fetchPrecipitation,
    fetchSunRiseAndSunsetTimes,
  };
})();

export { weatherState, weather };
