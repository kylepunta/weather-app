const renderUI = (function () {
  const parser = new DOMParser();
  const hours = document.querySelectorAll(".hours > div");
  const hourWeatherIcons = document.querySelectorAll(".hour-weather-icon");
  const currentWeatherIcon = document.querySelector(".weather-icon");
  const weeklyWeatherInfos = document.querySelectorAll(
    ".weekly-weather-description"
  );
  let start = 0;
  let end = 7;

  function renderPrecipitationIcon(icon) {
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
  }

  function renderPrecipitationInfo() {
    const precipitationIconContainers = document.querySelectorAll(
      ".precipitation-icon"
    );
    precipitationIconContainers.forEach((container) => {
      renderPrecipitationIcon(container);
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

  function hideWorldWeatherInfo() {
    const section = document.querySelector("section:last-of-type");
    section.setAttribute("id", "hidden");
  }
  function showWorldWeatherInfo() {
    const section = document.querySelector("section:last-of-type");
    section.removeAttribute("id", "hidden");
  }

  function renderCurrentWeather() {
    renderSunnyCloudyIcon(currentWeatherIcon);
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
  function renderWorldWeather() {
    const weatherIcons = document.querySelectorAll(".world-city-icon");
    const weatherTemps = document.querySelectorAll(".world-city-temperature");
    const weatherInfos = document.querySelectorAll(".world-city-info");
    weatherIcons.forEach((icon) => {
      renderSunnyIcon(icon);
    });

    weatherTemps.forEach((temp) => {
      const p = document.createElement("p");
      p.textContent = "10°";
      const unit = document.createElement("p");
      unit.textContent = "C";
      temp.appendChild(p);
      temp.appendChild(unit);
    });

    weatherInfos.forEach((info) => {
      const p = document.createElement("p");
      p.textContent = "Sunny";
      info.appendChild(p);
    });
  }
  function renderRainIcon(container) {
    const svgString = `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
    viewBox="0 0 64 64">
    <defs>
        <filter id="blur" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.05"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        </filter>
        <style type="text/css"><![CDATA[
/*
** RAIN
*/
@keyframes am-weather-rain {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}

.am-weather-rain-1 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-rain-2 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-delay: 0.25s;
     -moz-animation-delay: 0.25s;
      -ms-animation-delay: 0.25s;
          animation-delay: 0.25s;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}
        ]]></style>
    </defs>
    <g filter="url(#blur)" id="rainy-7">
        <g transform="translate(20,10)">
            <g>
                <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
            </g>
        </g>
        <g transform="translate(31,46), rotate(10)">
            <line class="am-weather-rain-1" fill="none" stroke="#91C0F8" stroke-dasharray="0.1,7" stroke-linecap="round" stroke-width="3" transform="translate(-5,1)" x1="0" x2="0" y1="0" y2="8" />
            <line class="am-weather-rain-2" fill="none" stroke="#91C0F8" stroke-dasharray="0.1,7" stroke-linecap="round" stroke-width="3" transform="translate(0,-1)" x1="0" x2="0" y1="0" y2="8" />
            <line class="am-weather-rain-1" fill="none" stroke="#91C0F8" stroke-dasharray="0.1,7" stroke-linecap="round" stroke-width="3" transform="translate(5,0)" x1="0" x2="0" y1="0" y2="8" />
        </g>
    </g>
</svg>`;
    const rainIcon = parser.parseFromString(
      svgString,
      "image/svg+xml"
    ).documentElement;

    container.appendChild(rainIcon);
  }
  function renderSunnyCloudyIcon(icon) {
    const svgString = `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
    viewBox="0 0 64 64">
    <defs>
        <filter id="blur" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.05"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        </filter>
        <style type="text/css"><![CDATA[
/*
** CLOUDS
*/
@keyframes am-weather-cloud-2 {
  0% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }

  50% {
    -webkit-transform: translate(2px,0px);
       -moz-transform: translate(2px,0px);
        -ms-transform: translate(2px,0px);
            transform: translate(2px,0px);
  }

  100% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }
}

.am-weather-cloud-2 {
  -webkit-animation-name: am-weather-cloud-2;
     -moz-animation-name: am-weather-cloud-2;
          animation-name: am-weather-cloud-2;
  -webkit-animation-duration: 3s;
     -moz-animation-duration: 3s;
          animation-duration: 3s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** SUN
*/
@keyframes am-weather-sun {
  0% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
       -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.am-weather-sun {
  -webkit-animation-name: am-weather-sun;
     -moz-animation-name: am-weather-sun;
      -ms-animation-name: am-weather-sun;
          animation-name: am-weather-sun;
  -webkit-animation-duration: 9s;
     -moz-animation-duration: 9s;
      -ms-animation-duration: 9s;
          animation-duration: 9s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-sun-shiny {
  0% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 0.1px 10px;
    stroke-dashoffset: -1px;
  }

  100% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }
}

.am-weather-sun-shiny line {
  -webkit-animation-name: am-weather-sun-shiny;
     -moz-animation-name: am-weather-sun-shiny;
      -ms-animation-name: am-weather-sun-shiny;
          animation-name: am-weather-sun-shiny;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}
        ]]></style>
    </defs>
    <g filter="url(#blur)" id="cloudy-day-1">
        <g transform="translate(20,10)">
            <g transform="translate(0,16)">
                <g class="am-weather-sun">
                    <g>
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(45)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(90)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(135)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(180)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(225)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(270)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                    <g transform="rotate(315)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                    </g>
                </g>
                <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" stroke-width="2"/>
            </g>
            <g class="am-weather-cloud-2">
                <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#C6DEFF" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
            </g>
        </g>
    </g>
</svg>`;
    const sunnyCloudyIcon = parser.parseFromString(
      svgString,
      "image/svg+xml"
    ).documentElement;
    icon.appendChild(sunnyCloudyIcon);
  }
  function renderCloudyIcon(icon) {
    const svgString = `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
    viewBox="0 0 64 64">
    <defs>
        <filter id="blur" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.05"/>
            </feComponentTransfer>
        <feMerge> 
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
        </filter>
        <style type="text/css"><![CDATA[
/*
** CLOUDS
*/
@keyframes am-weather-cloud-1 {
  0% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }

  50% {
    -webkit-transform: translate(10px,0px);
       -moz-transform: translate(10px,0px);
        -ms-transform: translate(10px,0px);
            transform: translate(10px,0px);
  }

  100% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }
}

.am-weather-cloud-1 {
  -webkit-animation-name: am-weather-cloud-1;
     -moz-animation-name: am-weather-cloud-1;
          animation-name: am-weather-cloud-1;
  -webkit-animation-duration: 7s;
     -moz-animation-duration: 7s;
          animation-duration: 7s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-cloud-2 {
  0% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }

  50% {
    -webkit-transform: translate(2px,0px);
       -moz-transform: translate(2px,0px);
        -ms-transform: translate(2px,0px);
            transform: translate(2px,0px);
  }

  100% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }
}

.am-weather-cloud-2 {
  -webkit-animation-name: am-weather-cloud-2;
     -moz-animation-name: am-weather-cloud-2;
          animation-name: am-weather-cloud-2;
  -webkit-animation-duration: 3s;
     -moz-animation-duration: 3s;
          animation-duration: 3s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** SUN
*/
@keyframes am-weather-sun {
  0% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
       -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.am-weather-sun {
  -webkit-animation-name: am-weather-sun;
     -moz-animation-name: am-weather-sun;
      -ms-animation-name: am-weather-sun;
          animation-name: am-weather-sun;
  -webkit-animation-duration: 9s;
     -moz-animation-duration: 9s;
      -ms-animation-duration: 9s;
          animation-duration: 9s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-sun-shiny {
  0% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 0.1px 10px;
    stroke-dashoffset: -1px;
  }

  100% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }
}

.am-weather-sun-shiny line {
  -webkit-animation-name: am-weather-sun-shiny;
     -moz-animation-name: am-weather-sun-shiny;
      -ms-animation-name: am-weather-sun-shiny;
          animation-name: am-weather-sun-shiny;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}




/*
** MOON
*/
@keyframes am-weather-moon {
  0% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(15deg);
       -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
            transform: rotate(15deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}

.am-weather-moon {
  -webkit-animation-name: am-weather-moon;
     -moz-animation-name: am-weather-moon;
      -ms-animation-name: am-weather-moon;
          animation-name: am-weather-moon;
  -webkit-animation-duration: 6s;
     -moz-animation-duration: 6s;
      -ms-animation-duration: 6s;
          animation-duration: 6s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
     -moz-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
      -ms-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
          transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
}

@keyframes am-weather-moon-star-1 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.am-weather-moon-star-1 {
  -webkit-animation-name: am-weather-moon-star-1;
     -moz-animation-name: am-weather-moon-star-1;
      -ms-animation-name: am-weather-moon-star-1;
          animation-name: am-weather-moon-star-1;
  -webkit-animation-delay: 3s;
     -moz-animation-delay: 3s;
      -ms-animation-delay: 3s;
          animation-delay: 3s;
  -webkit-animation-duration: 5s;
     -moz-animation-duration: 5s;
      -ms-animation-duration: 5s;
          animation-duration: 5s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
      -ms-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

@keyframes am-weather-moon-star-2 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.am-weather-moon-star-2 {
  -webkit-animation-name: am-weather-moon-star-2;
     -moz-animation-name: am-weather-moon-star-2;
      -ms-animation-name: am-weather-moon-star-2;
          animation-name: am-weather-moon-star-2;
  -webkit-animation-delay: 5s;
     -moz-animation-delay: 5s;
      -ms-animation-delay: 5s;
          animation-delay: 5s;
  -webkit-animation-duration: 4s;
     -moz-animation-duration: 4s;
      -ms-animation-duration: 4s;
          animation-duration: 4s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
      -ms-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

/*
** RAIN
*/
@keyframes am-weather-rain {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}

.am-weather-rain-1 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-rain-2 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-delay: 0.25s;
     -moz-animation-delay: 0.25s;
      -ms-animation-delay: 0.25s;
          animation-delay: 0.25s;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}


/*
** SNOW
*/
@keyframes am-weather-snow {
  0% {
    -webkit-transform: translateX(0) translateY(0);
       -moz-transform: translateX(0) translateY(0);
        -ms-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }

  33.33% {
    -webkit-transform: translateX(-1.2px) translateY(2px);
       -moz-transform: translateX(-1.2px) translateY(2px);
        -ms-transform: translateX(-1.2px) translateY(2px);
            transform: translateX(-1.2px) translateY(2px);
  }

  66.66% {
    -webkit-transform: translateX(1.4px) translateY(4px);
       -moz-transform: translateX(1.4px) translateY(4px);
        -ms-transform: translateX(1.4px) translateY(4px);
            transform: translateX(1.4px) translateY(4px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateX(-1.6px) translateY(6px);
       -moz-transform: translateX(-1.6px) translateY(6px);
        -ms-transform: translateX(-1.6px) translateY(6px);
            transform: translateX(-1.6px) translateY(6px);
    opacity: 0;
  }
}

@keyframes am-weather-snow-reverse {
  0% {
    -webkit-transform: translateX(0) translateY(0);
       -moz-transform: translateX(0) translateY(0);
        -ms-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }

  33.33% {
    -webkit-transform: translateX(1.2px) translateY(2px);
       -moz-transform: translateX(1.2px) translateY(2px);
        -ms-transform: translateX(1.2px) translateY(2px);
            transform: translateX(1.2px) translateY(2px);
  }

  66.66% {
    -webkit-transform: translateX(-1.4px) translateY(4px);
       -moz-transform: translateX(-1.4px) translateY(4px);
        -ms-transform: translateX(-1.4px) translateY(4px);
            transform: translateX(-1.4px) translateY(4px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateX(1.6px) translateY(6px);
       -moz-transform: translateX(1.6px) translateY(6px);
        -ms-transform: translateX(1.6px) translateY(6px);
            transform: translateX(1.6px) translateY(6px);
    opacity: 0;
  }
}

.am-weather-snow-1 {
  -webkit-animation-name: am-weather-snow;
     -moz-animation-name: am-weather-snow;
      -ms-animation-name: am-weather-snow;
          animation-name: am-weather-snow;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-snow-2 {
  -webkit-animation-name: am-weather-snow;
     -moz-animation-name: am-weather-snow;
      -ms-animation-name: am-weather-snow;
          animation-name: am-weather-snow;
  -webkit-animation-delay: 1.2s;
     -moz-animation-delay: 1.2s;
      -ms-animation-delay: 1.2s;
          animation-delay: 1.2s;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-snow-3 {
  -webkit-animation-name: am-weather-snow-reverse;
     -moz-animation-name: am-weather-snow-reverse;
      -ms-animation-name: am-weather-snow-reverse;
          animation-name: am-weather-snow-reverse;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** EASING
*/
.am-weather-easing-ease-in-out {
  -webkit-animation-timing-function: ease-in-out;
     -moz-animation-timing-function: ease-in-out;
      -ms-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
}

        ]]></style>
    </defs>
    <g filter="url(#blur)" id="cloudy">
        <g transform="translate(20,10)">
            <g class="am-weather-cloud-1">
                <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#91C0F8" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-10,-8), scale(0.6)"/>
            </g>
            <g class="am-weather-cloud-2">
                <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
            </g>
        </g>
    </g>
</svg>`;
    const cloudyIcon = parser.parseFromString(
      svgString,
      "image/svg+xml"
    ).documentElement;
    icon.appendChild(cloudyIcon);
  }
  function renderSunnyIcon(icon) {
    const svgString = `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
    viewBox="0 0 64 64">
    <defs>
        <filter id="blur" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.05"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        </filter>
        <style type="text/css"><![CDATA[
/*
** CLOUDS
*/
@keyframes am-weather-cloud-1 {
  0% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }

  50% {
    -webkit-transform: translate(10px,0px);
       -moz-transform: translate(10px,0px);
        -ms-transform: translate(10px,0px);
            transform: translate(10px,0px);
  }

  100% {
    -webkit-transform: translate(-5px,0px);
       -moz-transform: translate(-5px,0px);
        -ms-transform: translate(-5px,0px);
            transform: translate(-5px,0px);
  }
}

.am-weather-cloud-1 {
  -webkit-animation-name: am-weather-cloud-1;
     -moz-animation-name: am-weather-cloud-1;
          animation-name: am-weather-cloud-1;
  -webkit-animation-duration: 7s;
     -moz-animation-duration: 7s;
          animation-duration: 7s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-cloud-2 {
  0% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }

  50% {
    -webkit-transform: translate(2px,0px);
       -moz-transform: translate(2px,0px);
        -ms-transform: translate(2px,0px);
            transform: translate(2px,0px);
  }

  100% {
    -webkit-transform: translate(0px,0px);
       -moz-transform: translate(0px,0px);
        -ms-transform: translate(0px,0px);
            transform: translate(0px,0px);
  }
}

.am-weather-cloud-2 {
  -webkit-animation-name: am-weather-cloud-2;
     -moz-animation-name: am-weather-cloud-2;
          animation-name: am-weather-cloud-2;
  -webkit-animation-duration: 3s;
     -moz-animation-duration: 3s;
          animation-duration: 3s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** SUN
*/
@keyframes am-weather-sun {
  0% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
       -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.am-weather-sun {
  -webkit-animation-name: am-weather-sun;
     -moz-animation-name: am-weather-sun;
      -ms-animation-name: am-weather-sun;
          animation-name: am-weather-sun;
  -webkit-animation-duration: 9s;
     -moz-animation-duration: 9s;
      -ms-animation-duration: 9s;
          animation-duration: 9s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

@keyframes am-weather-sun-shiny {
  0% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 0.1px 10px;
    stroke-dashoffset: -1px;
  }

  100% {
    stroke-dasharray: 3px 10px;
    stroke-dashoffset: 0px;
  }
}

.am-weather-sun-shiny line {
  -webkit-animation-name: am-weather-sun-shiny;
     -moz-animation-name: am-weather-sun-shiny;
      -ms-animation-name: am-weather-sun-shiny;
          animation-name: am-weather-sun-shiny;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}




/*
** MOON
*/
@keyframes am-weather-moon {
  0% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(15deg);
       -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
            transform: rotate(15deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
       -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}

.am-weather-moon {
  -webkit-animation-name: am-weather-moon;
     -moz-animation-name: am-weather-moon;
      -ms-animation-name: am-weather-moon;
          animation-name: am-weather-moon;
  -webkit-animation-duration: 6s;
     -moz-animation-duration: 6s;
      -ms-animation-duration: 6s;
          animation-duration: 6s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
     -moz-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
      -ms-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
          transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
}

@keyframes am-weather-moon-star-1 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.am-weather-moon-star-1 {
  -webkit-animation-name: am-weather-moon-star-1;
     -moz-animation-name: am-weather-moon-star-1;
      -ms-animation-name: am-weather-moon-star-1;
          animation-name: am-weather-moon-star-1;
  -webkit-animation-delay: 3s;
     -moz-animation-delay: 3s;
      -ms-animation-delay: 3s;
          animation-delay: 3s;
  -webkit-animation-duration: 5s;
     -moz-animation-duration: 5s;
      -ms-animation-duration: 5s;
          animation-duration: 5s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
      -ms-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

@keyframes am-weather-moon-star-2 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.am-weather-moon-star-2 {
  -webkit-animation-name: am-weather-moon-star-2;
     -moz-animation-name: am-weather-moon-star-2;
      -ms-animation-name: am-weather-moon-star-2;
          animation-name: am-weather-moon-star-2;
  -webkit-animation-delay: 5s;
     -moz-animation-delay: 5s;
      -ms-animation-delay: 5s;
          animation-delay: 5s;
  -webkit-animation-duration: 4s;
     -moz-animation-duration: 4s;
      -ms-animation-duration: 4s;
          animation-duration: 4s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
      -ms-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

/*
** RAIN
*/
@keyframes am-weather-rain {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}

.am-weather-rain-1 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-rain-2 {
  -webkit-animation-name: am-weather-rain;
     -moz-animation-name: am-weather-rain;
      -ms-animation-name: am-weather-rain;
          animation-name: am-weather-rain;
  -webkit-animation-delay: 0.25s;
     -moz-animation-delay: 0.25s;
      -ms-animation-delay: 0.25s;
          animation-delay: 0.25s;
  -webkit-animation-duration: 8s;
     -moz-animation-duration: 8s;
      -ms-animation-duration: 8s;
          animation-duration: 8s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}


/*
** SNOW
*/
@keyframes am-weather-snow {
  0% {
    -webkit-transform: translateX(0) translateY(0);
       -moz-transform: translateX(0) translateY(0);
        -ms-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }

  33.33% {
    -webkit-transform: translateX(-1.2px) translateY(2px);
       -moz-transform: translateX(-1.2px) translateY(2px);
        -ms-transform: translateX(-1.2px) translateY(2px);
            transform: translateX(-1.2px) translateY(2px);
  }

  66.66% {
    -webkit-transform: translateX(1.4px) translateY(4px);
       -moz-transform: translateX(1.4px) translateY(4px);
        -ms-transform: translateX(1.4px) translateY(4px);
            transform: translateX(1.4px) translateY(4px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateX(-1.6px) translateY(6px);
       -moz-transform: translateX(-1.6px) translateY(6px);
        -ms-transform: translateX(-1.6px) translateY(6px);
            transform: translateX(-1.6px) translateY(6px);
    opacity: 0;
  }
}

@keyframes am-weather-snow-reverse {
  0% {
    -webkit-transform: translateX(0) translateY(0);
       -moz-transform: translateX(0) translateY(0);
        -ms-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }

  33.33% {
    -webkit-transform: translateX(1.2px) translateY(2px);
       -moz-transform: translateX(1.2px) translateY(2px);
        -ms-transform: translateX(1.2px) translateY(2px);
            transform: translateX(1.2px) translateY(2px);
  }

  66.66% {
    -webkit-transform: translateX(-1.4px) translateY(4px);
       -moz-transform: translateX(-1.4px) translateY(4px);
        -ms-transform: translateX(-1.4px) translateY(4px);
            transform: translateX(-1.4px) translateY(4px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateX(1.6px) translateY(6px);
       -moz-transform: translateX(1.6px) translateY(6px);
        -ms-transform: translateX(1.6px) translateY(6px);
            transform: translateX(1.6px) translateY(6px);
    opacity: 0;
  }
}

.am-weather-snow-1 {
  -webkit-animation-name: am-weather-snow;
     -moz-animation-name: am-weather-snow;
      -ms-animation-name: am-weather-snow;
          animation-name: am-weather-snow;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-snow-2 {
  -webkit-animation-name: am-weather-snow;
     -moz-animation-name: am-weather-snow;
      -ms-animation-name: am-weather-snow;
          animation-name: am-weather-snow;
  -webkit-animation-delay: 1.2s;
     -moz-animation-delay: 1.2s;
      -ms-animation-delay: 1.2s;
          animation-delay: 1.2s;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.am-weather-snow-3 {
  -webkit-animation-name: am-weather-snow-reverse;
     -moz-animation-name: am-weather-snow-reverse;
      -ms-animation-name: am-weather-snow-reverse;
          animation-name: am-weather-snow-reverse;
  -webkit-animation-duration: 2s;
     -moz-animation-duration: 2s;
      -ms-animation-duration: 2s;
          animation-duration: 2s;
  -webkit-animation-timing-function: linear;
     -moz-animation-timing-function: linear;
      -ms-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
     -moz-animation-iteration-count: infinite;
      -ms-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

/*
** EASING
*/
.am-weather-easing-ease-in-out {
  -webkit-animation-timing-function: ease-in-out;
     -moz-animation-timing-function: ease-in-out;
      -ms-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
}

        ]]></style>
    </defs>
    <g filter="url(#blur)" id="day">
        <g transform="translate(32,32)">
            <g class="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
                <g>
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(45)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(90)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(135)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(180)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(225)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(270)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
                <g transform="rotate(315)">
                    <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                </g>
            </g>
            <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" stroke-width="2"/>
        </g>
    </g>
</svg>`;
    const sunnyIcon = parser.parseFromString(
      svgString,
      "image/svg+xml"
    ).documentElement;
    icon.appendChild(sunnyIcon);
  }
  function renderWeeklyWeatherInfo() {
    weeklyWeatherInfos.forEach((info) => {
      const weatherInfo = document.createElement("p");
      weatherInfo.textContent = "Rainy";
      info.appendChild(weatherInfo);
    });
  }
  return {
    hideCurrentWeatherInfo,
    renderHourlyWeather,
    previousHour,
    nextHour,
    renderWeeklyWeather,
    renderRainIcon,
    renderSunnyCloudyIcon,
    renderCloudyIcon,
    renderCurrentWeather,
    renderWeeklyWeatherInfo,
    renderSunnyIcon,
    showWorldWeatherInfo,
    showCurrentWeatherInfo,
    hideWorldWeatherInfo,
    renderPrecipitationIcon,
    renderPrecipitationInfo,
    renderWorldWeather,
  };
})();

export { renderUI };
