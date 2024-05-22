const allowedUserFieldsForUpdate = {
  photo: true,
  firstName: true,
  lastName: true,
  address: {
    country: true,
    city: true
  },
  professionalSummary: true,
  mainSubjects: true,
  nativeLanguage: true,
  spokenLanguages: true,
  appLanguage: true,
  FAQ: true
}

module.exports = {
  allowedUserFieldsForUpdate
}
