const express = require('express');
const router = express.Router();
const { validateCreateUser, validateCreatePet } = require('../middlewares/validator');

const users = require('./users');
const pets = require('./pets');

router.post('/user', validateCreateUser, users.create);
router.post('/pet', validateCreatePet, pets.create);
router.get('/pet/:id', pets.getById);
router.get('/pet/', pets.getAll);
router.put('/pet/:id', validateCreatePet, pets.update);
router.delete('/pet/:id', pets.deleteById);

module.exports = router;