const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/CollabEdit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Unable to connect to database")
})

mongoose.set("useCreateIndex", true)