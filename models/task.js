const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribedDate: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', taskSchema)
