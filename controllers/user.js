/**
 * @description   : It is use to taking the request from the client and gives the response 
 * @file          : user.js
 * @author        : Rekha
*/

// Importing from service.js
const services = require('../service/user');

class Controller {
  
  /**
   * @description   : creates an note in fundooNote
   * @param {*} req httpRequest
   * @param {*} res httpResponse
   */
  create = (req, res) => {
    
      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        email: req.body.email,
        password: req.body.password,
      };
      services.create(userDetails, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'created successfully',
        });
      });
    } 
}
    
//exporting the class
module.exports = new Controller();