const {Router} = require('express')
const router = Router()
const EntertainController = require('../controllers/entertainController')

router.get('/', EntertainController.find)

module.exports = router