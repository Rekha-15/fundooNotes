/* eslint-disable semi */
/**
 * @description   : It is use create log files for successfull operation as well as for
 *                  failed operation.
 * @package       : winston
 * @file          : user.js
 * @author        : Rekha
*/
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//  displaying logger message in console
 logger.add(new winston.transports.Console({
   format: winston.format.simple()
 }));

module.exports = logger;
