/* eslint-disable no-undef */

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
describe('registartion', () => {
  // mini discribe
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registration
    chai
      .request(server)
      .post('/registration')
      .send(registartionDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(201)
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('created successfully')
        done()
      })
  })
  /**
   * Post Request
   * Negative Test Case, By not giving last name
   */

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
