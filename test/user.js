/* eslint-disable no-undef */
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const userInputs = require('./user.json')

chai.should()
/**
 * /POST request test
 * Positive and Negative - Login of User Testing
 */
describe('login', () => {
  it('givenValidDataItShould_makePOSTRequestToLoginUser', (done) => {
    const loginDetails = userInputs.user.userLoginPos
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('logged in successfully')
        res.body.should.have.property('token')
        return done()
      })
  })

  it('givenInvalidEmailItShould_failToMakePOSTRequestToLoginUser', (done) => {
    const loginDetails = userInputs.user.userLoginNegEmail
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Internal server error')
        return done()
      })
  })

  it('givenEmptyStringInPasswordItShould_failToMakePOSTRequestToLoginUser', (done) => {
    const loginDetails = userInputs.user.userLoginEmpPassword
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Internal server error')
        return done()
      })
  })

  it('givenIncorrectPasswordItShould_failToMakePOSTRequestToLoginUser', (done) => {
    const loginDetails = userInputs.user.userLoginNegPassword
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('Internal server error')
        return done()
      })
  })
})

/**
 * /POST request test
 * Positive and Negative - Forgot Password of User Testing
 */
describe('forgotPassword', () => {
  it('givenValidDataItShould_makePOSTRequestToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordPos
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('User email id exist and Email sent successfully')
        return done()
      })
  })

  it('givenValidEmail_WhoIsNotRegisteredItShould_failToMakePOSTRequestToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordNegNonRegistered
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('failed to send email')
        return done()
      })
  })
})
