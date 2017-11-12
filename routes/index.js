const express = require('express')
const router = express.Router()

router.get('/api', (req, res) => {
  res.json({ message: 'v. 0.1.0' })
})

module.exports = router
