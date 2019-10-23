const express = require('express');
const router = express.Router();
const db = require('../model/userModel');
const helpers = require('./helpers/authHelpers');
const jwt = require('jsonwebtoken');
//var sgMail = require('@sendgrid/mail');

// register
router.post("/register", function (req, res) {
    console.log("register");
    if (!req.body.firstName || !req.body.lastName  || !req.body.displayName || !req.body.password || !req.body.email) {
      console.log('foo');
        return (res.status(400).json({ msg: new Error("Please put all data on the body.") }));
    }
    console.log('boo');
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        password: req.body.password,
        email: req.body.email,
        // salt: helpers.getSalt()
    };
  //  user.hash = helpers.getHash(user.salt, req.body.password);
    db.create(user)
    .then(function(dbUser){
       res.json(dbUser)
    })
    .catch(function(err){
      res.json(err);
    })
    
  });
  

 module.exports = router;