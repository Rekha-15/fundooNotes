/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Rekha Patil
*/
require('dotenv').config();
const { exist } = require('joi');
const logger = require('../logger/user');
const services = require('../service/user');
const { authSchema, userLoginDetails, generatingToken } = require('../utility/validation');



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
          logger.error("Error while creating the user", error);
          return res.status(409).send({
            success: false,
            message: 'User already exist',
          });
        } else {
          logger.info("User created successfully🥳",data);
          res.status(201).send({
          success: true,
          message: 'created successfully',
        });
      }
      });
    } catch (err) {
      logger.error("Internal server error while registering new user", error);
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
        logger.error("Error while trying to login the user",error);
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.login(loginCredentials, (error, data) => {
        if (error) {
          logger.error("Error while trying to login the user",error);
          return res.status(403).send({
            success: false,
            message: 'please check email and password and try again',
            error,
          })
        }
        logger.info("user logged in successfully😊", data);
        return res.status(200).send({
          success: true,
          message: 'logged in successfully',
          token: generatingToken(data),
        });
      });
      
    } catch (err) {
      logger.error("Error while trying to login the user",err);
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
    
//exporting the class
module.exports = new Controller();