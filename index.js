const express = require('express')
const app = express()
const port = 3000
require('./db/db')  
app.use(express.json())
const register = require('./routes/register')



app.use('/register', register)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)
