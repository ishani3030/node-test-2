const Joi = require('@hapi/joi');
const {validateBody} = require('../middlewares/route');

function validateCreateUser(req, res, next) {
    return validateBody(Joi.object().keys({
        firstName: Joi.string().required().description('Users first name'),
        lastName: Joi.string().required().description('Users last name'),
        age: Joi.number().integer().required().description('Users age'),
        profession: Joi.string().default('unemployed'),
    }))(req, res, next);
}

module.exports = {validateCreateUser};