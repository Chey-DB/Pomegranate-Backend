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


//     test('responds to post /user/register with status 201', (done) => {
//         const testData = {
//             "name": "nuru",
//             "username": "abey",
//             "password": "abey"
// }
//         request(api)
//             .post('/user/register')
//             .send(testData)
//             .set('Accept', 'application/json')
//             .expect(201)
//             .expect({ ...testData, id:7 }, done)
//     })
    
    
})
