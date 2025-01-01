const weather = (function () {
  function fetchData(search) {
    console.log(search);
  }
  return { fetchData };
})();

export { weather };
