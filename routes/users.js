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

  app.post('/notesCreate', verifyingToken, noteController.createNote);

  app.put('/notes/:noteId', verifyingToken, noteController.updateNote);

  app.get('/notes', verifyingToken,  noteController.getAllNotes);

  app.delete('/notes/:noteId', verifyingToken, noteController.deleteNote);

}
