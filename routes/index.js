const express = require('express');
const router = express.Router();

const users = require('./users');

const {validateCreateUser} = require('../middlewares/validator');

router.post('/user', validateCreateUser, users.create);

module.exports = router;