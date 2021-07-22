const router = require('express').Router()
const userHandler = require('../handlers/user')

router.get('/',userHandler.getUser)

router.post('/', userHandler.addUser)

router.patch('/', userHandler.updateUser)

router.delete('/', userHandler.deleteUser)


module.exports = router