![plugcore.com](https://raw.githubusercontent.com/plugcore/plug/master/_docs/logo.png "plugcore.com")

# @plugcore/core

[![https://nodei.co/npm/@plugcore/core.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugcore/core.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugcore/core)

Documentation can be found at [the wiki](https://github.com/plugcore/plugcore/wiki).

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
