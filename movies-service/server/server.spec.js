/* eslint-env mocha */
const server = require('./server')

describe('Server', () => {
  it('should require a port to start', () => {
    return server.start({
      repo: {}
    }).should.be.rejectedWith(/port/)
  })

  it('should require a repository to start', () => {
    return server.start({
      port: 5555
    }).should.be.rejectedWith(/repository/)
  })
})
