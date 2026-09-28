// This acts as our temporary database
const sensors = [
    { id: "ch4", code: "S-01", label: "Methane (CH₄)", unit: "%LEL", value: "2.1", status: "Normal", category: "gas" },
    { id: "co", code: "S-02", label: "Carbon Monoxide (CO)", unit: "ppm", value: "15", status: "Normal", category: "gas" },
    { id: "temperature", code: "S-05", label: "Temperature", unit: "°C", value: "28.5", status: "Normal", category: "environmental" }
];

const alerts = [
    { id: "LOG-092", type: "critical", title: "Methane Threshold Exceeded", zone: "Zone B3", time: "14:21:05" },
    { id: "LOG-091", type: "warning", title: "Unusual Geophone Vibration", zone: "Zone A2", time: "14:18:22" }
];

module.exports = {
    sensors,
    alerts
};