const express = require('express')
const router = express.Router()
const interfaceController = require('../controllers/interfaceController')

router.get('/api', (req, res) => {
  res.json({ message: 'v. 0.1.0' })
})

router.get('/api/test', interfaceController.testInterfaceModel)

module.exports = router
