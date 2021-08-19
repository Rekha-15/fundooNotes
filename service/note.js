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

    /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
    async getAllNotes() {
        try {
            return await notesModel.getAllNotes();
        } catch (error) {
            return error;
        }
    }

    /**
     * @description this function is written to trigger or call the models function
     * @param {*} notesId 
     * @param {*} notesData 
     * @returns error if it has error else data
     */
    async updateNotesById(notesId, notesData) {
        try {
            return await notesModel.updateNote(notesId, notesData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description deleting notes by id
     * @param {*} notesId 
     * @returns 
     */

    deleteNoteById = (notesId) => {
      return new Promise(function (resolve, reject) {
        try {
          notesModel
            .deleteNoteById(notesId)
            .then((note) => {
              logger.info("Note deleted successfully!", note);
              resolve(note);
            })
            .catch((error) => {
              logger.error("Error while deleting note by id", error);
              reject(error);
            });
        } catch (err) {
          logger.error("Error while deleting note by id", err);
          reject(err);
        }
      });
    };
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesService();