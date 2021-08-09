/* eslint-disable no-undef */
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const loginData = require('./user.json')

chai.should()
/**
 * POST request test
 * Positive test for login, by giving proper email id and password
 */
// eslint-disable-next-line no-undef
describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      // To make the request and assert on its response, the end method can be used
      .end((_err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  /**
   * Post Request
   * Negative test for login , By entering wrong email or password
   */
  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(500)
        done()
      })
  })

  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperemailId
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(500)
        done()
      })
  })

  // eslint-disable-next-line no-undef
  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperepassword
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((_err, res) => {
        // the server cannot or will not process the request
        res.should.have.status(500)
        done()
      })
  })
})
