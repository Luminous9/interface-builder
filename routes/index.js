const express = require('express')
const version = require('../package.json').version
const interfaceController = require('../controllers/interfaceController')
const router = express.Router()

router.get('/api', (req, res) => {
  res.json({ message: 'API version: ' + version })
})

router.get('/api/test', interfaceController.testInterfaceModel)

module.exports = router
