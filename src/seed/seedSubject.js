const Subject = require('~/models/subject')
const logger = require('~/logger/logger')

const SeedSubject = {
  createSubject: async (subject) => {
    try {
      return await Subject.create(subject)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = SeedSubject
