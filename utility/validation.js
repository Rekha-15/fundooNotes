/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const ejs = require('ejs')
const logger = require('../logger/user')

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
 * @param {data} as data which comes from the body of postmen
 * @module        : jwt
*/
const generatingToken = (data) => {
  console.log(data)
  const token = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET, { expiresIn: '24h' })
  return token
}

/**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
const verifyingToken = (req, res, next) => {
  const token = req.get('token')
  return (token)
    ? jwt.verify(token, process.env.SECRET, error => {
      return (error) ? res.status(400).send({ success: false, message: 'Invalid Token' }) : next()
    })
    : res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' })
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

  ejs.renderFile('view/sendEmail.ejs', (error, result) => {
    if (error) {
      logger.log('error', error)
    } else {
      const message = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Re: Reset your password',
        html: `${result}<button><a href="${'https://localhost:4200/resetPassword/'}${generatingToken(data)}">Click here</a></button>`

      }

      transporter.sendMail(message, (err, info) => {
        const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info)
        return sendEmailInfo
      })
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
