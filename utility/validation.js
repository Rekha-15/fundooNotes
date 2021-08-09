/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

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

/**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data which comes from the body of postman
 * @module        : jwt
*/
const generatingToken = (data) => {
  const token = jwt.sign({ email: data.email, password: data.password }, process.env.SECRET, { expiresIn: '24h' })
  return token
}

/**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
// eslint-disable-next-line no-unused-vars
const verifyingToken = (req, res, next) => {
  try {
    const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET)
    get('token', (err, result) => {
      if (err) throw err
      if (req.headers.token === result) {
        req.userData = tokenVerification
        const userId = tokenVerification.id
        req.userId = userId
      }
      next()
    })
  } catch (err) {
    res.status(401).send({
      err: 'Unauthorized user'
    })
  }
}

/**
 * @description   : sending an email through nodemailer
 * @module        : nodemailer, ejs
 * @file          : helper.js
*/
const sendingEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
}

module.exports = {
  authSchema,
  userLoginDetails,
  generatingToken,
  verifyingToken,
  sendingEmail
}
