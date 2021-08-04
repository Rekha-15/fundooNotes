/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Rekha Patil
*/
const controller = require('../controllers/user')

module.exports = (app) => {
  app.post('/registration', controller.create)

  app.post('/login', controller.login)
}
