/* eslint-disable prefer-regex-literals */
const Joi = require('joi')
// const jwt = require('jsonwebtoken');
require('dotenv').config()

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
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
})

const userLoginDetails = Joi.object({
  email: Joi.string()
  // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
    .required(),

  password: Joi.string()
    .required()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
})

// /**
//  * @description   : creating token using jsonwebtoken module
//  * @param {data} as data which comes from the body of postmen
//  * @module        : jwt
// */
// const generatingToken = (data) => {
//   console.log(data);
//   const token = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET, { expiresIn: '24h' });
//   return token;
// };

module.exports = {
  authSchema,
  userLoginDetails
  // generatingToken,
}
