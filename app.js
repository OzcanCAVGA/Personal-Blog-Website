const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

const pageRoutes = require('./routes/pageRoutes')
const columnRoutes = require('./routes/columnRoutes')
const authorRoutes = require('./routes/authorRoutes');


const app = express();
require('dotenv').config();
//Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`DB Baglanildi!`)
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
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next()
})
app.use(methodOverride('_method'));

//Routes
app.use('/', pageRoutes)
app.use('/columns', columnRoutes)
app.use('/author', authorRoutes)


const port = process.env.PORT || 3232

app.listen(port, () => {
    console.log(`app started on port ${port}`)
})