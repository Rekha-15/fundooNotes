/**
 * Executaion       :1.default node      cmd>nodemon start
 *
 * purpose          :to save find update and delete in the database
 *
 * @file            :note.js
 * @author          :Rekha R Patil
 * @version         :1.0.0
*/
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // color: { type: String, required: false },
  // isPined: { type: Boolean, default: false },
  // isArchieved: { type: Boolean, default: false },
  // isReminder: { type: String, default: false },
  // isTrashed: { type: Boolean, default: false },
}, {
  timestamps: true, versionKey: false,
});

const NoteModel = mongoose.model('Note', noteSchema);

//created a class to write functions
class NotesModel {

    /**
     * @description function written to create notes into database
     * @param {*} a valid notesData is expected
     * @returns saved data or if error returns error
     */
    async createInfo(notesData) {
        try {
            const notes = new NoteModel({
                title: notesData.title,
                description: notesData.description
            });
            return await notes.save({});
        } catch (error) {
            return error;
        }
    }
  }

module.exports = new NoteModel();