const express = require('express')
const path = require('path')
const hbs = require('hbs');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

require('./database/database')

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views');

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(userRouter)


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})