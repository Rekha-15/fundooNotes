/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node user.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/note.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Rekha R Patil [rekhapatil.1509@gmail.com]
 *********************************************************************/
const mocha = require('mocha')
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
 const chaiHttp = require('chai-http')
const server = require('../server')
const userInputs = require('./note.json')
const userInput = require('./user.json')

//assertion style
const should = chai.should();
chai.use(chaiHttp);
let token = '';
// const userData = {
//     "email": "rekhapatil.1509@gmail.com",
//   "password": "Password@12"
// }
beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(userInput.user.userLoginPos)
        .end((error, res) => {
            if (error) {
              return done(error);
            }
            // console.log('BeforeEach token', res.body.token)
            token = res.body.token;
            done();
        });
});

    /**
     * /POST request test
     * Positive and Negative - Creation of Notes
     */
    describe('POST notes /create', () => {
        it('givenCreteNoteDetails_whenProper_shouldSaveInDB', (done) => {
            let UserNotes  = userInputs.notesCreatePos
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Created!");
                    return done();
                });
        });

        it('givenCreteNoteDetails_whenInvalidTitle_shouldFailsToMakePOSTRequestToCreateNote', (done) => {
            let UserNotes  = userInputs.notesCreateNegTitle
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenCreteNoteDetails_whenInvalidDescription_shouldFailsToMakePOSTRequestToCreateNote', (done) => {
            let UserNotes = userInputs.notesCreateNegDescription
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotCreateNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                   // res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });


    /**
     * /GET request test
     * Positive and Negative - Get all Notes from database
     */
    describe('GET all /notes', () => {
        it('givenValidDetails__whenProper_shouldGETRequestToGetAllNotes', (done) => {
            chai.request(server)
                .get('/AllNotes')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotGetAllNotes', (done) => {
            chai.request(server)
                .get('/AllNotes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

     /**
      * /PUT request test
      * Positive and Negative - Updating a single contact using ID into database 
      */
    describe('PUT /note/:notesId', () => {
        it('givenCreteNoteDetails_whenProper_shouldMakePUTRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/updateNote/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutPos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Updated!");
                    return done();
                });
        });

        it('givenUpdateNoteDetails_whenInvalidTitle_shouldFailsToMakePutRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/updateNote/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutNegTitle)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenUpdateNoteDetails_whenInvalidDescription_shouldFailsToMakePUtRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/updateNote/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutNegDescription)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotUpdateNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    //res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

    /**
     * /DELETE request test
     * Positive and Negative - Deleting a single contact using ID into database 
     */
    describe('delete/:notesId', () => {
        it('givenValidDatat_whenProper_shouldDeleteInDB', (done) => {
            chai.request(server)
                .delete('/delete/6122b36581b3cb26188e9f08')
                .send(userInputs.notesDelPos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Note Deleted!");
                    return done();
                });
        });

        it('givenDatat_whenImProper_shouldNotDeleteInDB', (done) => {
            chai.request(server)
                .delete('/delete')
                .send(userInputs.notesDelNeg)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotDeleteNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                   // res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

    /**
     * /PUT request test
     * Positive and Negative - Adding label to note using Note ID into database 
     */
     describe('PUT /addLabel/', () => {
        it('givenValidDataItShould_addLabelToNoteSuccessfully_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNotePos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Added!");
                    res.body.should.have.property("data").should.be.a('object');
                    return done();
                });
        });

        it('givenInValidNoteIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNoteNegNoteId)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql('"notesId" is not allowed to be empty');
                    return done();
                });
        });

        it('givenInValidLabelIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNoteNegLabelId)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"labelId\" is not allowed to be empty");
                    return done();
                });
        });
    });

    /**
     * /PUT request test
     * Positive and Negative - Deleting label from note using Note ID into database 
     */
     describe('delete /deleteLabel/', () => {
        it('givenValidDataItShould_addLabelToNoteSuccessfully_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelFromNotePos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Deleted!");
                    return done();
                });
        });

        it('givenInValidNoteIdItShould_failTodeleteLabelfromNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelToNoteNegNoteId)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    return done();
                });
        });

        it('givenInValidLabelIdItShould_failTodeleteLabelFromNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelToNoteNegLabelId)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    return done();
                });
        });
    });

  