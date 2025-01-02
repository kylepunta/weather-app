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
  async function fetchSearchData() {
    const search = document.querySelector("#location").value;
    const city = search.toLowerCase();
    console.log(city);

    try {
      let response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=2R7G4LV5HPBTDPEQYAMRW4K2U&contentType=json`,
        { mode: "cors" }
      );

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      response = await response.json();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
    }
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
  };
})();

export { weather };
