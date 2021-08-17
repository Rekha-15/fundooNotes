/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Rekha Patil
*/
const controller = require('../controllers/user')
const  { verifyingToken }  = require('../utility/validation')
const noteController = require('../controllers/note');



module.exports = (app) => {
  app.post('/registration', controller.create)

  app.post('/login', controller.login)

  app.post('/forgotPassword', controller.forgotPassword)

  app.put('/resetPassword', controller.resetPassword)

  //notes creation api - POST request
  app.post('/createNotes', verifyingToken, noteController.createNotes)

}