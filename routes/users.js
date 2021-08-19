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
  app.post('/createNotes', verifyingToken, noteController.createNotes);

  //get all notes api - GET request
  app.get('/notes/:notes', verifyingToken, noteController.getAllNotes);

  //update note by Id api - PUT request
  app.put('/note/:notesId', verifyingToken, noteController.updateNotesById);

  //delete note by Id api - PUT request
  app.put('/delete/:_id', verifyingToken, noteController.deleteNotesById);

}