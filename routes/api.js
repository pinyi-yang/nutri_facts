const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You access the protected API route'});
});

module.exports = router;