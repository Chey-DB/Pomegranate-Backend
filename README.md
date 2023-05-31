## Installation and Usage
- add an .env file with DB_CONNECTION= and PORT= to add your own database URL and port
- `npm install`
- `npm run setup-db`
- `npm run dev` app will run on port in .env file (http://localhost:3000)

## Endpoints
- GET `/logout`
- GET `/profile/:username`
- POST `/register`
- POST `/login`
