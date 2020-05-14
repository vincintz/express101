import express, { Request, Response } from 'express';
import mongodb, { ObjectID } from 'mongodb';
import Member from '../../model/Members';

const router = express.Router();

// Get all members
router.get('/', async (req: Request, res: Response) => {
    const members = await loadMembersCollection();
    res.send(await members.find({}).toArray());
});

// Get one member by id
router.get('/:id', async (req: Request, res: Response) => {
    const members = await loadMembersCollection();
    try {
        members.findOne({ _id: new ObjectID(req.params.id) })
            .then( (member: Member) => {
                    if (!member) {
                        return res.status(404)
                                .json({ msg: `Member id: ${req.params.id} not found` });
                    }
                    else {
                        return res.json(member);
                    }
            })
            .catch( err => {
                    return res.status(500)
                            .send(err);
            });
    }
    catch (err) {
        return res.status(404)
                  .json({ msg: `Member id: ${req.params.id} not found` });
    }
});

// Create a new member
router.post('/', async (req: Request, res: Response) => {
    if (!req.body.name)
        return res.status(400)
                  .json( { msg: "You need to provide a name" } );
    const members = await loadMembersCollection();
    const member = {
        name: req.body.name,
        age: req.body.age,
    };
    const result = await members.insertOne(member);
    return res.status(201)
              .json( result );
});

// Update a member
router.put('/:id', async (req: Request, res: Response) => {
    // validations
    if (!req.body.name)
        return res.status(400)
                  .json({ msg: "Please provide a member name" });
    const members = await loadMembersCollection();
    const member = {
        name: req.body.name, age: req.body.age
    };
    try {
        members.replaceOne({ _id: new ObjectID(req.params.id) }, member)
                .then( result => {
                    if (result.matchedCount === 0)
                        return res.status(404)
                                  .json({ msg: `Member id: ${req.params.id} not found` });
                    else
                        return res.json({ msg: `Member id: ${req.params.id} not found`, member });
                })
                .catch( err => {
                    return res.status(500)
                              .send(err);
                });
    }
    catch (err) {
        res.status(404)
            .json({ msg: `Member id: ${req.params.id} not found` });
    }
    
});

// Update a member
router.patch('/:id', async (req: Request, res: Response) => {
    const members = await loadMembersCollection();
    try {
        const member = await members.findOne({ _id: new ObjectID(req.params.id) });
        req.body.name && (member.name = req.body.name);
        req.body.age  && (member.age = req.body.age);
        members.replaceOne({ _id: new ObjectID(req.params.id) }, member)
                .then( result => {
                    if (result.matchedCount === 0)
                        return res.status(404)
                                  .json({ msg: `Member id: ${req.params.id} not found` });
                    else
                        return res.json({ msg: `Member id: ${req.params.id} not found`, member });
                })
                .catch( err => {
                    console.log(err);
                    return res.status(500)
                              .send(err);
                });
    }
    catch (err) {
        res.status(404)
           .json({ msg: `Member id: ${req.params.id} not found` });
    }
});

// Delete a member
router.delete('/:id', async (req: Request, res: Response) => {
    // validations
    if (!req.params.id)
        return res.status(400)
                  .json({ msg: "Member id required" });
    const members = await loadMembersCollection();
    const result = await members.deleteOne({ _id: new ObjectID(req.params.id) });
    
    if (result?.deletedCount ?? 0 > 0)
        return res.json({ msg: `Member '${req.params.id}' deleted` });
    else
        return res.status(400)
                  .json({ msg: `Member '${req.params.id}' was not deleted` });
});

const mdb   = 'test';
const muser = 'express101';
const mpass = 'GRkPO91JuLUEaJRC';
const muri  = `mongodb+srv://${muser}:${mpass}@express101-5p11r.mongodb.net/test?retryWrites=true&w=majority`;
const mcoll = 'members';

async function loadMembersCollection() {
    const client = await mongodb.MongoClient.connect(muri, {
        useNewUrlParser: true
    });
    return client.db(mdb).collection(mcoll);
}

export default router;