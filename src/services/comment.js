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

    const newComment = await Comment.create({ author, cooperation: cooperationId, text, authorRole })

    return await Comment.findById({ _id: newComment._id })
      .populate('author', 'firstName lastName')
      .select('-authorRole')
      .exec()
  },

  getComments: async (cooperationId, userId) => {
    const { initiator, receiver } = await Cooperation.findById(cooperationId)
    if (userId !== initiator.toString() && userId !== receiver.toString()) {
      throw createForbiddenError()
    }

    return await Comment.find({ cooperation: cooperationId, author: userId })
      .populate('author', 'firstName lastName')
      .select('-authorRole')
      .exec()
  }
}

module.exports = commentService
