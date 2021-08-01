const chai = require('chai');
//chai-http is an addon plugin for  Chai Assertion Library
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const loginData = require('./user.json');

chai.should();
/**
 * POST request test
 * Positive test for login, by giving proper email id and password
 */
describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      //To make the request and assert on its response, the end method can be used
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  /**
   * Post Request
   * Negative test for login , By entering wrong enail or password
   */
  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});