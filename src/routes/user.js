const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../database/models/user')

const router = express.Router();

router.use(session({
    secret: "privatekey",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());



//Endpoint for registering a new user
router.post('/users', (req, res) => {
    User.register({name: req.body.name, email: req.body.email}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.status(500).send(err.message);
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/');
            })
        }
    })
})


//Endpoint for logging in users
router.post('/users/login', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
            res.status(500).send(err.message);
        }else{
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login'
            })(req, res, function(){
                res.redirect('/');
            })
        }
    })
})


//Endpoint for user logout
router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;