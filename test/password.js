/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const emailData = require('../test/user.json')

chai.should()

describe('forgotPassword', () => {
  it('givenEmail_whenProper_shouldSendMail', (done) => {
    const forgotPasswordDetails = emailData.user.forgotPasswordData
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(200)
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('User email id exist and Email sent successfully')
        done()
      })
  })
  it('givenEmail_whenImproper_shouldNotSendMail', (done) => {
    const forgotPasswordDetails = emailData.user.forgotPasswordWithImproperDetails
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('failed to send email')
        done()
      })
  })
})
