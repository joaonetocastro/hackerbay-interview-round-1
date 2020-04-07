const dotenv = require('dotenv-safe').config(); // loading environment vars
const express = require('express');
const jwt = require('jsonwebtoken');

const routes = express.Router();

routes.post('/login', (req, res) => {
  const {user, password} = req.body;
  if( 
    (user && password) &&
    (user !== '' && password !== '')
  ){
    const token = jwt.sign({user}, process.env.SECRET, {
      expiresIn: 3600 // 1 hour
    });
    res.status(200).send({token});
  }else{
    res.status(400).send();
  }
});

module.exports = routes;