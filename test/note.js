const mocha = require('mocha')
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
const chaiHttp = require('chai-http')
require('superagent')
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
        it('givenValidDataItShould_makePOSTRequestAndCreateNotes_andReturnsStatusCodeAs200', (done) => {
            let UserNotes  = userInputs.notesCreatePos
            // let notesData ={ 
                
            //     "title": "string, hi",
            //     "description": "string changed"
            // }
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                     res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Created!");
                    res.body.should.have.property("data").should.be.a('object');
                    return done();
                });
        });

        it('givenInvalidTitle_andValidDescription_failsToMakePOSTRequestToCreateNote_andReturnsStatusCodeAs400', (done) => {
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

        it('givenInvalidDescription_andValidTitle_failsToMakePOSTRequestToCreateNotes_andReturnsStatusCodeAs400', (done) => {
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
    });


    /**
     * /GET request test
     * Positive and Negative - Get all Notes from database
     */
    describe('GET all /notes', () => {
        it('givenValidRequest_successfullyMakesGETRequestToGetAllNotes_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    return done();
                });
        });
    });

     /**
      * /PUT request test
      * Positive and Negative - Updating a single contact using ID into database 
      */
    describe('PUT /note/:notesId', () => {
        it('givenValidDataItShould_updateOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
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
                    res.body.should.have.property("data").should.be.a('object');
                    return done();
                });
        });

        it('givenInvalidTitle_andValidDescription_failsToMakePUTRequestToUpdateNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
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

        it('givenInvalidDescription_andValidTitle_failsToMakePUTRequestToUpdateNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
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
    });

    /**
     * /DELETE request test
     * Positive and Negative - Deleting a single contact using ID into database 
     */
    describe('delete/:notesId', () => {
        it('givenValidDataItShould_delete_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .delete('/delete/6119eeb5e390f34140e68305')
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

        it('givenInValidDataItShould_deleteOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs400', (done) => {
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
                   // res.body.should.have.property("message").eql("\"isDeleted\" must be a boolean");
                    return done();
                });
        });
      });
//})
  