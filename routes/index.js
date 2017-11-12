const express = require('express')
const router = express.Router()

router.get('/api', (req, res) => {
  console.log('route hit')
  res.json({ message: 'Connected!' })
})

module.exports = router
