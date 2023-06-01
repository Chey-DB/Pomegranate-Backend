const request = require('supertest');
const app = require('../app');

// jest.setTimeout(10000);

describe('app server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('responds to get / with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test('responds to invalid post method request with 404', (done) => {
        request(api)
            .post('/')
            .expect(404, done)
    })


    // test('responds to delete /users/:username with status 404', async (done) => {
    //     await request(api)
    //         .delete('/users/abey')
    //         .expect(200, done)
       
    // })

    test('responds to unknown user id with status 404', (done) => {
        request(api)
            .get('/users/lee')
            .expect(404, done)
            // .expect({ error: "This user does not exist"}, done)
       
    })


    test('responds to post /users/register with status 201', async () => {
        const testData = {
            "name": "nure",
            "username": "abey1",
            "password": "abey1"
}
        const response = await request(api)
            .post('/users/register')
            .send(testData)
        expect(response.statusCode).toBe(201);
    })



      test('responds to post /users/login with status 200', async () => {
        const testData = {
            "username": "abey1",
            "password": "abey1"
}
        const response = await request(api)
            .post('/users/login')
            .send(testData)
        expect(response.statusCode).toBe(200);    
      })
    
    test('responds to invalid post /users/login with status 200', async () => {
        const testData = {
            "username": "lee",
            "password": "abey1"
}
        const response = await request(api)
            .post('/users/login')
            .send(testData)
        expect(response.statusCode).toBe(200);    
    })
    
    
})
