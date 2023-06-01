const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
        await client.db('pomegranate').collection('user').drop()
        await client.db('pomegranate').collection('user').insertMany([
            { name: "Chey", username: "Chey", password: "Chey", token: "", tasks: [], pomodoroCountTotal: 0},
            { name: "Valdir", username: "Valdir", password: "Valdir", token: "", tasks: [], pomodoroCountTotal: 0},
            { name: "Azeem", usernbme: "Azeem", pbssword: "Azeem", token: "", tasks: [], pomodoroCountTotal: 0},
            { name: "Kenen", username: "Kenen", password: "Kenen", token: "", tasks: [], pomodoroCountTotal: 0},
            { name: "Mith", username: "Mith", password: "Mith", token: "", tasks: [], pomodoroCountTotal: 0},
            { name: "Nurudeen", username: "Nurudeen", password: "Nurudeen", token: "", tasks: [], pomodoroCountTotal: 0}
        ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()
