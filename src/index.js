import getWeather from './getWeather.js';
import displayData from './displayData.js';
import toggleMetric from './toggleMetric.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
const toggleMetricBtn = document.getElementById('metricBtn');
const contentContainer = document.getElementById('content');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-box');
let searchLocation = '';
let metric = 'farenheit'
// Event listener for search button
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  searchLocation = searchInput.value.trim();
  getWeather(searchLocation).then((dataJson) => {
    // console.log(dataJson.currentConditions);
    console.log('Trying displayData function:')
    displayData(dataJson, metric);
  });
  // const weatherData = processData(weatherPromise);

});

toggleMetricBtn.addEventListener('click', (event) => {
  const oldMetric = metric;
  metric = toggleMetric(metric);
  toggleMetricBtn.textContent = `Metric: ${metric}`;
  const temp = document.getElementById("temp");
  if (temp !== null) {
    temp.textContent = temp.textContent.replace(oldMetric, metric);
  }
});



