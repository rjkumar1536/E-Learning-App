const randomString = require('random-string')

exports.generateId = string => {
    return string + randomString({length:3,numeric:true,letters:false,special:false})
}