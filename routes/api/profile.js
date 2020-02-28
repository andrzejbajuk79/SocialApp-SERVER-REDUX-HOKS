const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

// @route GET api/profile/me
// @desc  Get current users profile
// @acces Private
router.get('/me', auth, async (req, res) => {
 try {
  const profile = await Profile.findOne({
   user: req.user.id,
  }).populate('users', ['name', 'avatar']); //;
  if (!profile) {
   return res.status(400).json({msg: 'There is no profile for this user'});
  }
  res.json(profile);
 } catch (error) {
  console.error(error.message);
  res.status(500).send('Server Error');
 }
});

// @route POST api/profile
// @desc  Create/Update user profile
// @acces Private
router.post('/', auth, async (req, res) => {
 const {errors, isValid} = validateProfileInput(req.body);
 if (!isValid) {
  // Return any errors with 400 status
  return res.status(400).json(errors);
 }
 const {
  company,
  website,
  location,
  bio,
  status,
  githubusername,
  skills,
  youtube,
  facebook,
  twitter,
  instagram,
  linkedin,
 } = req.body;
 //build profile object
 const profileFields = {};
 profileFields.user = req.user.id;

 if (company) profileFields.company = company;
 if (website) profileFields.website = website;
 if (location) profileFields.location = location;
 if (bio) profileFields.bio = bio;
 if (status) profileFields.status = status;
 if (githubusername) profileFields.githubusername = githubusername;
 if (skills) {
  profileFields.skills = skills.split(', ').map(skill => skill.trim());
 }
 //build social objects
 profileFields.social = {};
 if (youtube) profileFields.social.youtube = youtube;
 if (twitter) profileFields.social.twitter = twitter;
 if (facebook) profileFields.social.facebook = facebook;
 if (linkedin) profileFields.social.linkedin = linkedin;
 if (instagram) profileFields.social.instagram = instagram;

 try {
  let profile = await Profile.findOne({user: req.user.id});
  if (profile) {
   // update
   profile = await Profile.findOneAndUpdate(
    {users: req.user.id},
    {$set: profileFields},
    {new: true}
   );
   return res.json(profile);
  }
  // create
  profile = new Profile(profileFields);
  await profile.save();
  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server ERROR');
 }
});

// @route GET api/profile
// @desc  Get all profiles
// @acces Public
router.get('/all', async (req, res) => {
 const errors = {};
 const profiles = await Profile.find()
  .populate('users', ['name', 'avatar'])
  .then(profiles => {
   if (!profiles) {
    errors.noprofile = 'There are no profiles';
    return res.status(404).json(errors);
   }

   res.json(profiles);
  })
  .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});
// @route GET api/profile/user/:user_id
// @desc  Get profile buy user ID
// @acces Public
router.get('/user/:user_id', async (req, res) => {
 const errors = {};
 const profile = await Profile.findOne({user: req.params.user_id})
  .populate('users', ['name', 'avatar'])
  .then(profile => {
   if (!profile) {
    errors.noprofile = 'No profile for this user';
    return res.status(404).json(errors);
   }

   res.json(profile);
  })
  .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});
// @route DELETE  api/profile/
// @desc  Delete profile, user & post
// @acces Private
router.delete('/', auth, async (req, res) => {
 const errors = {};

 try {
  // remove users posts

  // remove profile
  await Profile.findOneAndRemove({users: req.user.id});
  await User.findOneAndRemove({_id: req.user.id});
  res.json({msg: 'User deleted'});
 } catch (err) {
  res.status(500).send('server error');
 }
});
// @route PUT  api/profile/experience
// @desc  Add profile experience
// @acces Private

router.put(
 '/experience',
 [
  auth,
  [
   check('title', 'Title is required')
    .not()
    .isEmpty(),
   check('company', 'Company is required')
    .not()
    .isEmpty(),
   check('from', 'From Date is required')
    .not()
    .isEmpty(),
  ],
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const {title, company, location, from, to, current, description} = req.body;
  const newExp = {title, company, location, from, to, current, description};
  try {
   const profile = await Profile.findOne({user: req.user.id});

   // Add to exp array
   profile.experience.unshift(newExp);

   await profile.save();
   res.json(profile);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server error');
  }
 }
);

// @route DELETE  api/profile/
// @desc  Delete profile, user & post
// @acces Private
router.delete('/', auth, async (req, res) => {
 const errors = {};

 try {
  // remove users posts

  // remove profile
  await Profile.findOneAndRemove({users: req.user.id});
  await User.findOneAndRemove({_id: req.user.id});
  res.json({msg: 'User deleted'});
 } catch (err) {
  res.status(500).send('server error');
 }
});
// @route PUT  api/profile/experience
// @desc  Add profile experience
// @acces Private

router.put(
 '/experience',
 [
  auth,
  [
   check('title', 'Title is required')
    .not()
    .isEmpty(),
   check('company', 'Company is required')
    .not()
    .isEmpty(),
   check('from', 'From Date is required')
    .not()
    .isEmpty(),
  ],
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const {title, company, location, from, to, current, description} = req.body;
  const newExp = {title, company, location, from, to, current, description};
  try {
   const profile = await Profile.findOne({user: req.user.id});

   // Add to exp array
   profile.experience.unshift(newExp);

   await profile.save();
   res.json(profile);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server error');
  }
 }
);
// @route DELETE  api/profile/experience/:exp_id
// @desc  Delete experience from profile
// @acces Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
 try {
  const profile = await Profile.findOne({user: req.user.id});
  //get remove index

  const removeIndex = profile.experience
   .map(item => item.id)
   .indexOf(req.params.exp_id);

  profile.experience.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
 }
});

// @route PUT  api/profile/education
// @desc  Add profile experience
// @acces Private
router.put(
 '/education',
 [
  auth,
  [
   check('school', 'School is required')
    .not()
    .isEmpty(),
   check('degree', 'Degree is required')
    .not()
    .isEmpty(),
   check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty(),
   check('from', 'From Date is required')
    .not()
    .isEmpty(),
  ],
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const {
   school,
   degree,
   fieldofstudy,
   from,
   to,
   current,
   description,
  } = req.body;
  const newEdu = {school, degree, fieldofstudy, from, to, current, description};
  try {
   const profile = await Profile.findOne({user: req.user.id});

   // Add to exp array
   profile.education.unshift(newEdu);

   await profile.save();
   res.json(profile);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server error');
  }
 }
);
// @route DELETE  api/profile/education/:edu_id
// @desc  Delete education from profile
// @acces Private
router.delete('/education/:edu_id', auth, async (req, res) => {
 try {
  const profile = await Profile.findOne({user: req.user.id});
  //get remove index

  const removeIndex = profile.education
   .map(item => item.id)
   .indexOf(req.params.edu_id);

  profile.education.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
 }
});
// @route GET  api/profile/github/;username
// @desc  Dget user repos from github
// @acces Public
router.get('/github/:username', (req, res) => {
 try {
  const id = config.get('githubClientId');
  const secret = config.get('githubSecret');
  const options = {
   uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
   sort=created:asc&client_id=${id}&client_secret=${secret}`,
   method: 'GET',
   headers: {'user-agent': 'node.js'},
  };
  request(options, (error, response, body) => {
   if (error) console.error(error);
   console.log(response);

   if (response.statusCode !== 200) {
    return res.status(404).json({msg: 'No github profile found'});
   }
   res.json(JSON.parse(body));
  });
 } catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
 }
});
module.exports = router;
