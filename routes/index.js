const express = require('express')
const router = express.Router()
const userRoute = require('./users')

router.use('/api/users/', userRoute)

module.exports = router;