const notesModel = require('../models/note');
logger = require('../logger/user');

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

    // deleteNoteById = (notesId) => {
    //   return new Promise(function (resolve, reject) {
    //     try {
    //       notesModel.deleteNoteById(notesId)
    //         .then((note) => {
    //           logger.info("Note deleted successfully!", note);
    //           resolve(note);
    //         })
    //         .catch((error) => {
    //           logger.error("Error while deleting note by id", error);
    //           reject(error);
    //         });
    //     } catch (err) {
    //       logger.error("Error while deleting note by id", err);
    //       reject(err);
    //     }
    //   });
    // };
    
     async deleteNoteById(notesId, notesData) {
      try {
          return await notesModel.deleteNote(notesId, notesData);
      } catch (error) {
          return error
      }
  }

  /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
   async addLabelToNote(notesId, labelData) {
    try {
        return await notesModel.addLabelToNote(notesId, labelData);
    } catch (error) {
        return error
    }
}

/**
 * @description function written to delete label from note
 * @param {*} a valid noteId is expected
 * @param {*} a valid labelData is expected
 * @returns 
 */
async deleteLabelFromNote(notesId, labelData) {
    try {
        return await notesModel.deleteLabelFromNote(notesId, labelData);
    } catch (error) {
        return error
    }
  }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesService();