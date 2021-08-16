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

  app.post('/createNotes', verifyingToken, noteController.createNote);

  app.put('/note/:notesId', verifyingToken, noteController.updateNote);

  app.get('/notes/:notes', verifyingToken,  noteController.getAllNotes);

  app.delete('/delete/:notesId', verifyingToken, noteController.deleteNote);

}
