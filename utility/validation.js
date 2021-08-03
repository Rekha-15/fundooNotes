const Joi = require('joi');
//const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
const authSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),

  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),

  email: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
    .required(),

    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required(),
});

const userLoginDetails = Joi.object({
  email: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
  .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required(),
});





module.exports = {
  authSchema,
  userLoginDetails
};