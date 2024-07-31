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
  
  .delete(async (req, res) => {
    try {
      await Task.deleteMany()
      res.status(200).json({ message: "All tasks deleted!" })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
// GET PATCH and DELETE singular items
  router.route('/:id')  
  .get(async (req,res) => {
    try {
      // await Task.findById(req.params.id)
      const foundTask = await Task.findById(req.params.id) 
      res.status(200).json(foundTask)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  .patch(async (req, res) => {
    // PATCH logic
    try {
      const task = await Task.findById(req.params.id)

      // if (req.body.name != null) {
      //   task.name = req.body.name
      // }
      // if (req.body.description != null) {
      //   task.description = req.body.description
      // }
      // if (req.body.dueDate != null) {
      //   task.dueDate = req.body.dueDate
      // }
      // if (req.body.completed != null) {
      //   task.completed = req.body.completed
      // }
      // if (req.body.priority != null) {
      //   task.priority = req.body.priority
      // }

      // Better method than using multiple if statements
      Object.keys(req.body).forEach(key => {
        task[key] = req.body[key]
      })

      const updatedTask = await task.save()
      res.json(updatedTask)

    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  .delete(async (req, res) => {
    // DELETE logic
    try {
      await Task.findByIdAndDelete(req.params.id)
      res.json({ message: 'Task deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }  
  })

module.exports = router
