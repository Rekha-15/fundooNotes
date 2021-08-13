/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Rekha Patil <rekhapatil.1509@gmail.com>
*/
const bcrypt = require('bcrypt');
const logger = require('../logger/user');
const models = require('../models/user');
const { sendingEmail, getEmailFromToken  } = require('../utility/validation');

class Service {
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : create from models
  */
  create = (data, callback) => {
    models.create(data, (err, doc) => {
      if (err) {
        logger.error("Error while creating new user", err);
        callback(err, null);
      } else {
        logger.info("User registered successfully!", doc);
        callback(null, doc);
      }
    });
  };

  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : login from models
  */
  login = (data, callback) => {
    const { password } = data;
    models.login(data, (error, result) => {
      if (result) { 
        bcrypt.compare(password, result.password, (error, result) => {
          if (error) { 
            logger.error("Error while trying to login the user",error);
            callback(err, null);
          }
          if (result) {
            logger.info("logged in successfully",result)
            callback(null, result);
            
          } else {
            logger.error("Please enter correct password", err);
            callback('Password does not match');
          }
        });
      } else {
        logger.error("Error while trying to login the user",err);
        callback('user not found');
      }
    });
  }

  /**
   * @description         : it acts as a midlleware for models and controllers
   * @param    {data}     : taking data from controller
   * @param   {callback}  : giving result to controller
   * @method              : forgotPassword from models
  */
   forgotPassword = (data, callback) => {
    models.forgotPassword(data, (error, result) => {
      console.log(result);
      if (result) {
        logger.info("user email exist🤗",result);
        const details = {
          email: result.email,
          _id: result._id,
        };
        error ? callback(error, null) : callback(null, sendingEmail(details));
      } else {
        logger.error("user email not found😐",error);
        callback('Email does not exist');
      }
    });
  }

  /**
   * @description         : it acts as a midlleware for models and controllers
   * @param    {data}     : taking data from controller
   * @param   {callback}  : giving result to controller
   * @method              : resetPassword from models
  */
   resetPassword = (userInput, callback) => {
    try{
    var email = getEmailFromToken(userInput.token)
    var inputData = {
        email: email,
        password: userInput.password
    }

    models.resetPassword(inputData, (error, data) =>{
        if(error){
            logger.error("Some error occured while updating password", error)
            callback(error, null)
         }else{
             logger.info("Password has been reset successfully", data)
            callback(null, data)
         } 
    })
    }catch(error){
        return callback(error, null)
    }
    
}
}


//exporting the class
module.exports = new Service();