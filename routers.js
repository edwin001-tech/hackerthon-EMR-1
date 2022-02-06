const express = require('express');
const router = express.Router();
const User = require('./models');

router.get('/user', async(req, res) => {
    try{
        const user = await User.find()
    }
    catch(err){
        res.send(err)
    }
});

router.post('/user', async(req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        designation: req.body.designation,
        idnumber: req.body.idnumber,
        password: req.body.password,
    });
    try{
        const a1 = await user.save()
        console.log(a1)
        res.json(a1)
    }
    catch(err){
        res.send(err)
    }
});

router.get('/user/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch(err){
        res.send(err)
    }
});

module.exports = router;