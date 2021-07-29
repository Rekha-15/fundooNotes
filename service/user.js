const bcrypt = require('bcrypt');
// Importing models from user.js
const models = require('../models/user');

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
   * get the all users
   * @param {*} callback call back function
   */

  getAllUser = (callback) => {
      try {
        models.findAll ((err, data) => {
            return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * get the user with provided ID
   * @param {*} userId path to the User object
   * @param {*} callback callback function
   * @returns callback, status, object
   */
  getOne = (userId, callback) => {
    console.log(`userId.userId in service.js/getOne methods ${userId.userId}`);
    try {
      if (!userId.userId) {
        return res
          .status(404)
          .send({ message: `User with id: ${userId._id} not found` });
      }

      //calling method to get user data with id
      models.getDataById(userId.userId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };


}

//exporting the class
module.exports = new Service();