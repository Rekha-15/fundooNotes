/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Rekha
*/

// Importing controller from suser.js
const controller = require('../controllers/user');

module.exports = (app) => {
  app.post('/registration', controller.create);

  // Retrieve all Notes
  app.get('/getAllUser', controller.getAllUsers);

  // Retrieve a single Note with noteId
  app.get('/getOneUser/:userId', controller.getOneUser);

};