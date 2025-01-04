const weather = (function () {
  const worldCities = [
    "New York",
    "London",
    "Sydney",
    "Tokyo",
    "Berlin",
    "Los Angeles",
  ];
  const worldData = [];
  let hoursData = [];
  let weekData = [];

  let searchResult = {};
  let isLoading = false;

  async function fetchSearchData() {
    if (isLoading) {
      console.log("Still loading");
      return;
    }
    isLoading = true;

    const search = document.querySelector("#location").value;
    const city = search.toLowerCase();
    console.log(city);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=KW6XVPFVXWM4QCFPHLTREZMX2&contentType=json`,
        { mode: "cors" }
      );

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      searchResult = data;
      console.log(searchResult);
      return data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        isLoading = false;
        console.log("Finished loading");
      }, 100);
    }
  }
  async function fetchCityName() {
    const cityName = await searchResult.address;
    const capitalizedName = cityName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return capitalizedName;
  }
  async function fetchCountryName() {
    const cityAddress = await searchResult.resolvedAddress.split(",");
    console.log(cityAddress);
    const countryName = cityAddress.pop();
    console.log(countryName);
    return countryName;
  }

  async function fetchTemperature() {
    const temperature = await searchResult.currentConditions.temp;
    return Math.round(temperature);
  }
  async function fetchConditions() {
    const conditions = await searchResult.currentConditions.icon;
    return conditions;
  }
  async function fetchWindSpeed() {
    const windSpeed = await searchResult.currentConditions.windspeed;
    return Math.round(windSpeed);
  }
  async function fetchUVIndex() {
    const UVIndex = await searchResult.currentConditions.uvindex;
    return UVIndex;
  }
  async function fetchHumidity() {
    const humidity = await searchResult.currentConditions.humidity;
    return Math.round(humidity);
  }
  async function fetchFeelsLikeTemperature() {
    const feelsLikeTemperature = await searchResult.currentConditions.feelslike;
    console.log(Math.round(feelsLikeTemperature));
    console.log(typeof Math.round(feelsLikeTemperature));
    return Math.round(feelsLikeTemperature);
  }

  async function fetchHoursData() {
    hoursData = [];
    const fetchRequests = [];
    for (let i = 0; i < 24; i++) {
      const fetchRequest = await searchResult.days[0].hours[i];
      console.log(fetchRequest);
      fetchRequests.push(fetchRequest);
    }
    const fetchResults = await Promise.all(fetchRequests);
    console.log(fetchResults);
    fetchResults.forEach((data) => {
      if (data) {
        console.log("pushed!");
        hoursData.push(data);
      }
    });
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

  async function fetchWeekData() {
    weekData = [];
    const fetchRequests = [];
    for (let i = 0; i < 7; i++) {
      const fetchRequest = await searchResult.days[i];
      console.log(fetchRequest);
      fetchRequests.push(fetchRequest);
    }
    const fetchResults = await Promise.all(fetchRequests);
    fetchResults.forEach((data) => {
      if (data) {
        weekData.push(data);
      }
    });
    console.log(weekData);
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
    fetchSearchData,
    fetchWorldData,
    fetchWorldCityNames,
    fetchWorldCityTemperatures,
    fetchWorldCityConditions,
    fetchCityName,
    fetchCountryName,
    fetchTemperature,
    fetchConditions,
    fetchWindSpeed,
    fetchUVIndex,
    fetchHumidity,
    fetchFeelsLikeTemperature,
    fetchHoursData,
    fetchHourlyTemperatures,
    fetchHourlyConditions,
    fetchWeekData,
  };
})();

export { weather };
