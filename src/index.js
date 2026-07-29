import getWeather from './getWeather.js';
import { displayData } from './displayData.js';
import toggleMetric from './toggleMetric.js';
import convertToCelsius from './conversion.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
const toggleMetricBtn = document.getElementById('metricBtn');
const contentContainer = document.getElementById('content');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-box');
let searchLocation = '';
let metric = 'Farenheit'
let searchedData;


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchLocation = searchInput.value.trim();
    getWeather(searchLocation).then((dataJson) => {
      searchedData = dataJson;
      displayData(dataJson, metric);
  });
});

toggleMetricBtn.addEventListener('click', (event) => {
  metric = toggleMetric(metric);
  toggleMetricBtn.textContent = `Toggle: ${metric}`;
  const temperature = document.getElementById("tempItem");
  if (temperature !== null) {
    let tempValue = searchedData.currentConditions.temp;
    if (metric === "Celsius") {
      tempValue = convertToCelsius(tempValue)
    } 
    temperature.textContent = `Current temperature is about ${tempValue}° ${metric}`
  }
});




