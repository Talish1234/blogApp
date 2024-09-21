const express = require('express');
const { getUsers, getUser, createUser, updateUser } = require('../controllers/userController');
const {login, logout} = require('../controllers/authController.js');
const { authmiddleware } = require('./../middlerware/authmiddlerware.js');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/',createUser);
router.put('/',authmiddleware,updateUser)
router.post('/auth',login);
router.get('/auth/logout',logout);
module.exports = router;