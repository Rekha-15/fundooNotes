/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Rekha Patil
*/

require('dotenv').config();
const services = require('../service/user');
const { authSchema, generatingToken } = require('../utility/validation');

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
        //the server cannot or will not process the request , client error
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.create(userDetails, (error, data) => {
        if (error) {
          //the server cannot or will not process the request , client error
          return res.status(400).send({
            success: false,
            message: error,
          });
        }
        //The HTTP 200 success status response 
        return res.status(200).send({
          success: true,
          message: 'created successfully',
        });
      });
    } catch (err) {
      //This error is usually returned by the server when no other error code is suitable
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description   : login an user in fundooNote
   * @param {*} req httpRequest
   * @param {*} res httpResponse
   * @returns http status error
   */

  login = (req, res) => {
    try {
      const loginCredentials = {
        email: req.body.email,
        password: req.body.password,
      };
      services.login(loginCredentials, (error, data) => {
        if (error) {
          //the server cannot or will not process the request , client error
          return res.status(400).send({
            success: false,
            message: 'login failed',
            error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'logged in successfully',
          token: generatingToken(data),
          data,
        });
      });
    } catch (err) {
      //http 500 error is usually returned by the server when no other error code is suitable.
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
    
//exporting the class
module.exports = new Controller();