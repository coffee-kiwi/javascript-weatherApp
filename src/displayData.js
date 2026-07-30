import convertToCelsius from './conversion.js';
import partlyCloudyImg from './assets/partlyCloudy.png';
import sunnyImg from './assets/sunny.png';
import cloudyImg from './assets/cloudy.png';
import rainyImg from './assets/rain.png';
import snowyImg from './assets/snowy.png';
import thunderstormImg from './assets/thunder.png';

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
    if (precipType === null) {
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

    const imageContainer = document.getElementById("icons");
    imageContainer.textContent = "";
    // Erase current image via visibility or textContent?
    if (currentWeather.includes("Rain")) {
        const image = document.createElement("img");
        image.src = rainyImg;
        imageContainer.appendChild(image);
    }
    if (currentWeather.includes("Clear") || currentWeather.includes("Sunny")) {
        const image = document.createElement("img");
        image.src = sunnyImg;
        imageContainer.appendChild(image);
    }
    if (currentWeather.includes("Partially cloudy")) {
        const image = document.createElement("img");
        image.src = partlyCloudyImg;
        imageContainer.appendChild(image);
    }    
    if (currentWeather.includes("Cloudy") || currentWeather.includes("Overcast")) {
        const image = document.createElement("img");
        image.src = cloudyImg;
        imageContainer.appendChild(image);
    }
    if (currentWeather.includes("Snow")) {
        const image = document.createElement("img");
        image.src = snowyImg;
        imageContainer.appendChild(image);
    }
        if (currentWeather.includes("Storm")) {
        const image = document.createElement("img");
        image.src = thunderstormImg;
        imageContainer.appendChild(image);
    }


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
