
![plugcore.com](https://raw.githubusercontent.com/plugcore/plug/master/_docs/logo.png "plugcore.com")

## @plugcore/ds-mongodb

[![https://nodei.co/npm/@plugcore/ds-mongodb.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugcore/ds-mongodb.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugcore/ds-mongodb)

Documentation can be found at [the wiki](https://github.com/plugcore/plug/wiki/MongoDB-connection).
 
## Datasource: MongoDB
 
This utility will help us connect to a Mongodb server using the [datsources system](https://github.com/plugcore/plug/wiki/Datasources-configuration),
where very instance of the client will target a specific database.
 
Internally it uses the [MongoDB connector](https://www.npmjs.com/package/mongodb) without any layers on top of it, this means with no other framework,
this is because we believe the MongoDB connector is already high level enough and we want to remove as many layers as possible.
 
Also we will be able to use [nedb](https://github.com/louischatriot/nedb) as temporal memory database, this will be useful for
demos o tests execution.
 
## Configuration
 
Inside our configuration file, for example `{PROJECT_ROOT}/configuration/configuration.json`, we will have to add a new
entry for each database we want to connect, like in this example:
 
```
{
    "connections": {
        "mymongo": { // Connection id
            "type": "mongodb", // Datasource type
            "url": "mongodb://myuser:mypassword@mongodb0.example.com:27017/admin", // As defined in https://docs.mongodb.com/manual/reference/connection-string/#standard-connection-string-format
            "databaseName": "mydatabase" // Database name that we want to connect
        },
        ...
    },
    ...
}
```
 
## Usage
 
Once the connection is defined in the configuration we are ready to create a service decorated with `@Service({ connection: 'mymongo' })`
that will be able access the MongoDB. From the datasource wi will have to preload which collections we want to use
and then with those collection instance we will be able to call all the MongoDB actions such as find, update, etc.
 
Basic example:
 
```typescript
// First we should create somewhere an interface that will define the connection objects structure
interface Vehicle {
    id: string;
    year: number;
    model: string
}
 
// Service that will use the connection we defined before
@Service({ connection: 'mymongo' })
// We are going to need to execute some async operations before marking this service as ready,
// for this we have to implement the OnInit interface
export class VehicleService implements OnInit { 
 
    // Here is where we are going to store the collection reference
    private collection: Collection<Vehicle>;
 
    constructor(
        // Connection to "mymongo"
        private mongoDbConnection: MongoDbDatasource
    ) {}
 
    // This method will be executed before marking this service as ready,
    // we could load the collections that we are going to need
    public async onInit() {
        // For the method "getCollection" we can use either a class or a string. 
        // If a class is provided, then the collection will be called as the class, and it will
        // also serve as a type for the collection
        // If a string is provided, then we can use any type we want for the collection
        this.collection = await this.mongoDbConnection.getCollection<Vehicle>('Vehicle');
    }
 
    // Basic CRUD example
 
    public async create(vehicle: Vehicle) {
        return this.collection.insert(vehicle);
    }
 
    public async findById(id: string): Promise<Vehicle | null> {
        return this.collection.findOne({ id });
    }
 
    public async update(vehicle: Vehicle) {
        return this.collection.updateOne({ id: vehicle.id }, vehicle);
    }
 
    public async remove(id: string) {
        return this.collection.remove({ id });
    }
 
}
```
 
# Nedb
 
[Nedb](https://github.com/louischatriot/nedb) will allow us to use a [subset of the Mongodb API](https://github.com/louischatriot/nedb#api), 
but we have to take into account that it doesn't support (aggregation)[https://docs.mongodb.com/manual/aggregation/]. If we have services
that only use those methods, we can change the MongoDB connection to Nedb. This might be useful if we want to tests our services without 
the need of a MongoDB instance already configured that might be accessed by multiple users at the same time. Or for example if we want
to create a portable demo. This database won't be saved into any file, and all data will be destroyed after every restart.
 
In order to use __Nedb__ first we need to install iT:
```
npm install nedb --save-dev
```
 
And then configure the __connection__ that we want to change, for example if we want to use it only in the tests execution we could create:
__{PROJECT_ROOT}/configuration/configuration.test.json__
```
{
    "connections": {
        "mymongo": { // Connection id
            "type": "mongodb", // The data source type is allways es Mongodb
            "url": "nedb", // With this special url we are telling the Mongodb datasource to use Nedb instead of Mongodb
            "databaseName": "mydatabase" // Any value will do since this field is ignored
        },
        ...
    },
    ...
}
```
 
From this moment only the nedb database will be executed while doing tests, but only in the services that are using the `mymongo` connection.
