const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');

const pageRoutes = require('./routes/pageRoutes')
const columnRoutes = require('./routes/columnRoutes')
const authorRoutes = require('./routes/authorRoutes');


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/Columns')
    .then(() => {
        console.log("DB Baglanildi!")
    })
    .catch((err) => {
        console.log("Veritabani hatasi:", err)
    })


//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/Columns' })
}))
app.use('*', (req, res, next)=>{
    userIN = req.session.userID;
    next()
})

//Routes
app.use('/', pageRoutes)
app.use('/columns', columnRoutes)
app.use('/author', authorRoutes)


const port = 3232
app.listen(port, () => {
    console.log(`app started on port ${port}`)
})