const Comment = require('~/models/comment')
const Cooperation = require('~/models/cooperation')
const { createForbiddenError } = require('~/utils/errorsHelper')

const commentService = {
  addComment: async (data) => {
    const { text, author, authorRole, cooperationId } = data

    const { initiator, receiver } = await Cooperation.findById(cooperationId)
    if (author !== initiator.toString() && author !== receiver.toString()) {
      throw createForbiddenError()
    }

    return await Comment.create({ author, cooperation: cooperationId, text, authorRole })
  },

  getComments: async (cooperationId, userId) => {
    const { initiator, receiver } = await Cooperation.findById(cooperationId)
    if (userId !== initiator.toString() && userId !== receiver.toString()) {
      throw createForbiddenError()
    }

    return await Comment.find({ cooperation: cooperationId, author: userId }).exec()
  }
}

module.exports = commentService
