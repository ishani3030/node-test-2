const Pet = require('../models/pets');

async function create(req, res, next) {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try {
    const records = await Pet.find({});
    res.status(200).json(records);
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const record = await Pet.findById(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ "message": "Pet not found" });
    }
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const updatedData = await Pet.findByIdAndUpdate(id, req.body);
    if(updatedData) {
      res.status(200).json({ "message": "success" });
    } else {
      res.status(404).json({ "message": "Pet not found" });
    }    
  } catch (e) {
    next(e);
  }
}

async function deleteById(req, res, next) {
  try {
    const response = await Pet.findByIdAndRemove(req.params.id);
    if(response) {
      res.status(200).json({ "message": "success" });
    } else {
      res.status(404).json({ "message": "Pet not found" });
    }  
  } catch (e) {
    next(e);
  }
}

module.exports = { create, update, deleteById, getById, getAll };