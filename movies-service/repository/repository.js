/**
 *  repository.js
 */
'use strict'

/**
 *  Factory, that holds an open connection to the db and exposes function to do I/O with database
 */

const repository = (db) => {
  const collection = db.collection('movies')

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const cursor = collection.find({}, { title: 1, id: 1 })

      const addMovie = (movie) => {
        movies.push(movie)
      }

      const sendMovies = (err) => {
        if (err) {
          return reject(new Error(`An error occured fetching all movies, err: ${err}`))
        }
        return resolve(movies.slice())
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  const getMoviePremieres = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }

      const cursor = collection.find(query)

      const addMovie = (movie) => {
        movies.push(movie)
      }

      const sendMovies = (err) => {
        if (err) {
          return reject(new Error('An error occured fetching all movies, err:' + err))
        }
        return resolve(movies)
      }

      cursor.forEach(addMovie, sendMovies)
    })
  }

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendMovie = (err, movie) => {
        if (err) {
          return reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        return resolve(movie)
      }

      collection.findOne({ id: id }, projection, sendMovie)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllMovies,
    getMoviePremieres,
    getMovieById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      return reject(new Error('connection db not supplied'))
    }
    return resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
