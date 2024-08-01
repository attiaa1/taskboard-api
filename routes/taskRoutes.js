// taskRoutes.js
const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.route('/')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user.id })
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
      priority: req.body.priority,
      userId: req.user.id
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
      await Task.deleteMany({ userId: req.user.id })
      res.status(200).json({ message: "All tasks deleted!" })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
// GET PATCH and DELETE singular items
router.route('/:id')
.get(async (req, res) => {
  try {
    const foundTask = await Task.findOne({ _id: req.params.id, userId: req.user.id }); // Check ownership
    if (!foundTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(foundTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})
.patch(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id }); // Check ownership
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.keys(req.body).forEach(key => {
      task[key] = req.body[key];
    });

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
.delete(async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // Check ownership
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;