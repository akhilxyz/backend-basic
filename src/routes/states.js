const router = require('express').Router()
const statesHandler = require('../handlers/state')

router.get('/',statesHandler.getStates)

router.post('/', statesHandler.addStates)


module.exports = router