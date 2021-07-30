/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : helper.js
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
      .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
  
    lastName: Joi.string()
      .min(3)
      .required()
      .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
  
    email: Joi.string()
      .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
      .required(),
  
    password: Joi.string()
      .required()
      .pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9\\#]{8,}')),
  });
/**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data which comes from the body of postmen
 * @module        : jwt
*/
const generatingToken = (data) => {
  console.log(data);
  const token = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET, { expiresIn: '24h' });
  client.setex('token', 7200, token);
  return token;
};

/**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
const verifyingToken = (req, res, next) => {
  try {
    const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET);
    client.get('token', (err, result) => {
      if (err) throw err;
      if (req.headers.token === result) {
        req.userData = tokenVerification;
        const userId = tokenVerification.id;
        req.userId = userId;
      }
      next();
    });
  } catch (err) {
    res.status(401).send({
      err: 'Unauthorized user',
    });
  }
};

module.exports = {
  authSchema,
  generatingToken,
  verifyingToken,
  };