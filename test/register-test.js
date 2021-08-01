const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');

chai.should();
/**
 * Post Request
 * Positive Test for registration, and saving to DB
 */
describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registration;
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  /**
   * Post Request
   * Negative Test Case, By not giving last name
   */
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperDetails;
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((err, res) => {
          //the server cannot or will not process the request 
        res.should.have.status(400);
        done();
      });
  });
});