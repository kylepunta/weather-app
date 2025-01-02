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
  let searchResult = {};

  async function fetchSearchData() {
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
  };
})();

export { weather };
