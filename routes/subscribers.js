const express = require('express')
const router = express.Router()
// pull in Subscriber Schema
const Subscriber = require('../models/subscriber')

// setup of RESTful API Routes
// Getting all subscribers
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
    } catch (err) {
        // 500 is a server sided error
        res.status(500).json({ message: err.message })
    }
})
// Creating one sub POST
router.post('/:id', async (req,res) => {
    console.log('Hello World!')
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        // 201 indicates a successful POST request created
        res.status(201).json(newSubscriber)
    } catch (err) {
        // 400 is a user sided error
        res.status(400).json({ message: err.message})
    }
})
// Getting one sub GET
router.post('/', (req,res) => {

})
// Updating one sub PATCH
router.patch('/:id', (req,res) => {

})
// Removing one sub DELETE
router.delete('/:id', (req,res) => {

})

module.exports = router
