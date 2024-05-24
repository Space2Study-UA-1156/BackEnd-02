const fs = require('fs')
const path = require('path')
const { createError } = require('~/utils/errorsHelper')
const { FILE_ALREADY_EXISTS, INVALID_BASE64_FORMAT, INVALID_FILE_TYPE } = require('~/consts/errors')
const {
  config: { SERVER_URL }
} = require('~/configs/config')

const AVATARS_FOLDER_PATH = path.join(process.cwd(), 'avatars')

const avatarService = {
  saveAvatar: async (base64String, userId) => {
    const userFolderPath = path.join(AVATARS_FOLDER_PATH, userId)

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true })
    }

    const mimeTypeMatch = base64String.match(/^data:(image\/\w+);base64,/)

    if (!mimeTypeMatch) {
      throw createError(400, INVALID_BASE64_FORMAT)
    }

    const mimeType = mimeTypeMatch[1]
    const extension = mimeType.split('/')[1]

    if (!['png', 'jpeg', 'jpg'].includes(extension)) {
      throw createError(415, INVALID_FILE_TYPE)
    }

    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
    const fileName = `avatar.${extension}`
    const filePath = path.join(userFolderPath, fileName)
    const binaryData = Buffer.from(base64Data, 'base64')

    if (fs.existsSync(filePath)) {
      throw createError(409, FILE_ALREADY_EXISTS)
    }

    fs.writeFileSync(filePath, binaryData)

    return `${SERVER_URL}/avatars/${userId}/${fileName}`
  },

  deleteAvatar: async (avatarUrl, userId) => {
    const urlParts = avatarUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]

    const filePath = path.join(AVATARS_FOLDER_PATH, `${userId}/${fileName}`)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}

module.exports = avatarService
