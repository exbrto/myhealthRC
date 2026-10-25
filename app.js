import express from 'express';

import medsRoutes from './routes/medsRoutes.js'  // imports routes for anyting that starts with /workouts

import Meds from './models/Meds.js' // imports the model that are stored in the database.

import session from 'express-session'

import passport from 'passport'

import flash from 'connect-flash'

import configurePassport from './config/passport.js'

const app = express();
// const bodyParser = require('body-parser');
// const { MongoClient } = require('mongodb').MongoClient

configurePassport(passport)

app.set('view engine', 'ejs');      // use ejs to build pages, which is also why res.render 'index' knows to find index.ejs

app.set('views', './views');    // looks for ejs files form the view folder

app.use(express.urlencoded({extended: true}));    // reads form data and adds it to req.body, without req.body would be empty when the form is sumbitted

app.use(express.json());    // needed for updates and deletes

app.use(express.static('public'));  // send files to the browswer when the browser asks for it, taken from the public folder like css, browser-side js, and images

app.use(session({secret: 'healthRC'}))

app.use(passport.initialize())

app.use(passport.session())

app.use(flash())

app.use('/prescriptions', medsRoutes)    // this will send req's to the workoutsRoutes file

// mongoose.connect(url, {
// //   require('./app/routes.js')(app, passport, db, ObjectId); 
// }).then(() => {
//     console.log('Connected to the database')
// })

app.get('/', (req, res) => {
    res.render('login', {message: req.flash('loginMessage')})
})

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/medications',
    failureRedirect: '/',
    failureFlash: true
}))

app.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash('signupMessage')})
})

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/medications',
    failureRedirect: '/signup',
    failureFlash: true
}))

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

app.get('/medications', isLoggedIn, async (req, res, next) => {      // will display every workout on the homepage    
    
    try {                                                       // gets every worlkout from the databse and 
        const meds = await Meds.find().sort({dateReceived: -1}) // find then sort returns the data and -1 sorts them by the newest

        res.render('index', {meds}) 
    } catch(error) {
        next(error)
        console.log('Failed to get data')
    }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

export default app  // keep as last line