/**************************************************************************************************************
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : validation.js
 * @author        : Rekha R Patil [rekhapatil.1509@gmail.com]
*****************************************************************************************************************/
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const ejs = require('ejs')
const logger = require('../logger/user')
const bcrypt = require('bcrypt')

/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
const authSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),

  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),

  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
    .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
})

const userLoginDetails = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?'))
    .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
})

const notesCreationValidation = Joi.object({
  title: Joi.string()
    .required(),

  description: Joi.string()
    .required(),
});


const labelValidation = Joi.object({
  labelName: Joi.string()
  .required(),
});



const addingRemovingLabelValidation = Joi.object({
  notesId: Joi.string()
  .required(),

  labelId: Joi.string()
  .required(),
});

/**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data which comes from the body of postmen
 * @module        : jwt
*/
 const generatingToken = (data) => {
   console.log(data)
   return jwt.sign({ data }, process.env.SECRET, { expiresIn: '24h' })
 }

bcryptAuthentication = (loginPassword, databasePassword) => {
  let result = bcrypt.compareSync(loginPassword, databasePassword)
  return (loginPassword && databasePassword) ? result : false;
}

/**
* @description function checks and validates the user token and authorises only if token is correct
* @param {*} req
* @param {*} res
* @param {*} next
* @returns
*/

const verifyingToken = (req, res, next) => {
  let token = req.get('token')
  try {
    if (token) {
      jwt.verify(token, process.env.SECRET, error => {
        if (error) {
          return res.status(400).send({ success: false, message: 'Invalid Token' })
        } else {
          next()
        }
      })
    } else {
      return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' })
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Something went wrong!' })
  }
}

verifyToken = (token)=>{
  const data = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
  if(data){
      return data;
  }
  else{
     return "couldnt verify" ;
  }
}

/**
 * @description   : sending an email through nodemailer
 * @module        : nodemailer, ejs
 * @file          : validation.js
*/
const sendingEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  ejs.renderFile('view/sendEmail.ejs', (error, result) => {
    if (error) {
      logger.log('error', error)
    } else {
      const message = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Re: Reset your password', 
        html: `${result} <p>${process.env.PASSWORD_URL}${generatingToken(data)}</p>`
       // html: `${result}<button><a href="${process.env.PASSWORD_URL}${generatingToken(data)}">Click here</a></button>`
      }

      transporter.sendMail(message, (err, info) => {
        const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info)
        return sendEmailInfo
      })
    }
  })
}

getEmailFromToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET)
  return decoded.email
}

module.exports = {
  authSchema,
  userLoginDetails,
  generatingToken,
  verifyingToken,
  verifyToken,
  sendingEmail,
  getEmailFromToken,
  notesCreationValidation,
  labelValidation,
  addingRemovingLabelValidation,
  bcryptAuthentication
}
