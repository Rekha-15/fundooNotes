/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Rekha Patil <rekhapatil.1509@gmail.com>
*/
const bcrypt = require('bcrypt');
const models = require('../models/user');
const helper = require('../utility/jwt_helper')


class Service {
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : create from models
  */
  create = (data, callback) => {
    models.create(data, callback);
  }

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
            callback(err, null);
          }
          if (result) {
            callback(null, result);
            // const token = helper.generatingToken({data})
            // return (token) ? callback(null, token) : callback(err, null)
          } else {
            callback('Password does not match');
          }
        });
      } else {
        callback('user not found');
      }
    });
  }
}

//exporting the class
module.exports = new Service();