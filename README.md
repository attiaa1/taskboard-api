## Instructions on how to run this application
- Clone this repo to your local machine
- Using Node, install all relevant packages via the command line
```npm install```
- Start up the containerized mongodb service via the docker-compose.yaml file in the repository
```docker compose up -d```
- Create a .env file with the following variables to be used via the API server to communicate with the database
```bash
    DATABASE_URL='mongodb://test:test@localhost:27017/subscribers?authSource=admin'
    PORT='5000' # Will default to 5000 if not defined in your .env file
    JWT_SECRET = '' # I would use something like 'openssl rand -hex 64' to generate a secure random key here
```
- Run nodemon to start serving at the specified port
``` npm run dev ```

My recommendation is to use a program like Postman or use your OS package manager to install httpie for CLI based HTTP requests.
