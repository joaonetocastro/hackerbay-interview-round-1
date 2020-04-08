const express = require('express');
const jwt = require('./jwt');
const {LoginController, JsonPatchController, ThumbnailController} = require('./controllers');
const routes = express.Router();

routes.post('/login', LoginController.index);

routes.get('/json-patch', jwt.verifyJWT, JsonPatchController.index);

routes.get('/create-thumbnail', jwt.verifyJWT, ThumbnailController.index);

module.exports = routes;