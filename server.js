const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for waitlist
app.post('/api/waitlist', express.json(), async (req, res) => {
    try {
        const { email, name } = req.body;

        // Here you can add your database logic to store the waitlist entries
        // For now, we'll just return a success response
        console.log('New waitlist entry:', { email, name });

        res.status(200).json({ message: 'Successfully joined waitlist' });
    } catch (error) {
        console.error('Error processing waitlist entry:', error);
        res.status(500).json({ error: 'Failed to process waitlist entry' });
    }
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});