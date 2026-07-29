export default function convertToCelsius(temp) {
    return ((temp - 32) * 5 / 9).toFixed(1);
}