const router = require('express').Router({ mergeParams: true })

const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware } = require('~/middlewares/auth')
const isEntityValid = require('~/middlewares/entityValidation')

const userRequestController = require('~/controllers/userRequest')
const User = require('~/models/user')
const UserRequest = require('~/models/userRequest')

const body = [{ model: User, idName: 'targetUserId' }]
const params = [{ model: UserRequest, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/requests', asyncWrapper(userRequestController.getUserRequestsByUserId))

router.get('/', asyncWrapper(userRequestController.getUserRequests))
router.post('/', isEntityValid({ body }), asyncWrapper(userRequestController.addUserRequest))
router.get('/:id', isEntityValid({ params }), asyncWrapper(userRequestController.getUserRequestById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(userRequestController.updateUserRequest))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(userRequestController.deleteUserRequest))

module.exports = router
