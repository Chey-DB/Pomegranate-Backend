const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
        // await client.db('pomegranate').collection('user').drop()
        await client.db('pomegranate').collection('user').insertMany([
            { name: "Chey", username: "Chey", password: "Chey", token: "", tasks: [], pomodoroCount: 0},
            { name: "a", username: "a", password: "a", token: "", tasks: [], pomodoroCount: 0},
            { name: "b", usernbme: "b", pbssword: "b", token: "", tasks: [], pomodoroCount: 0},
            { name: "c", username: "c", password: "c", token: "", tasks: [], pomodoroCount: 0},
            { name: "d", username: "d", password: "d", token: "", tasks: [], pomodoroCount: 0}
        ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()
