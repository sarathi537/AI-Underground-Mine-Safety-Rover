const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
// const cors = require('cors'); // Uncomment after running: npm install cors

// Import routes
const sensorRoutes = require('./routes/sensorRoutes');
const alertRoutes = require('./routes/alertRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middlewares
// app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse incoming JSON payloads

// Mount Routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/alerts', alertRoutes);

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Trinetra Backend is running' });
});

io.on('connection', (socket) => {
  console.log('Socket client connected:', socket.id);

  socket.on('sensor-data', (reading) => {
    io.emit('sensor-readings', reading);
  });

  socket.on('human-detection', (payload) => {
    console.log('Human detection event received:', payload);
    io.emit('human-status-update', payload);
  });

  socket.on('disconnect', () => {
    console.log('Socket client disconnected:', socket.id);
  });
});

module.exports = { app, server, io };