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

router.get('/document', async (req, res) => {
    if(req.user){
        const documents = await Document.find({owner: req.user._id})
        // console.log(documents)
        res.send(documents)
    }
})

router.get('/document/delete/:id', async(req, res) => {
    if(req.user){
        const document = await Document.findById(req.params.id)
        console.log('found')
        if(document.owner.equals(req.user._id)){
            res.send(await Document.findByIdAndDelete(req.params.id))
        }else res.send('invalid')
    }
})

module.exports = router;