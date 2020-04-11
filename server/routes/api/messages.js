const express = require('express');
const moment  = require('moment');
const mongodb = require('mongodb');
const router  = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    const messages = await loadMessagesCollection();
    res.send(await messages.find({}).toArray());
});

// Add message
router.post('/', async (req, res) => {
    if (!req.body.message)
        return res.status(400)
                  .json( { msg: "You need to provide a message" } );
    const message = {
        name: req.body.message,
        createdAt: moment().format(),
    };
    const messages = await loadMessagesCollection();
    const result = await messages.insertOne(message);
    return res.status(201)
              .json( result );
});


// Delete message
router.delete('/:id', async (req, res) => {
    // validations
    if (!req.params.id)
        return res.status(400)
                  .json({ msg: "Message id required" });
    const messages = await loadMessagesCollection();
    const result = await messages.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    
    if (result.deletedCount > 0)
        return res.json({ msg: `Message '${req.params.id}' deleted` });
    else
        return res.status(400)
                  .json({ msg: `Message '${req.params.id}' was not deleted` });
});


const mdb   = 'test';
const muser = 'express101';
const mpass = 'GRkPO91JuLUEaJRC';
const muri  = `mongodb+srv://${muser}:${mpass}@express101-5p11r.mongodb.net/test?retryWrites=true&w=majority`;
const mcoll = 'messages';

async function loadMessagesCollection() {
    console.log(muri);
    console.log(mcoll);
    const client = await mongodb.MongoClient.connect(muri, {
        useNewUrlParser: true
    });
    return client.db(mdb).collection(mcoll);
}


module.exports = router;