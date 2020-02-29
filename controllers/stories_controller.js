const express = require('express')
const Story = require('../models/stories.js')
const stories = express.Router()

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// New Route
stories.get('/new', isAuthenticated, (req, res) => {
    res.render(
        'stories/new.ejs'
        , {currentUser: req.session.currentUser}
    )
})

// Edit Route
stories.get('/:id/edit', isAuthenticated, (req, res) => {
    Story.findById(req.params.id, (error, foundStory) => {
        res.render('stories/edit.ejs', {
            story: foundStory
            ,currentUser: req.session.currentUser
        })
    })
})

// Delete Route
stories.delete('/:id', isAuthenticated, (req, res) => {
    Story.findByIdAndRemove(req.params.id, (err, deletedStory) => {
        res.redirect('/stories')
    })
})

// Show Route
stories.get('/:id', isAuthenticated, (req, res) => {
    Story.findById(req.params.id, (error, foundStory) => {
        res.render('stories/show.ejs', {
            story: foundStory
            , currentUser: req.session.currentUser
        })
    })
})

// Update Route
stories.put('/:id', isAuthenticated, (req, res) => {
    Story.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedModel) => {
            res.redirect('/stories')
        }
    )
})

// Create Route
stories.post('/', isAuthenticated, (req, res) => {
    Story.create(req.body, (error, createdStory) => {
        res.redirect('/stories')
    })
})

// Index Route
stories.get('/', (req, res) => {
    Story.find({}, (error, allStories) => {
        res.render('stories/index.ejs', {
            stories: allStories
            ,currentUser: req.session.currentUser
        })
    })
})

// Seed Route
stories.get('/setup/seed', isAuthenticated, (req, res) => {
    Story.create(

    )
})

// Drop DB route
stories.get(
    '/dropdatabase/confirm/doubleconfirm',
    (req, res) => {
        Stories.collection.drop()
        res.send('Database successfully dropped!')
    }
)

module.exports = stories
