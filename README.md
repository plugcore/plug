 
# Plugcore Framework
 
![plugcore.com](_docs/logo.png?raw=true "plugcore.com")
 
The target of this framework is to help in all the needs of a full featured API REST, from top to bottom, and at the same time having the best possible performance and security.
 
Internally uses a custom dependency injection system to help with with the project architecture, and all the related modules such as API creation, database connection, etc, is integrated with this system. The dependency injector uses Typescript classes and decorators.
 
The API implementation is based on [Fastify](https://www.fastify.io/) in order to create a lightweight server, and at the moment it only has a [MongoDB](https://www.mongodb.com) connector as a database implementation, but support for other databases is on the way.
 
You can [read all the documentation at our Github Wiki](https://github.com/plugcore/plug/wiki).
 
You are currently in the __English__ version of this document, it's also available in the following languages: 
- [Español](https://github.com/plugcore/plug/blob/master/README.es.md) 
 
## Modules
 
Currently it's divided in 3 focused modules:
- [@plugcore/core](https://www.npmjs.com/package/@plugcore/core): Contains the core functionalities such as the dependency injector, logs, object validator and mapping, tests framework, cli, project configuration, etc.
- [@plugcore/web](https://www.npmjs.com/package/@plugcore/web): Adds all the needed libraries to publish a REST API
- [@plugcore/ds-mongodb](https://www.npmjs.com/package/@plugcore/ds-mongodb): MongoDB connector integrated the dependency injection and configuration systems.
 
## Installation
 
The easiest way to start is to initialize the framework in a folder, usually a recently create GIT Repository that has been cloned:
 
```
mkdir myproject
- or -
git clone https://server.com/git/myproject.git
```
 
Now we simply have to execute the following
 
```
cd myproject
npx @plugcore/core init
```
 
Some questions will be prompted to determine the needs of the project, if this is your first time we recommend you to create a little demo with an in memory database mocking a MongoDB server, this will let us immediately start the server and start checking the basic functionalities of the framework.
 
```
Do you want to create a basic demo with API REST and a MongodDB client? (y/yes): yes
Do you want to use an in memory database mocked as MongoDB for development or tests purposes? (y/yes): yes
```
 
After the installation has finished, we will have a folder structure that looks like this:
 
```
myproject/                                -- Project folder
    ├── configuration/                    -- Folder to store all our configuration files
    │    ├── configuration.json           -- Default configuration file
    │    └── configuration.pro.json       -- Properties to override while production mode is activated
    ├── src                               -- Source files of the project
    │   ├── configuration                 -- Folder for the configuration types
    │   │   └── custom.configuration.ts   -- Interface for our custom configuration
    │   └── example                       -- Example entity folder, everything related to Example will be stored here
    │       ├── example.api.ts            -- File to store all our Example API definitions for input/output objects
    │       ├── example.controller.ts     -- API Rest controller that defines all the routes for Example
    │       ├── example.service.ts        -- Service that is connected to a MongoDB to make CRUD operations in the example collection
    │       └── example.shared.ts         -- All the interfaces, types, enums, etc. shared between the project of the entity Example
    ├── test                              -- Folder where we are going to store all of our test services
    │   └── example                       -- Folder for the tests related to the Example entity
    │       └── example-service.test.ts   -- Test service for src/example/example.service.ts
    ├── node_modules/                     -- NPM node_modules
    ├── package.json                      -- NPM package.json, with all the required dependencies and scripts
    └── tsconfig.json                     -- Typescript configuration file
```
 
And we can already execute one of the predefined commands to start the project:
 
```
npm start
```
 
Or if we want to start it in development mode, which will compile and restart the server automatically every time we make some changes, we can execute:
 
```
npm run dev
```
 
Now we can go to [http://localhost:3000/api/documentation](http://localhost:3000/api/documentation) to see and test our created services.
