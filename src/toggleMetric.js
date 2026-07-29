
export default function toggleMetric(currentMetric) {
    if (currentMetric === "farenheit") {
        return "celsius";
    } else {
        return "farenheit";
    }
}