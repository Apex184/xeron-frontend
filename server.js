const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
let BASE_URL;

if (NODE_ENV === 'production') {
    BASE_URL = process.env.BASE_URL;
} else {
    BASE_URL = process.env.BASE_URL_DEV + ':' + PORT;
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint example
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello from the backend!',
        baseUrl: BASE_URL,
        environment: NODE_ENV
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Base URL: ${BASE_URL}`);
});