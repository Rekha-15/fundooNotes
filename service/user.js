/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Rekha Patil <rekhapatil.1509@gmail.com>
*/
const bcrypt = require('bcrypt');
const logger = require('../logger/user');
const models = require('../models/user');
const { sendingEmail, getEmailFromToken  } = require('../utility/validation');
const { bcryptAuthentication, generatingToken } = require('../utility/validation')

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

  // /**
  //  * @description     : it acts as a midlleware for models and controllers
  //  * @param           : data, callback
  //  * @method          : login from models
  // */
  // login = (info, callback) => {
  //   // const { password } = data;
  //   models.login(info, (error, result) => {
  //     if (error) {
  //       return callback(error,null)
  //     }
  //     if(bcryptAuthentication(info.password, result.password )) {
  //       const token = generatingToken({info})
  //       return token ? callback(null, token) : callback(error,null)
  //     }
  //     return callback("Incoreectt password", error)
  //   });
  // }

  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : login from models
  */
   login = (data, callback) => {
    const { password } = data;
    models.login(data, (error, result) => {
      if (result) {
        bcrypt.compare(password, result.password, (err, resultt) => {
          if (err) {
            callback(err, null);
          }
          if (resultt) {
            callback(null, result);
          } else {
            callback('Password does not match');
          }
        });
      } else {
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
    const email = getEmailFromToken(userInput.token)
    const inputData = {
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