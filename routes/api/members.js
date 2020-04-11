const express = require('express');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get one member by id
router.get('/:id', (req, res) => {
    const member = members.filter(m => m.id === parseInt(req.params.id));
    if (member.length == 0) {
        res.status(404)
           .json( { msg: `Member (id: ${req.params.id}) not found`} );
    }
    else {
        res.json(member);
    }
});

// Create a new member
router.post('/', (req, res) => {
    const member = {
        id: Math.max(0, ...members.map(m => m.id)) + 1,
        name: req.body.name,
        age: req.body.age,
    };
    if (!member.name) {
        res.status(400)
           .json( { msg: "You need to provide a name" } );
    }
    else {
        members.push(member);
        res.json( member );
    }
});

module.exports = router;