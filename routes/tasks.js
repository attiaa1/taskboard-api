const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/', async (req, res) => {

})
// Creating one sub POST
router.post('/:id', async (req,res) => {

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