# sinister-6-backend
The backend of our revision App

## Installation and Usage
- add an .env file with DB_CONNECTION= and PORT= to add your own database URL and port
- `npm install`
- `npm run setup-db`
- `npm run dev` app will run on port in .env file (http://localhost:3000)

## Endpoints
[x]1.A user should be able to view all their tasks and pomodoroCount
GET - :username

[x]2. A user should be able to view the leaderboard
GET - users

[x]3.A user should be able to register
POST - register


[x]4.A user should be able to login
POST - login


[x]5.A user should be able to update a task
PATCH - :username/tasks/:index


[x]6.A user should be able to delete a task
DELETE - :username/tasks/:index

[x]7.A user should be able to logout
DELETE - :username

[x]8.A user should be able to add a task
POST - :username/tasks/:index

[x]9. A user should be able to have their pomodoroCount updated
PATCH - :username/pomodoroCount




