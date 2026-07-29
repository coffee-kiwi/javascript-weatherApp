export default function convertToCelsius(temp) {
    return ((temp - 32) * 5 / 9).toFixed(1);
}

// export function convertToFaren(temp) {
//     return ((temp * 9 / 5) + 32).toFixed(1);
// }