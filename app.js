//start express
const express = require('express')
const app = express()
const port = 3000
const url='http://localhost:3000/'
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))

//setup middleware
app.use(express.json())
const path = require('path')
const root = path.join(__dirname, 'public')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', require('./routes/static'))
app.use('/api/v1', require('./routes/api/v1/foodtruck'))

