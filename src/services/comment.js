const Comment = require('~/models/comment')

const commentService = {
  addComment: async (data) => {
    const { text, author, authorRole, cooperationId } = data

    const newComment = await Comment.create({ author, cooperation: cooperationId, text, authorRole })

    return await Comment.findById({ _id: newComment._id })
      .populate('author', 'firstName lastName')
      .select('-authorRole')
      .exec()
  },

  getComments: async (cooperationId, userId) => {
    return await Comment.find({ cooperation: cooperationId, author: userId })
      .populate('author', 'firstName lastName')
      .select('-authorRole')
      .exec()
  }
}

module.exports = commentService
