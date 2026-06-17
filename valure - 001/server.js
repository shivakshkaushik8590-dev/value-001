const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bookingHandler = require('./api/booking');
const contactHandler = require('./api/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets and files from the root directory
app.use(express.static(__dirname));

// Mount the serverless function handler to local route
app.post('/api/booking', bookingHandler);
app.post('/api/contact', contactHandler);

// Catch-all route to serve index.html for undefined routes (for routing fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`VALURE PREMIUM MARBLE DEV SERVER LISTENING`);
    console.log(`Local address: http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/booking`);
    console.log(`========================================================`);
});
