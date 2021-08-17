/**
 * @description   : It is use to taking the request from the client and gives the response.
 * @file          : note.js
 * @author        : Rekha R Patil
*/

const notesService = require('../service/note');
const { notesCreationValidation } = require('../utility/validation');

class NoteController {
    /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res 
     * @returns response
     */
    async createNotes(req, res) {
        try {
            let dataValidation = notesCreationValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const notesData = {
                title: req.body.title,
                description: req.body.description
            }
            const notesCreated = await notesService.createNotes(notesData);
            res.send({success: true, message: "Notes Created!", data: notesCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }
  }

module.exports = new NoteController();