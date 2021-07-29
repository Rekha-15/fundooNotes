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
}

//exporting the class
module.exports = new Service();