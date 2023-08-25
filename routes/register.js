const express = require('express')
const router = express.Router()
const registercontroller = require('../Controllers/Register/register')

router.post('/', registercontroller)
module.exports = router