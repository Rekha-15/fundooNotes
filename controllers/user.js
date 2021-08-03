/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Rekha Patil
*/
require('dotenv').config();
const services = require('../service/user');
//const jwt = require('jsonwebtoken');
const { authSchema, userLoginDetails } = require('../utility/validation');


/**
 * @description    : This class has two methods to create and login of user
 * @methods        : create, login and forgotPassword
*/

class Controller {
  /**
   * @description   : creates an note in fundooNote
   * @param         : httpRequest and httpResponse
   * @method        : validate it compares the authSchema properties and the data coming
   *                  from the object and using services file method
  */
  create = (req, res) => {
    try {
      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };
      const validationResult = authSchema.validate(userDetails);
      if (validationResult.error) {
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.create(userDetails, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'created successfully',
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description   : login an user in fundooNote
   * @param         : httpRequest and httpResponse
   * @method        : services file method for login having an object and callback
  */
  login = (req, res) => {
    try {
      const loginCredentials = {
        email: req.body.email,
        password: req.body.password,
      };
      const validationResult = userLoginDetails.validate(loginCredentials);
      if (validationResult.error) {
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.login(loginCredentials, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'login failed',
            error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'logged in successfully',
        });
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
    
//exporting the class
module.exports = new Controller();