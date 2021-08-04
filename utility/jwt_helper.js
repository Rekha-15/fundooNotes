// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// class Helper{

//     /**
//  * @description   : creating token using jsonwebtoken module
//  * @param {data} as data which comes from the body of postmen
//  * @module        : jwt
// */
//  generatingToken = (data) => {
//     console.log(data);
//     const token = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET, { expiresIn: '24h' });
//     client.setex('token', 7200, token);
//     return token;
//   };
// }

//  module.exports = new Helper();
