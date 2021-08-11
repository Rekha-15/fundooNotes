/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : user.js
 * @author        : Rekha Patil
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../logger/user');
const { error } = require('../logger/user');
const user = require('../controllers/user');

const fundooNoteSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});
/**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
 * @middleware      : pre is the middleware of mongoose schema
 * @package         : bcrypt is used to encrpt the password we are getting from client side
*/
fundooNoteSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(this.password, salt);
    this.password = hassedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const FundooNoteModel = mongoose.model('User', fundooNoteSchema);

class Model {
  /**
   * @description     : It is use to create and save a new note in data base.
   * @param           : data, callback
   * @method          : save to save the coming data in data base
  */
  create = async (data, callback) => {
    const note = new FundooNoteModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    const user = await FundooNoteModel.findOne({ email: data.email });
    if (user) {
      logger.error("User already exist", user)
      callback('User already exist');
    } else {
      const userData = await note.save();
      callback(null, userData);
    }
  }

  /**
   * @description     : It uses to login the registered user
   * @param           : data, callback
  */
  login = (data, callback) => {
    FundooNoteModel.findOne(
      { email: data.email },
      (error, user) => {
        if(error) {
          logger.error("Error while finding user", error);
          callback(null, user);
        } else {
          logger.info("User found", user);
          callback(null, user);
        }
      }
    );
  };

  /**
   * @description     : It uses to if a user forgot his/her password so send a mail
   * @param           : data, callback
  */
   forgotPassword = (data, callback) => {
    FundooNoteModel.findOne(
      { email: data.email })
      .then((dataOne) => {
       callback(null, dataOne);
      });
  }

}

//exporting the class        
module.exports = new Model();