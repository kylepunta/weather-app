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
  };
})();

const weather = (function () {
  const API_Key = "KW6XVPFVXWM4QCFPHLTREZMX2";
  // Handle search function
  async function handleSearch() {
    renderSearchUI.clearResults();
    weatherState.resetState();
    weatherState.setCurrentCity();
    try {
      const searchResult = await fetchSearchResult();
      weatherState.setSearchResult(searchResult);
      weatherState.setCurrentCountry();
      renderSearchUI.renderCityAndCountryName();
      renderSearchUI.renderCurrentWeather();
      renderSearchUI.renderHourlyWeather();
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
    return weatherState.getWeekData();
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
  async function fetchHourlyTemperatures() {
    const fetchRequests = hoursData.map(async (hour) => {
      return Math.round(hour.temp);
    });
    const fetchResults = await Promise.all(fetchRequests);
    console.log(fetchResults);
    return fetchResults;
  }
  async function fetchHourlyConditions() {
    const fetchRequests = await Promise.all(
      hoursData.map(async (hour) => {
        return hour.icon;
      })
    );
    console.log(fetchRequests);
    return fetchRequests;
  }

  async function fetchWeekDay() {}
  async function fetchWeekConditions() {}
  async function fetchWeekTemperatures() {}

  async function fetchWorldData() {
    try {
      const fetchRequests = worldCities.map(async (city) => {
        try {
          const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=2R7G4LV5HPBTDPEQYAMRW4K2U&contentType=json`,
            { mode: "cors" }
          );
          if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(`Error fetching data for ${city}`, error.message);
        }
      });
      const fetchResults = await Promise.all(fetchRequests);
      fetchResults.forEach((data) => {
        if (data) {
          worldData.push(data);
        }
      });
      worldData.forEach((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchWorldCityNames() {
    try {
      const cityNameRequests = worldData.map((city) => {
        try {
          const cityName = city.address;
          console.log(cityName);
          return cityName;
        } catch (error) {
          console.log(`Error fetching name for ${city}`, error.message);
        }
      });
      const cityNameResults = await Promise.all(cityNameRequests);
      return cityNameResults;
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchWorldCityTemperatures() {
    try {
      const fetchRequests = worldData.map((city) => {
        try {
          const temperature = Math.round(city.currentConditions.temp);
          console.log(temperature);
          return temperature;
        } catch (error) {
          console.log(`Error fetching temperature for ${city}`, error.message);
        }
      });
      const fetchResults = await Promise.all(fetchRequests);
      return fetchResults;
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchWorldCityConditions() {
    try {
      const fetchRequests = worldData.map((city) => {
        try {
          const tempConditions = city.currentConditions.icon;
          console.log(tempConditions);
          return tempConditions;
        } catch (error) {
          console.log(
            `Error fetching temperature conditions for ${city}`,
            error.message
          );
        }
      });
      const fetchResults = await Promise.all(fetchRequests);
      return fetchResults;
    } catch (error) {
      console.log(error.message);
    }
  }
  return {
    handleSearch,
    fetchWeatherData,
    fetchSearchResult,
    fetchWorldData,
    fetchWorldCityNames,
    fetchWorldCityTemperatures,
    fetchWorldCityConditions,
    fetchCityAndCountryName,
    fetchHoursData,
    fetchHourlyTemperatures,
    fetchHourlyConditions,
    fetchWeekData,
    fetchCurrentData,
  };
})();

export { weatherState, weather };
