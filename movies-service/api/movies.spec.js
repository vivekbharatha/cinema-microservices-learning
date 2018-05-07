/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Movies API', () => {
  let app = null
  let testMovies = [
    {
      id: '3',
      title: 'Movie 3',
      format: 'IMAX',
      releaseYear: 2018,
      releaseMonth: 1,
      releaseDay: 20
    },
    {
      id: '4',
      title: 'Resident Evil: Capitulo Final',
      format: 'IMAX',
      releaseYear: 2017,
      releaseMonth: 1,
      releaseDay: 27
    },
    {
      id: '1',
      title: 'Assasins Creed',
      format: 'IMAX',
      releaseYear: 2017,
      releaseMonth: 1,
      releaseDay: 6
    }
  ]
})
