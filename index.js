const express = require('express');
const path = require('path');

const app = express();

// Setup middlewares
app.use(require('./middleware/logger'));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Members API routes
app.use('/api/members', require('./routes/api/members'));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
