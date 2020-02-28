const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const {userValidation} = require('../../validation/validation');
const User = require('../../models/User');

// @route POST api/users
// @desc  Register user
// @acces Public
router.post(
 '/',
 [
  check('name', 'Name is required')
   .not()
   .isEmpty(),
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({
   min: 6,
  }),
 ],
 async (req, res) => {
  // const {error} = userValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }
  const {name, email, password} = req.body;
  // Check if user exist
  try {
   let user = await User.findOne({email});
   if (user) {
    return res.status(400).json({errors: [{msg: 'User already exist'}]});
   }
   // Get User gravatar
   const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
   });
   user = new User({name, email, avatar, password});
   // Encrypt the password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);
   await user.save();

   // Return jsonwebtoken
   const payload = {
    user: {
     id: user.id,
    },
   };

   jwt.sign(
    payload, //
    config.get('jwtSecret'),
    {expiresIn: 360000},
    (err, token) => {
     if (err) throw err;
     res.json({token});
    }
   );
  } catch (err) {
   console.log(err.message);
   res.status(500).send('Server Error');
  }
 }
);
module.exports = router;