const router = require('express').Router()
const dateHandler = require('../handlers/date')

router.get('/',dateHandler.getDate)

router.post('/', dateHandler.addDate)


module.exports = router