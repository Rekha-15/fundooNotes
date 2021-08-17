/**
 * @description   : It is work as a middleware between models and controller
 * @file          : note.js
 * @author        : Rekha
*/
const notesModel = require('../models/note');

class NotesService {
    /**
     * @description this function is written to send data models
     * @param {*} A valid notesData is expected
     * @returns error if it has error else data
     */
    async createNotes(notesData) {
        try {
            return await notesModel.createInfo(notesData);
        } catch (error) {
            return error;
        }
    }

    
  }
module.exports = new NotesService();