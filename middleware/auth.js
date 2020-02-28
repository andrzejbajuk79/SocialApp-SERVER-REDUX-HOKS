const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
 //Get Token  from header
 const token = req.header('x-auth-token');
 // Check if  not token
 if (!token) {
  res.status(401).json({msg: 'No token , authorization failed'});
 }
 // Verify token
 try {
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  req.user = decoded.user;
  next();
 } catch (err) {
  //if token not valid
  res.status(401).json({msg: 'Token is not valid'});
 }
};
