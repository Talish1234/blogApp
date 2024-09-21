const express = require('express');
const router = express.Router();
const { authmiddleware } = require('./../middlerware/authmiddlerware.js');
const { createreview } = require('../controllers/reviewController.js');

router.post('/:id',authmiddleware,createreview);

module.exports = router;