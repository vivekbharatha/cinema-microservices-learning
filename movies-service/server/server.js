'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const movieAPI = require('../api/movies')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      return reject(new Error('Server should start with connected repository'))
    }
    if (!options.port) {
      return reject(new Error('Server should start with available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wrong!, err: ${err}`))
      return res.status(500).send('Something went wrong!')
    })

    movieAPI(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })
