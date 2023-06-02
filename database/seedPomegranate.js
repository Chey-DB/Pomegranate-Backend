const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
        await client.db('pomegranate').collection('user').drop()
        await client.db('pomegranate').collection('user').insertOne({})
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()
