const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, { useMongoClient: true })
mongoose.connection.on('error', err => {
  console.error(`💩💩💩 → ${err.message}`)
})

const app = require('./app')
app.set('port', process.env.PORT || 4000)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
