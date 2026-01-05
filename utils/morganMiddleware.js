'use strict'

const morgan = require('morgan')
const Logger = require('./logger')

var stream = {
  write: function (message) {
    return Logger.http(message.substring(0, message.lastIndexOf('\n')))
  }
}
var morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: stream }
)

module.exports = morganMiddleware
