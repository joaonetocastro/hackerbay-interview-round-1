const express = require('express');
const jwt = require('./jwt');
const JsonPatch = require('fast-json-patch');
const {resize} = require('./resize');

const routes = express.Router();

routes.post('/login', (req, res) => {
  const {user, password} = req.body;
  if( 
    (user && password) &&
    (user !== '' && password !== '')
  ){
    const token = jwt.createToken(user);
    return res.status(200).send({token});
  }else{
    return res.status(400).send();
  }
});

routes.get('/json-patch', jwt.verifyJWT, (req, res) => {
  const {jsonObject, patch} = req.body;
  if(typeof jsonObject !== 'object' || !Array.isArray(patch)){
    return res.status(400).send({err: 'jsonObject must be a json and patch must be an Array'});
  }else{
    const result = JsonPatch.applyPatch(jsonObject, patch).newDocument;
    return res.status(200).send({result});
  }
});


module.exports = routes;