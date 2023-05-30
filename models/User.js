const { ObjectId } = require('mongodb');
const client = require("../database/setup");
const { v4: uuidv4 } = require("uuid");

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.tasks = data.tasks;
        this.pomodoroCount = data.pomodoroCount;
    }

    //user related methods

    static async getAllUsers() {
        await client.connect();
        const response = await client.db("pomegranate").collection("user").find()
        const users = await response.toArray();
        await client.close();
        return users;
    }

    static async getUserById(id) {
        await client.connect();
        const response = await client.db("pomegranate").collection("user").findOne({ _id: ObjectId(id) });
        const user = new User(response);
        await client.close();
        return user;
    }

    static async getUserByUsername(username) {
        await client.connect();
        const response = await client.db("pomegranate").collection("user").findOne({ username: username });
        const user = new User(response);
        await client.close();
        return user;
    }

    static async createUser(name, username, password) {
        await client.connect();
        const response = await client.db("pomegranate").collection("user").insertOne({ name: name, username: username, password: password, token: "", tasks: [], pomodoroCount: 0 });
        const user = new User(response.ops[0]);
        await client.close();
        return user;
    }


    // task related methods

    static async getTaskByIndex(username, index) {
        await client.connect();
        const response = await client.db("pomegranate").collection("user").find({ username: username }, { tasks: { $slice: [index, 1] } });



    

}

