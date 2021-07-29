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

    /**
   * function to call the getAll function that gets all the data, from the service.js
   * @param {*} req httpRequest
   * @param {*} res httpResponse
   * @returns HTTP status and object
   */
  getAllUsers = (req, res) => {
    try {
      service.getAllUser((err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message: err.message || 'some error occurred',
            })
          : res.status(200).send({
              success: true,
              message: 'Successfully retrieved the employees data',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!',
      });
    }
  };

  /**
   * function to call the getOne function that gets the required employee data,
   * from the service.js
   * @param {*} req httpRequest
   * @param {*} res httpResponse
   * @returns HTTP status and employee object
   */
   getOneUser = (req, res) => {
    const userId = req.params;
    try {
      //calling a function to get the employee with id
      service.getOne(userId, (err, data) => {
        if (!data)
          return res
          //404 error indicates that the webpage you're trying to reach can't be found
            .status(404)
            .send({ success: false, message: 'User not found!' });
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'some error occurred while getting the data',
            })
            //200 error indicates that the success status response
          : res.status(200).send({
              success: true,
              message: 'User retrieved successfully',
              data: data,
            });
      });
    } catch (err) {
        // generic error response, 
        //500 error indicates that, This error is usually returned by the server when no other error code is suitable.
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!',
      });
    }
  };
}
    
//exporting the class
module.exports = new Controller();