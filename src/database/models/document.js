const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    crdt: {
        type: Array,
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
})

const Document = mongoose.model('Document', documentSchema)

module.exports = Document