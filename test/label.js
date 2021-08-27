/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node notes.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/label.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Rekha R Patil [rekhapatil.1509@gmail.com]
 *********************************************************************/
const mocha = require('mocha')
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
 const chaiHttp = require('chai-http')
const server = require('../server')
const userInputs = require('./label.json')
const userInput = require('./user.json')


//assertion style
const should = chai.should();
chai.use(chaiHttp);
let token = '';
// const userData = {
//     "email": "rekhapatil.1509@gmail.com",
//   "password": "Password@12"
// }




        
    



