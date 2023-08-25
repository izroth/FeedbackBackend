const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

app.use(bodyParser.json());
const registercontroller = require('../Controllers/Register/register')
const logincontroller = require('../Controllers/Register/login')


router.post('/', registercontroller)
router.post('/login', logincontroller)
module.exports = router