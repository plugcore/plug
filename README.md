

![Plugdata.io](https://drive.google.com/file/d/1AFrsUWNW_wLMONMsKkEG9PZ4DZpKJC5a/view?usp=sharing)

# Pludata.io Framework

This repository contains all the main node modules used in Plugdata.io products and is aimed to be help anybody who wants to easily create robust and performant web applications.

# Philosophy

- __Typescript__: We like how Typescript has been evolving during the last years and it provide us with tools to create consistent and organized projects.
- __Low overhead__: One of the few problems we see with the JS ecosystem is the high volume of libraries required even for the simplest things, so we try to minimize it by choosing libraries with the same philosophy and always trying to be as close to Node JS as possible
- __Consistent internal API__: Another problem with nowadays projects is that every library usually has a different way of doing things: configuration, execution (callbacks, promises, etc) and not always has a good support for Typescript. We try our best to create a consistent API for all functionality, it being: logs, scheduled jobs, database, APIs, etc. This can be done thanks to our custom dependency injection (see more below), configuration interfaces and extensive usage of decorators.
- __Performance__: This connects directly to our low overhead philosophy, in all our decisions we always take performance as a high priority point. We'll keep track of it by constantly updating and running benchmarks against other libraries and ourselves.
- __Versioning__: As it is a common practice in npm packages we'll use a [semantic Versioning](https://semver.org/) for all our packages, and all the packages will have the same version. This means if the current version is 2.0.1 and a new patch is released, then all the packages will upgrade to version 2.0.2. This also means that we'll have to coordinate all our projects when deciding to release a new minor o major version, so all of them take advantage of it.
- __ Security__: // TODO

# Modules

Bellown is shown a list of all node modules with the real npm package, a little description and links to useful information.

## @plugdata/core

Contains the main functionality that any Node JS might need, some of it would be:

- __Dependency injection__: It's a custom implementation based on an decorator syntax, and it will be the cornerstone of all our modules and products. This section is related to our consistent API philosophy, since everything will be managed and configured by the container. It's influenced by (typedi)[https://github.com/typestack/typedi], but with extended functionality to meet our needs.
- __Configuration__: There will be a main configuration file which will have everything needed for other packages configuration, custom implementations and future products. It's based on JSONs files, which will be able to reference environment variables and have different versions for different environments (productio, development, etc.).
- __Logs__: For all our logging we'll use (pino)[https://github.com/pinojs/pino] since it fits our philosophy and has a great connectivity with other products such as (Elastic logs)[https://www.elastic.co/es/solutions/logging]
- __Http/s Client__: We have a lightweight http/s client that is a simple promisified wrapper of Nodejs (Http/s client)[https://nodejs.org/api/http.html#http_http_get_options_callback] with easy methods to make REST JSON calls.
- __Events__: It's an adaptation of (EventEmitter3)[https://github.com/primus/eventemitter3#readme] to our dependency injection system. It has almost the same API than the (Node JS events)[https://nodejs.org/api/events.html] but with some additions like contexts, so it won't be necessary to call `.bind(this)`, and some unnecessary methods removed for better performance.
- __Scheduled jobs__: For job scheduling we have adapted a simple (cron)[https://www.npmjs.com/package/cron] library to our dependency injection and event system so you can easily create them and listen for all events if some logging or database insertion is needed.
- __Object validator__: An extensible and lightweight object validator based on (superstruct)[https://github.com/ianstormtaylor/superstruct] modified to have a more comprehensive API
- __Object transformation__: Another common task is object transformation when you are dealing with different integrations and internal business logic, so we have created an utility with a similar API than (json-map-transform)[https://github.com/edudavid/json-map-transform] for common and repetitive object transformations with precompiled templates.
- __Utils__: During our development of several projects we've been gathering some common usage utils, mostly for objects and promises manipulation, and other NodeJS wrappers for things like file system calls. We'll be updating these utils as development progresses.
- __Tests__: It's a simple testing library that uses (Node JS assert library)[https://nodejs.org/api/assert.html] for it's validation and is based on Typescript classes with an integration to our dependency injection system. It's not aimed to be a full featured testing library as the already existing ones, and we know it's a personal choice of every team, so we offer it just a possibility for simple tests, and we use it for all our internal testing, so it will also have integration with other packages such as `data` and `web`.

## @plugdata/data

This package will contain all the functionality relative to data storage and query system. The amount of supported databases will increase depending on demand, but at the beginning it will cover the most used ones.

- __ORM__: For our database manage we have a wrapper of (TypeORM)[https://typeorm.io/] which is a fully featured ORM for the most used SQL databases and MongoDB, we plan to add further support as MongoDB transactions and new NoSQL databases. This is fully integrated with our configuration and dependency injection systems.
- __Impration/exportation__: Uses TypeORMs utils to create JSONs for data import/export between different systems, being able to select which tables and with query support.

## @plugdata/web

In this package we can find everything that is related to web connectivity

- __Web framework__: For web servers management
- __OAS 3__: We believe that a good documentation is needed for a good API, event if it's just for internal usage. This adds support for an easy creation of (OAS 3)[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md] description files, being able to add little chunks of documentation for each operation created, so it's easily updated at the same time that the code changes, and being able to version it. We take care of the full document creation taking into account all the current configuration.
- __Login__: Easy integration of basic login mechanisms like `basic auth` or `JWT`, but also easy to extend for custom login strategies, and new support will be added in the future.
