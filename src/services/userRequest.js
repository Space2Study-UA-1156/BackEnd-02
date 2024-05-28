const UserRequest = require('~/models/userRequest')
const Category = require('~/models/category')
const filterAllowedFields = require('~/utils/filterAllowedFields')
const { allowedUserRequestFieldsForUpdate } = require('~/validation/services/userRequest')
const { createForbiddenError } = require('~/utils/errorsHelper')

const userRequestService = {
  getUserRequests: async (match, skip, limit) => {
    const count = await UserRequest.countDocuments(match)

    const userRequests = await UserRequest.find(match)
      .populate({ path: 'author', select: ['_id', 'firstName', 'lastName', 'email'] })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec()

    return {
      count,
      userRequests
    }
  },

  getUserRequestsByUserId: async (id) => {
    return await UserRequest.findById(id).lean().exec()
  },

  getUserRequestById: async (id) => {
    return await UserRequest.findById(id)
      .populate({ path: 'author', select: ['_id', 'firstName', 'lastName', 'email'] })
      .lean()
      .exec()
  },

  addUserRequest: async (author, data) => {
    const { new_subject, category, additionalInfo } = data
    let categoryId = null

    const existingCategory = await Category.find({ name: category }).select('_id').lean().exec()
    if (existingCategory.length > 0) {
      categoryId = existingCategory[0]._id
    }

    const userRequest = await UserRequest.create({
      new_subject,
      category: { name: category, id: categoryId },
      additionalInfo,
      author
    })

    return userRequest
  },

  updateUserRequest: async (id, currentUserId, updateData) => {
    const filteredUpdateData = filterAllowedFields(updateData, allowedUserRequestFieldsForUpdate)

    const userRequest = await UserRequest.findById(id).exec()
    const userRequestAuthor = userRequest.author.toString()

    if (currentUserId !== userRequestAuthor) {
      throw createForbiddenError()
    }

    if (filteredUpdateData.category) {
      const existingCategory = await Category.findOne({ name: filteredUpdateData.category }).select('_id').lean().exec()
      filteredUpdateData.category = {
        name: filteredUpdateData.category,
        id: existingCategory ? existingCategory._id : null
      }
    }

    for (const field in filteredUpdateData) {
      if (field === 'category') {
        if (!userRequest.category) {
          userRequest.category = {}
        }
        userRequest.category.name = filteredUpdateData.category.name
        userRequest.category.id = filteredUpdateData.category.id
      } else {
        userRequest[field] = filteredUpdateData[field]
      }
    }

    await userRequest.save()
  },

  deleteUserRequest: async (id, currentUserId) => {
    const userRequest = await UserRequest.findById(id).exec()
    const userRequestAuthor = userRequest.author.toString()

    if (currentUserId !== userRequestAuthor) {
      throw createForbiddenError()
    }
    await UserRequest.findByIdAndRemove(id).exec()
  }
}

module.exports = userRequestService
