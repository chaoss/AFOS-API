# AFOS-API
This is the backend API for the African Open Source(AFOS) project. AFOS is a platform that showcases open source projects from Africa and provides a platform for developers to showcase their skills.


## Architecture
This is a monorepo that contains the backend API for the AFOS project. The backend API is built using Node.js, Express, and MySQL. The backend API is responsible for handling all the requests from the frontend. Tools and technologies used in this project include:
- [Node.js](https://nodejs.org/en): A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/): A web application framework for Node.js.
- [MySQL](https://www.mysql.com/): A relational database management system.
- [Sequelize](https://sequelize.org/):  A promise-based Node.js ORM for MySQL.
- [JWT](https://jwt.io/): A JSON Web Token library for node.js.
- [Zod](https://zod.dev/): A TypeScript-first schema validation library.
- [Nodemailer](https://nodemailer.com/): A module for Node.js applications to allow easy as cake email sending.
- [Docker](https://www.docker.com/):  A platform for developers and sysadmins to build, ship, and run distributed applications.
- [Jest](https://jestjs.io/): A delightful JavaScript Testing Framework with a focus on simplicity.

<iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://lucid.app/documents/embedded/df3c603a-4708-49c5-aadc-82f0e5bceb53" id="Z0mocPZHb6tw"></iframe>


## Database Diagram
This is the database diagram for the AFOS project. The database is built using MySQL. The schema diagram below shows the tables in the database and the relationships between them.
<iframe width="640" height="480" src='https://dbdiagram.io/e/67299654e9daa85aca52308f/6729965ee9daa85aca52316f'> </iframe>

## How to setup project
- Clone the repository.
- Run `npm install` to install all dependencies.
- Create a `.env` file in the root directory and copy the contents of `.env.example` into it. Fill the variables with the required values.
- Run `npm run dev` to start the server.

## How to run tests
- Run `npm run test` to run all tests.
- Run `npm run test:watch` to run all tests in watch mode.
- Run `npm run test:coverage` to run all tests and generate a coverage report.

## Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request. Make sure to follow the [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.