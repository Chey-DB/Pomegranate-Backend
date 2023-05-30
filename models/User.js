const { ObjectId } = require('mongodb');
const client = require("../database/setup");
const { v4: uuidv4 } = require("uuid");

class User {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.tasks = data.tasks;
        this.pomodoroCount = data.pomodoroCount;
    }

    // Getter for the user collection
    get userCollection() {
        return client.db("pomegranate").collection("user");
    }

    // Static methods
    static async getAllUsers() {
        try {
            const usersCursor = await this.getUserCollection().find();
            return await usersCursor.toArray();
        } catch (e) {
            console.error("Failed to get all users:", e);
            return [];
        }
    }

    static async getUserById(id) {
        try {
            const user = await this.getUserCollection().findOne({ _id: ObjectId(id) });
            return new User(user);
        } catch (e) {
            console.error(`Failed to get user by id ${id}:`, e);
            return null;
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await this.getUserCollection().findOne({ username: username });
            return new User(user);
        } catch (e) {
            console.error(`Failed to get user by username ${username}:`, e);
            return null;
        }
    }

    static async createUser({ name, username, password }) {
        try {
            const response = await this.getUserCollection().insertOne({ name: name, username: username, password: password, token: "", tasks: [], pomodoroCount: 0 });
            return new User(response.ops[0]);
        } catch (e) {
            console.error("Failed to create user:", e);
            return null;
        }
    }

    // Instance methods
    async getTaskByIndex(index) {
        try {
            const user = await this.userCollection.findOne(
                { _id: this.id }, 
                { projection: { tasks: { $slice: [index, 1] } } }
            );
            return user.tasks[0];
        } catch (e) {
            console.error(`Failed to get task by index for user ${this.username}:`, e);
            return null;
        }
    }
    
    async updateTaskByIndex(index, description, completed, pomodoroCount) {
        try {
            const response = await this.userCollection().updateOne(
                { _id: this.id },
                { $set: { [`tasks.${index}`]: {description, completed, pomodoroCount} } }
            );
            return response.modifiedCount > 0;
        } catch (e) {
            console.error(`Failed to update task by index for user ${this.username}:`, e);
            return false;
        }
    }

    async deleteTaskByIndex(index) {
        try {
            const response = await this.userCollection().updateOne(
                { _id: this.id },
                { $unset: { [`tasks.${index}`]: 1 }, $pull: { tasks: null } }
            );
            return response.modifiedCount > 0;
        } catch (e) {
            console.error(`Failed to delete task by index for user ${this.username}:`, e);
            return false;
        }
    }

    async updatePomodoroCount() {
        try {
            const response = await this.userCollection().updateOne(
                { _id: this.id },
                { $inc: { pomodoroCount: 1 } }
            );
            return response.modifiedCount > 0;
        } catch (e) {
            console.error(`Failed to update pomodoro count for user ${this.username}:`, e);
            return false;
        }
    }

    async getToken() {
        const user = await User.getUserByUsername(this.username);
        if (user) {
          this.token = user.token;
        }
        return this.token;
    }

    async createToken() {
        const token = uuidv4();
        const success = await User.updateToken(this.username, token);
        if (success) {
          this.token = token;
        }
        return success;
    }

    async updateToken(token) {
        try {
            const response = await this.userCollection().updateOne(
                { _id: this.id },
                { $set: { token: token } }
            );
            return response.modifiedCount > 0;
        } catch (e) {
            console.error(`Failed to update token for user ${this.username}:`, e);
            return false;
        }
    }

    async deleteToken() {
        const success = await User.deleteToken(this.username);
        if (success) {
            this.token = null;
        }
        return success;
    }
}

module.exports = User;
