/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of notes creation and other CRUD
 * 
 * @description: It is use to taking the request from the client and gives the response.
 * 
 * @file        : controllers/notes.js
 * @overview    : controls notes creation, deletion, update and retrieval tasks
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Rekha R Patil [rekhapatil.1509@gmail.com]
 *********************************************************************/
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
      * @description function written to get Notes by ID
      * @param {*} a valid notesId is expected
      * @returns data else returns error
      */
      async getNoteById(notesId) {
        try {
            return await notesModel.getNoteById(notesId);
        }   catch (error) {
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
 
//  /**
//   * @description function written to delete label from note
//   * @param {*} a valid noteId is expected
//   * @param {*} a valid labelData is expected
//   * @returns 
//   */
//  async deleteLabelFromNote(notesId, labelData) {
//      try {
//          return await notesModel.deleteLabelFromNote(notesId, labelData);
//      } catch (error) {
//          return error
//      }
//    }
//  }

/**
   * @description   : It is used to delete an existing label from existing note taking data
   *                  from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Promise
  */
 removeLabelFromNote = (data) => {
    return new Promise((resolve, reject) => {
      const result = notesModel.removeLabelFromNote(data);
      result.then((labelData) => resolve({ labelData }))
        .catch((err) => reject({ err }));
    });
  }
}

 
 //exporting the class to utilize or call function created in this class
 module.exports = new NotesService();