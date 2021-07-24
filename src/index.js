const express = require('express')
const path = require('path')
const hbs = require('hbs');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const editorRouter = require('./routes/editor');
const documentRouter = require('./routes/document')
// const Document = require('./database/models/document')

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
app.use(editorRouter)
app.use(documentRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

const listener = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})

module.exports = listener

require('./lib/collab')


// const myFunc = async() => {
//     let doc = {
//         name: 'doc',
//         crdt: [
//             {
//                 siteId: 'ajds',
//                 value: 'i',
//                 count: 2
//             },
//             {
//                 siteId: 'akd',
//                 value: 'j',
//                 count: 4
//             }
//         ],
//     }

//     try{
//     const entry = await Document.find({_id: '5e767b3101ad973f08342575'})
//     // entry.select
//     // entry.crdt = doc.crdt
//     // await entry.save()
//     console.log('entry is this')
//     console.log(entry)
//     }catch(e){
//         console.log(e)
//     }
// }

// myFunc()