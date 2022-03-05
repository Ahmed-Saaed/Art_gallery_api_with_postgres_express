# Storefront Backend Project

a Node and Express api that provide a crud system / dashboard for postgres `gallery` database

## Getting Started(run)

- npm install
- npm run start
- db-migrate up

## Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- typescript

### dotenv variables (for the reviewer)

- POSTGRES_HOST = 127.0.0.1
- POSTGRES_USER = postgres
- POSTGRES_DB = gallery
- POSTGRES_TEST_DB = full_stack_test
- POSTGRES_PASSWORD = password123
- ENV = dev
- BCRYPT_PASSWORD = 5m@Rt
- SALT_ROUNDS = 10
- TOKEN_SECRET = Art-sou1

routes' verbs and paths in : [`REQUIREMENTS.md`](./REQUIREMENTS.md)
