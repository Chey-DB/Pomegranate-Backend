const { ObjectId } = require('mongodb');
const client = require("../database/setup");
const { v4: uuidv4 } = require("uuid");

function getUserCollection() {
    return client.db("pomegranate").collection("user");
}

class User {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.tasks = data.tasks;
        this.pomodoroCountTotal = data.pomodoroCountTotal;
    }


    // Static methods
    static async getAllUsers() {
        try {
            const usersCursor = await getUserCollection().find();
            const allUsers = await usersCursor.toArray();
            return allUsers.map((user) => new User(user));
        } catch (e) {
            console.error("Failed to get all users:", e);
            return [];
        }
    }

    static async getUserById(idx) {
        try {
            const id = new ObjectId(idx);
            const response = await getUserCollection().findOne({ _id: id });
            const user = new User(response);
            user["id"] = id
            return user;
        } catch (e) {
            console.error(`Failed to get user by id ${id}:`, e);
            return null;
        }
    }

    static async getUserByUsername(username) {
        try {
            const response = await getUserCollection().findOne({ username: username });
            const user = new User(response);
            return user;
        } catch (e) {
            console.error(`Failed to get user by username ${username}:`, e);
            return null;
        }
    }

    static async createUser({ name, username, password }) {
        try {
          const response = await getUserCollection().insertOne({ 
            name: name,
            username: username, 
            password: password, 
            token: "", 
            tasks: [], 
            pomodoroCountTotal: 0 
        });
          console.log(response)
          return "Account created successfully!"
        } catch (e) {
            console.error("Failed to create user:", e);
            return null;
        }
    }

    // Instance methods
    async getAllTasks() {
        try {
            const user = await getUserCollection().findOne({ _id: this.id });
            return user.tasks;
        } catch (e) {
            console.error(`Failed to get all tasks for user ${this.username}:`, e);
            return [];
        }
    }

    async addTask(description) {
        try {
            const response = await getUserCollection().updateOne(
                { username: this.username },
                { $push: { tasks: { description, completed: false, pomodoroCount: 0 } } }
            );
            console.log(response);
            return response.modifiedCount > 0;
            
        } catch (e) {
            console.error(`Failed to add task for user ${this.username}:`, e);
            return false;
        }
    }

    async getTaskByIndex(index) {
        try {
            const user = await getUserCollection.findOne(
                { username: this.username }, 
                { projection: { tasks: { $slice: [index, 1] } } }
            );
            return user.tasks[0];
        } catch (e) {
            console.error(`Failed to get task by index for user ${this.username}:`, e);
            return null;
        }
    }
    
    async updateTaskByIndex( index, description, completed, pomodoroCount ) {
        try {
            const response = await getUserCollection().updateOne(
                { username: this.username },
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
            const user = await getUserCollection().findOne({ _id: this.id });
    
            if (!user || !user.tasks) {
                console.error(`User ${this.username} not found or has no tasks.`);
                return false;
            }
    
            if (index < 0 || index >= user.tasks.length) {
                console.error(`Invalid index ${index} for user ${this.username}.`);
                return false;
            }
    
            // Remove the task at the specified index.
            user.tasks.splice(index, 1);
    
            const response = await getUserCollection().updateOne(
                { _id: this.id },
                { $set: { tasks: user.tasks } }
            );
    
            return response.modifiedCount > 0;
        } catch (e) {
            console.error(`Failed to delete task by index for user ${this.username}:`, e);
            return false;
        }
    }
    

    async updatePomodoroCount() {
        try {
            const response = await getUserCollection().updateOne(
                { _id: this.id },
                { $inc: { pomodoroCountTotal: 1 } }
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

    async createToken(username) {
        const token = uuidv4();
        const response = await getUserCollection().updateOne(
            { username: username });
        success = response.updateToken(token);
        console.log(success);
        if (success) {
          this.token = token;
        }
        return success;
    }

    async updateToken(token) {
        try {
            const response = await getUserCollection().updateOne(
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
        const success = await User.getUserByUsername(this.username);
        if (success) {
            this.token = null;
        }
        return success;
    }
}

module.exports = User;
