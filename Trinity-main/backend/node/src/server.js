const { server, io } = require('./app'); // Ensure 'io' is exported from your app.js
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const PORT = process.env.PORT || 5000;

// 1. UPDATE THIS TO YOUR EXACT USB PORT (e.g., 'COM3', 'COM5', or '/dev/ttyUSB0')
const LORA_PORT = 'COM14';

// 2. Listen to the Wemos D1 Mini over USB
try {
    const port = new SerialPort({ path: LORA_PORT, baudRate: 115200 });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    port.on('open', () => {
        console.log(`✅ Connected to Surface Gateway on ${LORA_PORT}`);
    });

    parser.on('data', (data) => {
        let line = data.trim();
        if (!line) return;

        // Skip the Wemos's own debug/diagnostic line (packet length, RSSI, raw hex dump)
        if (line.startsWith('Packet len=')) {
            return;
        }

        // The Wemos prefixes the actual payload line with "text: " before the JSON —
        // strip that off before attempting to parse.
        if (line.startsWith('text: ')) {
            line = line.slice('text: '.length).trim();
        }

        try {
            const telemetry = JSON.parse(line);
            console.log("📡 Broadcasting to React:", telemetry);

            if (io) {
                io.emit('lora_telemetry', telemetry);
            } else {
                console.warn("Socket.io instance not found. Cannot broadcast.");
            }
        } catch (err) {
            console.log("Raw Serial (Non-JSON):", line);
        }
    });

    port.on('error', (err) => console.error('Serial Port Error:', err.message));
} catch (error) {
    console.warn(`⚠️ Could not open ${LORA_PORT}. Verify USB connection.`);
}

// 3. Start the Server
server.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Socket.IO ready on ws://localhost:${PORT}`);
});