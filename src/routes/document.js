const express = require('express');
const Document = require('../database/models/document')

const router = express.Router();

router.post('/document', (req, res) => {
    if(req.user){
        console.log('this is the body')
        console.log(req.body)
        let document = new Document({name: req.body.name, owner: req.user._id})
        document.save().then((doc) => {
            // res.send(doc)
            res.redirect(`/editor/${doc._id}`)
        })
    }
})

module.exports = router;