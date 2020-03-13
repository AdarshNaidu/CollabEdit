const express = require('express')
const PORT = process.env.PORT || 3000;

const app = express()

app.get('/', (req, res) => {
    res.send("Hi there")
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})