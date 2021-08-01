/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : validation.js
 * @author        : Rekha Patil
*/

//jwt: JSON Web Token: for securely transmitting information between parties as a JSON object
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

    /**
     * (it should follow all the 4 rules) Rule-1 Minimum 8 character Rule-2 At least one
	   *  Upper case Rule-3 At least one Numeric value Rule-4 at least one
	   *  Special character
     */
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')),
});

module.exports = {
  authSchema,
  };