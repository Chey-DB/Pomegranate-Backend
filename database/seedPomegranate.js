const client = require('./setup')

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
        await client.db('task').collection('task').drop()
        //await client.db('settings').collection('settings').drop()
        await client.db('task').collection('task').insertMany([
            { 
                name: "task_1", 
                email: "12345678@gmail.com", 
                address: "london"
            },
            { 
                name: "task_2", 
                email: "12345678@gmail.com", 
                address: "Barking"
            },
            { 
                name: "task_3", 
                email: "12345678@gmail.com", 
                address: "Heathrow"
            }
         ])

        // await client.db('settings').collection('settings').insertMany([
        //     { 
        //         // name: "task_1", 
        //         // email: "12345678@gmail.com", 
        //         // address: "london"
        //     },
        // ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()
