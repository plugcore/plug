![plugcore.com](../_docs/logo.png?raw=true "plugcore.com")

# @plugcore/core

[![https://nodei.co/npm/@plugcore/core.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugcore/core.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugcore/core)

Contains the main functionality that any Node JS might need, some of it would be:

- __Dependency injection__: It's a custom implementation based on an decorator syntax, and it will be the cornerstone of all our modules and products. This section is related to our consistent API philosophy, since everything will be managed and configured by the container. It's influenced by [typedi](https://github.com/typestack/typedi), but with extended functionality to meet our needs.

- __Configuration__: There will be a main configuration file which will have everything needed for other packages configuration, custom implementations and future products. It's based on JSONs files, which will be able to reference environment variables and have different versions for different environments (productio, development, etc.).

- __Logs__: For all our logging we'll use [pino](https://github.com/pinojs/pino) since it fits our philosophy and has a great connectivity with other products such as [Elastic logs](https://www.elastic.co/es/solutions/logging)

- __Http/s Client__: We have a lightweight http/s client that is a simple promisified wrapper of Nodejs [Http/s client](https://nodejs.org/api/http.html#http_http_get_options_callback) with easy methods to make REST JSON calls.

- __Events__: It's an adaptation of [EventEmitter3](https://github.com/primus/eventemitter3#readme) to our dependency injection system. It has almost the same API than the [Node JS events](https://nodejs.org/api/events.html) but with some additions like contexts, so it won't be necessary to call `.bind(this)`, and some unnecessary methods removed for better performance.

- __Object validator__: An integration with our dependency injection of [AJV](https://github.com/epoberezkin/ajv) wich supports [draft-07 of JSON Schema](http://json-schema.org/latest/json-schema-validation.html) and is one of the fastest a better mantanind libraries for this porpuse

- __Utils__: During our development of several projects we've been gathering some common usage utils, mostly for objects and promises manipulation, and other NodeJS wrappers for things like file system calls. We'll be updating these utils as development progresses.

- __Tests__: It's a simple testing library that uses [Node JS assert library](https://nodejs.org/api/assert.html) for it's validation and is based on Typescript classes with an integration to our dependency injection system. It's not aimed to be a full featured testing library as the already existing ones, and we know it's a personal choice of every team, so we offer it just a possibility for simple tests, and we use it for all our internal testing, so it will also have integration with other packages such as `data` and `web`.

# Other plugcore packages
See more at [this link](https://github.com/plugcore/plugcore-framework).
