const express = require('express');
const path = require('path');

const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// Get all members
app.get('/api/members', (req, res) => res.json(members));
// Get one member by id
app.get('/api/members/:id', (req, res) => {
    const member = members.filter(m => m.id === parseInt(req.params.id));
    if (member.length == 0) {
        res.status(404)
    }
    res.json(member);
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
