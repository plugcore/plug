__We are still working in this library. COMING SOON__

![Plugdata.io](../_docs/logo.png?raw=true "Plugdata.io")

## @plugdata/data

This package will contain all the functionality relative to data storage and query system. The amount of supported databases will increase depending on demand, but at the beginning it will cover the most used ones.

- __ORM__: For our database manage we have a wrapper of [TypeORM](https://typeorm.io/) which is a fully featured ORM for the most used SQL databases and MongoDB, we plan to add further support as MongoDB transactions and new NoSQL databases. This is fully integrated with our configuration and dependency injection systems.

- __Impration/exportation__: Uses TypeORMs utils to create JSONs for data import/export between different systems, being able to select which tables and with query support.
