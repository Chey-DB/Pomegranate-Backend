const Task = require("../models")

const index = async (req, res) => {
  try {
    const task = await Task.getAll()
    res.status(200).json({
      "success": true,
      "Task": task
    })
  } catch (e) {
    res.status(500).json({
      "success": false,
      "message": "Task not available right now",
      "error": e,
    })
  }
}

const show = async (req, res) => {
  try {
    const idx = req.params.id
    const task = await Task.getOne(idx)
    res.status(200).json({
      "success": true,
      "Task": task
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Task not found",
      "error": e,
    })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const result = await Task.create(data)
    res.status(201).json({
      "success": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to create new Task",
      "error": e,
    })
  }
}

const update = async (req, res) => {
  try {
    const idx = req.params.id
    const data = req.body
    const task = await Task.getOne(idx)
    const result = await task.update(data)
    res.status(200).json({
      "succuess": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to update Task",
      "error": e,
    })
  }
}


const destroy = async (req, res) => {
  try {
    const idx = req.params.id
    const task = await Task.getOne(idx)
    const result = await task.destory()
    res.status(204).json({
      "success": true,
      "respose": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to delete Task",
      "error": e,
    })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
