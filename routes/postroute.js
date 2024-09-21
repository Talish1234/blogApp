const express = require('express');
const router = express.Router();
const { authmiddleware } = require('./../middlerware/authmiddlerware.js');
const { createPost, getTopPosts, getPosts, getPost, myPost, EditorPost } = require('../controllers/postController');

router.get('/topPost',getTopPosts);
router.get('/',getPosts);

router.get('/myPost',authmiddleware,myPost);
router.get('/:id',getPost);
router.get('/editor/:id',EditorPost);
router.post('/',authmiddleware,createPost);

module.exports = router;