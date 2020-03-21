const express = require('express');
const router = express.Router();

router.get('/editor/:title', (req, res) => {
    res.render('editor', {
        title: req.params.title
    })
})

module.exports = router