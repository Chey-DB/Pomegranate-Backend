const request = require('supertest');
const app = require('../app');
const User = require("../models/User");

const userController = require("../controllers/user")


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




    test('should delete a task for a user', async () => {
        const user = await User.createUser({ username: 'testuser', password: 'testpassword' });

        const indexToDelete = 0; 

        const response = await request(app)
        .delete(`/users/${user.username}/tasks/${indexToDelete}`)
        .expect(200);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('tasks');
        expect(response.body.user.tasks.length).toBe(user.tasks.length - 1);

        
        const deletedTask = user.tasks[indexToDelete];
        expect(response.body.user.tasks).not.toContainEqual(deletedTask);
    });




    test('responds to unknown user id with status 404', (done) => {
        request(api)
            .get('/users/lee')
            .expect(404, done)
       
       
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


    test('responds to invalid post /users/register with status 403', async () => {
        const testData = {
            "name": "nure",
            "username": "abey1",
            "password": "abey1" 
}
        const response = await request(api)
            .post('/users/')
            .send(testData)
        expect(response.statusCode).toBe(404);
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
    
    test('responds to invalid post /users/login with status 404', async () => {
        const testData = {
            "username": "lee",
            "password": "abey1"
}
        const response = await request(api)
            .post('/users/')
            .send(testData)
        expect(response.statusCode).toBe(404);    
    })
    



    test('should return the user with the specified username', async () => {
    const user = await User.createUser({name:"nure", username: 'abey', password: 'abey' });

    const response = await request(app)
      .get(`/users/${user.username}`)
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user.username).toBe(user.username);
  });

    test('should return 404 if the user does not exist', async () => {
        const username = 'Fade';

        const response = await request(app)
        .get(`/users/${username}`)
        .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User not found');
    });

})
