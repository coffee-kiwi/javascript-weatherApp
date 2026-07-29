import convertToCelsius from './conversion.js'

export default function displayData(dataJson, metric) {

    const contentContainer = document.getElementById("content")
    contentContainer.textContent = "";
    console.log('Data includes:');
    console.log(dataJson);
    console.log('----------------------');
    console.log(dataJson.alerts);

    const conditionsTitle = document.createElement("h2");
    conditionsTitle.textContent = `Current conditions in ${dataJson.address} are:`
    contentContainer.appendChild(conditionsTitle);

    const weatherData = document.createElement("ul");
    const conditions = document.createElement("li");
    conditions.textContent = `Current weather: ${dataJson.currentConditions.conditions}`
    const humidity = document.createElement("li");
    humidity.textContent = `Humidity: ${dataJson.currentConditions.humidity}%`
    const chanceOfPrecipitation = document.createElement("li");
    if (dataJson.currentConditions.preciptype !== null) {
        chanceOfPrecipitation.textContent = `Chance of ${dataJson.currentConditions.preciptype[0]}: ${dataJson.currentConditions.precipprob}%`
    } else {
        chanceOfPrecipitation.textContent = `Chance of rain: ${dataJson.currentConditions.precipprob}%`
    }
    
    const temperature = document.createElement("li");
    temperature.id = "tempItem"
    let tempValue = dataJson.currentConditions.temp;
    if (metric === "Celsius") {
        tempValue = convertToCelsius(tempValue)
    } 
    temperature.textContent = `Current temperature is about ${tempValue}° ${metric}`

    weatherData.appendChild(conditions);
    weatherData.appendChild(humidity);
    weatherData.appendChild(chanceOfPrecipitation);
    weatherData.appendChild(temperature);
    contentContainer.appendChild(weatherData);

    console.log('length of alerts array');
    console.log(dataJson.alerts.length);
    if (dataJson.alerts.length > 0) {
        const alertTitle = document.createElement("h2");
        alertTitle.textContent = "Alerts"
        contentContainer.appendChild(alertTitle);

        dataJson.alerts.forEach(function(alert) {
        console.log(alert.event);
        const alertTitle = document.createElement("h3");
        alertTitle.textContent = alert.event;
        const alertMessage = document.createElement("p");
        alertMessage.textContent = alert.headline;
        contentContainer.appendChild(alertTitle);
        contentContainer.appendChild(alertMessage);
    });
    } else {
        const alertTitle = document.createElement("h3");
        alertTitle.textContent = "There are no weather alerts currently."
    }
}
