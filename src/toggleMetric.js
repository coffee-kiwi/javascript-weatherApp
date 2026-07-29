
export default function toggleMetric(currentMetric) {
    if (currentMetric === "Farenheit") {
        return "Celsius";
    } else {
        return "Farenheit";
    }
}