const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const registrationData = require('./user.json')

chai.should()
/**
 * Post Request
 * Positive Test for registration, and saving to DB
 */
// eslint-disable-next-line no-undef
describe('registartion', () => {
  // mini discribe
  // eslint-disable-next-line no-undef
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registration
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((_err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  /**
   * Post Request
   * Negative Test Case, By not giving last name
   */
  // eslint-disable-next-line no-undef
  it('givenRegistrationDetails_whenNolastName_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithNolastName
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(400)
        done()
      })
  })

  // eslint-disable-next-line no-undef
  it('givenRegistrationDetails_whenNoemailId_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithNoemailId
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(400)
        done()
      })
  })

  // eslint-disable-next-line no-undef
  it('givenRegistrationDetails_whenNoPassword_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithNoPassword
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(400)
        done()
      })
  })
})
