const Pomegrenate = require("../models")

const index = async (req, res) => {
  try {
    const pomegrenate = await Pomegrenate.getAll()
    res.status(200).json({
      "success": true,
      "Pomegrenate": pomegrenate
    })
  } catch (e) {
    res.status(500).json({
      "success": false,
      "message": "Pomegrenate not available right now",
      "error": e,
    })
  }
}

const show = async (req, res) => {
  try {
    const idx = req.params.id
    const pomegrenate = await Pomegrenate.getOne(idx)
    res.status(200).json({
      "success": true,
      "Pomegrenate": pomegrenate
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Pomegrenate not found",
      "error": e,
    })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const result = await Pomegrenate.create(data)
    res.status(201).json({
      "success": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to create new Pomegrenate",
      "error": e,
    })
  }
}

const update = async (req, res) => {
  try {
    const idx = req.params.id
    const data = req.body
    const pomegrenate = await Pomegrenate.getOne(idx)
    const result = await pomegrenate.update(data)
    res.status(200).json({
      "succuess": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to update Pomegrenate",
      "error": e,
    })
  }
}


const destroy = async (req, res) => {
  try {
    const idx = req.params.id
    const pomegrenate = await Pomegrenate.getOne(idx)
    const result = await pomegrenate.destory()
    res.status(204).json({
      "success": true,
      "respose": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to delete Pomegrenate",
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
