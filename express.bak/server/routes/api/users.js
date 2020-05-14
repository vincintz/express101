import express, { Request, Response } from 'express';

const router  = express.Router();

const userList = [];

router.get("/", async (req, res) => {
    res.send(userList);
});

router.post("/", async (req, res) => {
    let user = { "firsname": req.body.firstname, "lastname": req.body.lastname };
    user.id = userList.length;
    userList.push(user);
    res.status(201).json(user);
});

export default router;