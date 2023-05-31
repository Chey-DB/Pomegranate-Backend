# sinister-6-backend
The backend of our revision App



localhost:3000/

[]1.A user should be able to view all their tasks and pomodoroCount
GET - :username
---> Return user document to be manipulated in view

2. A user should be able to view the leaderboard
GET - users

[x]3.A user should be able to register
POST - register


[x]4.A user should be able to login
POST - login


[]5.A user should be able to update a task
PATCH - :username/tasks/:index


[]6.A user should be able to delete a task
DELETE - :username/tasks/:index

[]7.A user should be able to logout
DELETE - :username

[]8.A user should be able to add a task
POST - :username/tasks/:index

[]9. A user should be able to have their pomodoroCount updated
PATCH - :username/pomodoroCount
