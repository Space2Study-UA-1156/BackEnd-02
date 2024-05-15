const Subject = require('~/models/subject')
const subjects = require('~/consts/subjects')
const SeedSubject = require('~/seed/seedSubject')
const logger = require('~/logger/logger')

const checkSubjectExistence = async () => {
  try {
    await Promise.all(
      Object.values(subjects).map(async (subject) => {
        const isSubjectExist = await Subject.exists({ name: subject.name })

        if (isSubjectExist) {
          return
        }

        return await SeedSubject.createSubject(subject)
      })
    )
  } catch (err) {
    logger.error(err)
  }
}

module.exports = checkSubjectExistence
