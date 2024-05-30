const userRequestService = require('~/services/userRequest')
const getMatchOptions = require('~/utils/getMatchOptions')

const getUserRequests = async (req, res) => {
  const { id: targetUserId } = req.params
  const { role: targetUserRole, rating, skip, limit } = req.query

  const match = getMatchOptions({ targetUserId, targetUserRole, rating })

  const userRequests = await userRequestService.getUserRequests(match, parseInt(skip), parseInt(limit))

  res.status(200).json(userRequests)
}

const getUserRequestsByUserId = async (req, res) => {
  const { id } = req.params
  const { role } = req.query

  const userRequests = await userRequestService.getUserRequestsByUserId(id, role)

  res.status(200).json(userRequests)
}

const getUserRequestById = async (req, res) => {
  const { id } = req.params

  const userRequest = await userRequestService.getUserRequestById(id)

  res.status(200).json(userRequest)
}

const addUserRequest = async (req, res) => {
  const { id: author } = req.user
  const data = req.body

  const newUserRequest = await userRequestService.addUserRequest(author, data)

  res.status(201).json(newUserRequest)
}

const updateUserRequest = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const { id: currentUserId } = req.user

  await userRequestService.updateUserRequest(id, currentUserId, updateData, res)

  res.status(204).end()
}

const deleteUserRequest = async (req, res) => {
  const { id } = req.params
  const { id: currentUserId } = req.user

  await userRequestService.deleteUserRequest(id, currentUserId, res)

  res.status(204).end()
}

module.exports = {
  getUserRequests,
  getUserRequestsByUserId,
  getUserRequestById,
  addUserRequest,
  updateUserRequest,
  deleteUserRequest
}
