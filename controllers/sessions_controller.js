const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(err) {
            console.log(err)
            res.send('oops the db had a problem')
        } else if {
            res.send('<a href="/">User Not Found</a')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                console.log('Login Successful');
                res.redirect('/')
        } else {
            res.send('<a href="/">Password Does Not Match</a>')
        }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions
