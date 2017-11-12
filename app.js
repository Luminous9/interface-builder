const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')

const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json())

app.use('/', routes)

module.exports = app
