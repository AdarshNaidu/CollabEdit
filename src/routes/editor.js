const express = require('express');
const router = express.Router();

router.get('/editor', (req, res) => {
    res.render('editor')
})

module.exports = router