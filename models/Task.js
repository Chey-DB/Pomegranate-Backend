const { ObjectId } = require("mongodb")
const client = require("../database/setup")

class Task {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.address = data.address
  }

  static async getAll() {
    await client.connect()
    const response = await client.db("task").collection("task").find()
    const allValues = await response.toArray()
    return allValues
  }

  static async getOne(idx) {
    await client.connect()
    const id = new ObjectId(idx)
    const response = await client.db("task").collection("task").find({
      _id: id,
    })
    const value = await response.toArray()
    const task = new task(value[0])
    task['id'] = id
    return task
  }

  static async create({ name, email, address}) {
    await client.connect()
    const response = await client.db("task").collection("task").insertOne({
      name: name,
      email: email,
      address: address
    })
    return "task created"
  }


  async update({name, email, address}) {
    await client.connect()
    const response = await client
      .db("task")
      .collection("task")
      .updateOne({ _id: this.id }, { $set: { name: name, email: email, address: address} })
    return "task updated"
  }

  async destory() {
    await client.connect()
    const response = await client.db("task").collection("task").deleteOne({ _id: this.id })
    return "task deleted"
  }
}

module.exports = Task
