
const VC_APIKey = process.env.VC_API;

async function getWeather(location) {

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=${VC_APIKey}&contentType=json`)
    try {
        console.log(response);
    } catch (error) {
        console.log('Failed to get response')
        console.log(error);
    }

}

export { getWeather };
