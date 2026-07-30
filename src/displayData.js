import convertToCelsius from './conversion.js';
import partlyCloudyImg from './assets/partlyCloudy.png';

export default function displayData(dataJson, metric) {

    const contentContainer = document.getElementById("content");
    contentContainer.textContent = "";
    contentContainer.classList.add("card")
    const alertContainer = document.getElementById("alertDiv");
    alertContainer.textContent = "";
    alertContainer.classList.add("card");

    const conditionsTitle = document.createElement("h2");
    conditionsTitle.textContent = `Current conditions in ${dataJson.address} are:`
    contentContainer.appendChild(conditionsTitle);
    const precipType = dataJson.currentConditions.preciptype;
    let tableHeaders;
    if (precipType !== null) {
        tableHeaders = [ "Weather", "Temperature", "Humidity", "Chance of rain"];
    } else {
        tableHeaders = [ "Weather", "Temperature", "Humidity", `Chance of ${precipType}`];
    }

    let tempValue = dataJson.currentConditions.temp;
    if (metric === "Celsius") {
        tempValue = convertToCelsius(tempValue)
    } 
    const currentWeather = dataJson.currentConditions.conditions;
    const rowData = [`${currentWeather}`, `${tempValue}° ${metric}`, `${dataJson.currentConditions.humidity}%`, `${dataJson.currentConditions.precipprob}%`]
    console.log(`Row data is: ${rowData}`);
    const table = document.createElement('table');
    const trHeader = document.createElement('tr');
    const trBody = document.createElement('tr');

    trHeader.append(...tableHeaders.map(text => {
        const th = document.createElement('th');
        th.textContent = text;
        return th;
    }));

    trBody.append(...rowData.map((text, index) => {
        const td = document.createElement('td');
        td.textContent = text;
        if (index === 1) {
            td.id = "tempItem"
        }
        return td;
    }));

    table.append(trHeader, trBody);
    contentContainer.appendChild(table);

    const image = document.createElement("img");
    const imageContainer = document.getElementById("icons");
    // Erase current image via visibility or textContent?
    switch (currentWeather) {
        case "sunny":
            image.src = './assets/images/sunny.png';
            imageContainer.appendChild(image);
            break;
        
        case "Partially cloudy":
            image.src = partlyCloudyImg;
            imageContainer.appendChild(image);
            break;
    
        default:
            imageContainer.classList.add("invisible");
            break;
    }

    // const weatherData = document.createElement("ul");
    // const conditions = document.createElement("li");
    // conditions.textContent = `Current weather: ${dataJson.currentConditions.conditions}`
    // const humidity = document.createElement("li");
    // humidity.textContent = `Humidity: ${dataJson.currentConditions.humidity}%`
    // const chanceOfPrecipitation = document.createElement("li");
    // if (dataJson.currentConditions.preciptype !== null) {
    //     chanceOfPrecipitation.textContent = `Chance of ${dataJson.currentConditions.preciptype[0]}: ${dataJson.currentConditions.precipprob}%`
    // } else {
    //     chanceOfPrecipitation.textContent = `Chance of rain: ${dataJson.currentConditions.precipprob}%`
    // }
    
    // const temperature = document.createElement("li");
    // temperature.id = "tempItem"
    // let tempValue = dataJson.currentConditions.temp;
    // if (metric === "Celsius") {
    //     tempValue = convertToCelsius(tempValue)
    // } 
    // temperature.textContent = `Current temperature is about ${tempValue}° ${metric}`

    // weatherData.appendChild(conditions);
    // weatherData.appendChild(humidity);
    // weatherData.appendChild(chanceOfPrecipitation);
    // weatherData.appendChild(temperature);
    // contentContainer.appendChild(weatherData);

    if (dataJson.alerts.length > 0) {
        const alertTitle = document.createElement("h2");
        alertTitle.textContent = "Alerts"
        alertContainer.appendChild(alertTitle);

        dataJson.alerts.forEach(function(alert) {
        console.log(alert.event);
        const alertTitle = document.createElement("h3");
        alertTitle.textContent = alert.event;
        const alertMessage = document.createElement("p");
        alertMessage.textContent = alert.headline;
        alertContainer.appendChild(alertTitle);
        alertContainer.appendChild(alertMessage);
    });
    } else {
        const alertTitle = document.createElement("h3");
        alertTitle.textContent = "There are no weather alerts currently."
        alertContainer.appendChild(alertTitle);
    }
}
