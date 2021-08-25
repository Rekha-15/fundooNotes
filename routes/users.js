/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Rekha Patil
*/
const controller = require('../controllers/user')
const  { verifyingToken }  = require('../utility/validation')
const noteController = require('../controllers/note');
const labelController = require('../controllers/label');
const redisCache = require('../utility/redis');


module.exports = (app) => {
  app.post('/registration', controller.create)

  app.post('/login', controller.login)

  app.post('/forgotPassword', controller.forgotPassword)

  app.put('/resetPassword', controller.resetPassword)

  //notes creation api - POST request
  app.post('/createNotes', verifyingToken, noteController.createNotes);

  //get all notes api - GET request
  app.get('/notes/:notes', verifyingToken,redisCache.checkCache, noteController.getAllNotes);

  //update note by Id api - PUT request
  app.put('/note/:notesId', verifyingToken, noteController.updateNotesById);

  //delete note by Id api - PUT request
  app.delete('/delete/:notesId', verifyingToken, noteController.deleteNotesById);

  //label creation api - POST request
  app.post('/createLabel/:userId',  verifyingToken, labelController.createLabel);

  //get all labels api - GET request
  app.get('/labels/:labels', verifyingToken, redisCache.checkLabelCache, labelController.getAllLabels);

  //get single label by ID api - GET request
  app.get('/label/:labelId',  verifyingToken, labelController.getLabelById);

  //update single label by ID api - PUT request
  app.put('/updateLabel/:labelId',  verifyingToken, labelController.updateLabelById);

  //delete label by ID api - DELETE request
  app.delete('/deleteLabel/:labelId',  verifyingToken, labelController.deleteLabelById);

  //add label to note api - PUT request
  app.put('/addLabel',  verifyingToken, noteController.addLabelToNote);

  //delete label from note api - PUT request
  app.delete('/deleteLabel',  verifyingToken, noteController.deleteLabelFromNote);
  
}