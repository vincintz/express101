const express = require('express');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get one member by id
router.get('/:id', (req, res) => {
    const member = members.filter(m => m.id === parseInt(req.params.id));
    if (member.length == 0) {
        return res.status(404)
                  .json( { msg: `Member (id: ${req.params.id}) not found`} );
    }
    else {
        return res.json(member);
    }
});

// Create a new member
router.post('/', (req, res) => {
    if (!req.body.name)
        return res.status(400)
                  .json( { msg: "You need to provide a name" } );
    const member = {
        id: Math.max(0, ...members.map(m => m.id)) + 1,
        name: req.body.name,
        age: req.body.age,
    };
    members.push(member);
    return res.json( member );
});

// Update a member
router.put('/:id', (req, res) => {
    // validations
    if (!req.params.id)
        return res.status(400)
                  .json({ msg: "Member id required" });
    else if (!req.body.name)
        return res.status(400)
                  .json({ msg: "Please provide a member name" });
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) {
        return res.status(404)
                  .json( { msg: `Member with id = ${req.params.id} not found.` } );
    }
    else {
        member.name = req.body.name;
        member.age = req.body.age;
        return res.json( { msg: "Update successful", member } );
    }
});

// Update a member
router.patch('/:id', (req, res) => {
    // validations
    if (!req.params.id)
        return res.status(400)
                  .json({ msg: "Member id required" });
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) {
        return res.status(404)
                  .json( { msg: `Member with id = ${req.params.id} not found.` } );
    }
    else {
        member.name = req.body.name ? req.body.name : member.name;
        member.age = req.body.age ? req.body.age : member.age;
        return res.json( { msg: "Update successful", member } );
    }
});

// Delete a member
router.delete('/:id', (req, res) => {
    // validations
    if (!req.params.id)
        return res.status(400)
                  .json({ msg: "Member id required" });
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member)
        return res.status(404)
                  .json( { msg: `Member with id = ${req.params.id} not found.` } );
    const index = members.indexOf(member);
    members.splice(index, 1);
    return res.json({ msg: "Member deleted", member });
});

module.exports = router;