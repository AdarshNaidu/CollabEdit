const express = require('express');
const router = express.Router();
const Document = require('../database/models/document')

router.get('/editor/:title', async (req, res) => {
    if(req.params.title.match(/^[0-9a-fA-F]{24}$/)){
        const document = await Document.findById(req.params.title)
        res.render('editor', {
            title: req.params.title,
            name: document.name
        })
    }else {
        res.render('editor', {
            title: req.params.title
        })
    }
})

router.get('/editor/:user/:title', (req, res) => {
    if(req.user){
        res.render('editor', {
            title: req.params.title,
            user: req.params.user
        })
    }
})

module.exports = router