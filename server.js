const express = require('express');
const app = express();

//import route files
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/', htmlRoutes);
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});