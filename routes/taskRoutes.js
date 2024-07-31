// taskRoutes.js
const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.route('/')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find()
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  .post(async (req, res) => {
    const task = new Task({
      // new task object
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed,
      priority: req.body.priority
    })

    try {
      const newTask = await task.save()
      res.status(201).json(newTask)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

router.route('/:id')
  .post(async (req, res) => {
    // POST logic
  })
  .patch((req, res) => {
    // PATCH logic
  })
  .delete((req, res) => {
    // DELETE logic
  })

module.exports = router
