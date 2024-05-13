const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Use the HTML and API routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});