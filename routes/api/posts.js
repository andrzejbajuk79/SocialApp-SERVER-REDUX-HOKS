const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
// Load Validation
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route POST api/posts
// @desc  Create Post
// @acces Private
router.post(
 '/',
 [
  auth,
  [
   check('text', 'Text is required')
    .not()
    .isEmpty(),
  ],
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }
  try {
   const user = await User.findById(req.user.id).select('-password');
   const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
   });
   const post = await newPost.save();
   res.json(post);
  } catch (err) {
   console.error(err);
   res.status(500).send('server error');
  }
 }
);

// @route GET api/posts
// @desc  Gett All posts
// @acces Private
router.get('/', auth, async (req, res) => {
 try {
  const posts = await Post.find().sort({date: -1});
  res.json(posts);
 } catch (err) {
  console.error(err);
  res.status(500).send('server error');
 }
});

// @route GET api/posts/:id
// @desc  GGet post by id
// @acces Private
router.get('/:id', auth, async (req, res) => {
 try {
  const post = await Post.findById(req.params.id).sort({date: -1});
  if (!post) {
   return res.status(404).json({msg: 'Post not found'});
  }
  res.json(post);
 } catch (err) {
  console.error(err);
  if (err.kind === 'ObjectId') {
   return res.status(404).json({msg: 'Post not found'});
  }
  res.status(500).send('server error');
 }
});

// @route DELETE api/posts/:id
// @desc  Delete post by id
// @acces Private
router.delete('/:id', auth, async (req, res) => {
 try {
  const post = await Post.findById(req.params.id).sort({date: -1});
  if (!post) {
   return res.status(404).json({msg: 'Post not found'});
  }
  //musimy sie upewnic ze post kasuje osoba ktora go stworzyla
  // Check User
  console.log(post.user.toString());

  if (post.user.toString() !== req.user.id) {
   return res.status(401).json({msg: 'User not authorized'});
  }
  await post.remove();

  res.json({msg: 'Post removed'});
 } catch (err) {
  console.error(err);
  if (err.kind === 'ObjectId') {
   return res.status(404).json({msg: 'Post not found'});
  }
  res.status(500).send('server error');
 }
});

// @route PUT api/posts/like/:id
// @desc  Like a post
// @acces Private
router.post('/like/:id', auth, async (req, res) => {
 Profile.findOne({user: req.user.id}).then(profile => {
  Post.findById(req.params.id)
   .then(post => {
    if (
     post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
     return res
      .status(400)
      .json({alreadyliked: 'User already liked this post'});
    }

    // Add user id to likes array
    post.likes.unshift({user: req.user.id});

    post.save().then(post => res.json(post));
   })
   .catch(err => res.status(404).json({postnotfound: 'No post found'}));
 });
 //  try {
 //   const post = await Post.findById(req.params.id);
 //   //sprawdzamy czy juz zostal poklubiony przez tego usera
 //   //nie moze dwa razy tego zrobic

 //   if (
 //    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
 //   ) {
 //    return res.sendStatus(400).json({msg: 'Post already liked'});
 //   }
 //   post.likes.unshift({user: req.user.id});
 //   await post.save();
 //   res.json(post.likes);
 //  } catch (err) {
 //   console.error(err);
 //   res.status(500).send('server error');
 //  }
});

// @route PUT api/posts/unlike/:id
// @desc  Like a post
// @acces Private
router.put('/unlike/:id', auth, async (req, res) => {
 try {
  const post = await Post.findById(req.params.id);
  //sprawdzamy czy juz zostal poklubiony przez tego usera
  //nie moze dwa razy tego zrobic

  if (
   post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
   return res.sendStatus(400).json({msg: 'Post has not been liked'});
  }
  //Get remove index

  const removeIndex = post.likes
   .map(like => like.user.toString())
   .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  await post.save();
  res.json(post.likes);
 } catch (err) {
  console.error(err);
  res.status(500).send('server error');
 }
});

// @route POST api/posts/comment/:id
// @desc  Comment on the post
// @acces Private
router.post(
 '/comment/:id',
 [
  auth,
  [
   check('text', 'Text is required')
    .not()
    .isEmpty(),
  ],
 ],
 async (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
   // If any errors, send 400 with errors object
   return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
   .then(post => {
    const newComment = {
     text: req.body.text,
     name: req.body.name,
     avatar: req.body.avatar,
     user: req.user.id,
    };

    // Add to comments array
    post.comments.unshift(newComment);

    // Save
    post.save().then(post => res.json(post));
   })
   .catch(err => res.status(404).json({postnotfound: 'No post found'}));
 }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Comment on the post
// @acces Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
 try {
  const post = await Post.findById(req.params.id);
  const comment = post.comments.find(
   comment => comment.id === req.params.comment_id
  );
  //Make sure comments exist
  if (!comment) {
   return res.status(404).json({msg: 'Comment does not exist'});
  }

  //Check user
  if (comment.user.toString() !== req.user.id) {
   return res.status(404).send('User not authirized');
  }
  const removeIndex = post.comments
   .map(comment => comment.user.toString())
   .indexOf(req.user.id);
  post.comments.splice(removeIndex, 1);
  await post.save();
  res.json(post.comments);
 } catch (err) {
  console.error(err);
  res.status(500).send('server error');
 }
});

module.exports = router;
