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

    
        // Helper method to get the user collection
        static getUserCollection() {
          return client.db("pomegranate").collection("user");
        }

        //user related methods      
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
      
        static async createUser(name, username, password) {
          try {
            const response = await this.getUserCollection().insertOne({ name: name, username: username, password: password, token: "", tasks: [], pomodoroCount: 0 });
            return new User(response.ops[0]);
          } catch (e) {
            console.error("Failed to create user:", e);
            return null;
          }
        }

        static async getTaskByIndex(username, index) {
            try {
              const user = await this.getUserCollection().findOne(
                { username: username }, 
                { projection: { tasks: { $slice: [index, 1] } } }
              );
              return user.tasks[0];
            } catch (e) {
              console.error(`Failed to get task by index for user ${username}:`, e);
              return null;
            }
          }
        
          static async updateTaskByIndex(username, index, description, completed, pomodoroCount) {
            try {
              const response = await this.getUserCollection().updateOne(
                { username: username },
                { $set: { [`tasks.${index}`]: {description, completed, pomodoroCount} } }
              );
              return response.modifiedCount > 0;
            } catch (e) {
              console.error(`Failed to update task by index for user ${username}:`, e);
              return false;
            }
          }
        
          static async deleteTaskByIndex(username, index) {
            try {
              const response = await this.getUserCollection().updateOne(
                { username: username },
                { $unset: { [`tasks.${index}`]: 1 }, $pull: { tasks: null } }
              );
              return response.modifiedCount > 0;
            } catch (e) {
              console.error(`Failed to delete task by index for user ${username}:`, e);
              return false;
            }
          }
        }


        

      