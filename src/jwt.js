const dotenv = require('dotenv-safe').config(); // loading environment vars
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({user}, process.env.SECRET, {
    expiresIn: 3600 // 1 hour
  });
  return token;
}
const verifyJWT = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ err: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ err: 'Failed to authenticate token.' });
    
    req.user = decoded.user; // saves the user on request
    next();
  });
}
module.exports = {
  createToken,
  verifyJWT
};