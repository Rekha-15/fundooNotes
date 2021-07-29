/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Rekha
*/

// Importing controller from user.js
const controller = require('../controllers/user');

module.exports = (app) => {
  app.post('/registration', controller.create);

};