
const VC_APIKey = process.env.VC_API;

export default async function getWeather(location) {
    
    try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=${VC_APIKey}&contentType=json`)
    console.log('Successfully fetched');
    console.log(`Returning promise`);
    return response.json();
    } catch (error) {
        console.log('Failed to get response')
        console.log(error);
    }


}
