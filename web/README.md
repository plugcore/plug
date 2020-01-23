
![plugcore.com](https://raw.githubusercontent.com/plugcore/plug/master/_docs/logo.png "plugcore.com")

## @plugcore/web

[![https://nodei.co/npm/@plugcore/web.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugcore/web.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugcore/web)

Documentation can be found at [the wiki](https://github.com/plugcore/plug/wiki/Rest-API).
 
## API Rest
 
This module will help use creating an API REST using the [dependency injection system](https://github.com/plugcore/plug/wiki/Dependency-injection), but
instead of decorating our classes with `@Service` we will have to use `@Controller`, and then we can decorate any method with 
`@Get`, `@Post`, etc to publish our api methods.
 
Internally it uses [Fastify](https://www.fastify.io/) to improve the performance and help use with things like input validation,
API documentation, login, etc.
  
## API structure
 
Before exposing the API we should create some classes that are going to define the input and output structure of our services, for that we are going
to use the [Object validator](https://github.com/plugcore/plug/wiki/Object-validator). We can define any structure with this, not only
the body and the response, but also the headers, parameters, etc.
 
We are going to use these structures as an example an we will see how can que use them later:
```typescript
export class Post {
 
    @IsNumber()
    @Required()
    userId: number;
 
    @IsNumber()
    @Required()
    id: number;
 
    @IsString({ maxLength: 80 })
    title: string;
 
    @IsString({ maxLength: 9000 })
    body: string;
 
}
 
export class FindByUserIdQuery {
    @IsNumber()
    @Required()
    userId: number;
}
 
export class FindByIdUrlParams {
    @IsNumber()
    @Required()
    id: number;
}
 
export class AuthHeader {
    @IsString({ pattern: '^Bearer .*$' })
    @Required()
    Authetication: number;
}
 
```
 
## Controller
 
Now that the input/output structures are defined let's create a basic controller for our API REST:
 
```typescript
// The urlBase property let's us set a prefix for all the urls that we are going to define inside this controller
@Controller({ urlBase: '/posts' })
export class PostsController {
 
    constructor(
        private logger: Logger,
        private postsService: PostsService // Example services that is in charge of database interaction
    ) { }
 
    // With no parameters in the decorator we would be create the method 'GET /posts'
    @Get()
    public async getAllPosts(request: Request, response: Response) {
        return this.postsService.getAll(); // The response by default is parsed to JSON
    }
 
    @Post({
        // Here we are saying that in the body request we are expecting a JSON
        // object with the structure defined in Post. This will be automatically
        // validated
        routeSchemas: { request: Post }
    })
    public async createPost(request: Request, response: Response) {
        // From this point we can be sure that the body has the valid structure
        // and we can create the record in the database without further validation
        return this.postsService.create(request.body);
    }
 
    // Example of variables in the url, this would be: 'GET /posts/:id'
    // This would be a valid call: 'GET /posts/327'
    @Get('/:id', {
        // We can also validate the variables of the url, in the class
        // this variables will have the same name as the attribute of the class
        // For example, with this validation, this wouldn't be a valid call: 'GET /posts/aaaa'
        // because of the schema validation that only allows numbers
        routeSchemas: { urlParameters: FindByIdUrlParams }
    })
    public async findById(request: Request, response: Response) {
        // All url variables are stored inside "request.params"
        return this.postsService.findById(request.params.id);
    }
 
    // Example of url with parameters
    @Get('/find-by-user-id', {
        // We can also validate http parameters
        // as we did with url variables
        // Example of valid url: 'GET /posts/find-by-user-id?userId=3'
        routeSchemas: { query: FindByUserIdQuery }
    })
    public async findByUserId(request: Request, response: Response) {
        // And then those parameters can be accesed with "request.query"
        return this.postsService.findById(request.query.userId);
    }
 
    // Example of a PUT method
    @Put('/:id', {
        routeSchemas: {
            urlParameters: FindByIdUrlParams,
            request: Post // We can combine as many validators as needed
        }
    })
    public async updatePost(request: Request, response: Response) {
        return this.postsService.update(request.params.id, request.body);
    }
 
    // Example of a DELETE method
    @Delete('/:id', { routeSchemas: { urlParameters: FindByIdUrlParams } } )
    public async deletePost(request: Request, response: Response) {
        return this.postsService.delete(request.params.id);
    }
 
 
}
```
 
We can check all the properties of the `Request` and `Response` objects in the official documentation of Fastify:
 - [Request](https://github.com/fastify/fastify/blob/master/docs/Request.md)
 - [Response](https://github.com/fastify/fastify/blob/master/docs/Reply.md). We have to take into account that we can't use the `send` method becose it is already used by the system
 
## Events
 
In any API method we can use events/hooks to validate input asynchronously, modify the input body, or whatever we might need to do before or after
the method implementation.
We can see a list with a little explanation of all of them in the [Fastify documentation](https://github.com/fastify/fastify/blob/master/docs/Hooks.md#requestreply-hooks), but in essence these are the hooks:
 - __onRequest__: Executed at the very moment the request hits the server, we can't modify the body yet but we couldn’t return an error.
 - __preParsing__: Executed after the middlewares, for example useful for login purposes.
 - __preValidation__: At this point the body has been already defined by the middlewares, but it hasn't been validated yet,
 - __preHandler__: Last hook before executing the method implementation, all the middlewares and validators has been executed.
 - __preSerialization__: The method implementation has been executed but  se está a punto de devolver esta respuesta
[Here](https://github.com/fastify/fastify/blob/master/docs/Lifecycle.md) we have a more graphic example of how the events/hooks works.
 
We can implement any event the following way
 
```typescript
@Controller({ urlBase: '/test' })
export class ControllerExample {
 
    constructor(
        private logger: Logger
    ) { }
 
    @Post('', {
        // We just have to make a reference of a method of this service
        onRequest: ControllerExample.prototype.onRequest,
        preParsing: ControllerExample.prototype.preParsing,
        preValidation: ControllerExample.prototype.preValidation,
        preHandler: ControllerExample.prototype.preHandler,
        preSerialization: ControllerExample.prototype.preSerialization
    })
    public async postTest(req: Request, response: Response) {
        return <ExampleResponse>{ success: true };
    }
 
    // There is no need to return anything in the events handlers,
    // we have the request and response objects to use as necessary
    public async onRequest(request: Request, response: Response) {
        // ...
    }
 
    public async preParsing(request: Request, response: Response) {
        // ...
    }
 
    public async preValidation(request: Request, response: Response) {
        // ...
    }
 
    public async preHandler(request: Request, response: Response) {
        // ...
    }
 
    public async preSerialization(request: Request, response: Response) {
        // ...
    }
 
}
```
 
## OAS 3 (Swagger)
 
Since we are using the [Object validator](https://github.com/plugcore/plug/wiki/Object-validator) to define the validation
of the input objects, we can take it one step further and also define the output of our services and use it to generate
the API documentation using [OAS 3](https://github.com/OAI/OpenAPI-Specification), which is an standar for this type
of documentation definition. In order to visualize the documentation we will use the [Swagger UI](https://petstore.swagger.io/).
 
By default the documentation generation is activated, and we can access it at `[host]?(:port)/api/documentation`:
 - [http://localhost:3000/api/documentation](http://localhost:3000/api/documentation) Swagger UI to visualize the documentation
 - [http://localhost:3000/api/documentation/json](http://localhost:3000/api/documentation/json) OAS document in JSON format
 - [http://localhost:3000/api/documentation/yaml](http://localhost:3000/api/documentation/yaml) OAS document in YAML format
 
Following the previous example, let's see what could we do to improve our controller and define all the input/outputs
 
```typescript
@Controller({ urlBase: '/posts' })
export class PostsController {
 
    constructor(
        private logger: Logger,
        private postsService: PostsService
    ) { }
 
    @Get({
        // Here we are saying that we are returning an array of "Post"
        routeSchemas: { response: { model: Post, isArray: true} }
    })
    public async getAllPosts(request: Request, response: Response) {
        return this.postsService.getAll();
    }
 
    @Post({
        routeSchemas: {
            request: Post,
            response: Post // If we are going to return only an object the property "isArray" is not needed
        }
    })
    public async createPost(request: Request, response: Response) {
        return this.postsService.create(request.body);
    }
 
    @Get('/:id', {
        routeSchemas: {
            urlParameters: FindByIdUrlParams,
            response: { model: Post, isArray: true } // Again, an array example
        }
    })
    public async findById(request: Request, response: Response) {
        return this.postsService.findById(request.params.id);
    }
 
    @Get('/find-by-user-id', {
        routeSchemas: {
            query: FindByUserIdQuery,
            response: { model: Post, isArray: true } // Again, an array example
        }
    })
    public async findByUserId(request: Request, response: Response) {
        return this.postsService.findById(request.query.userId);
    }
 
    @Put('/:id', {
        routeSchemas: {
            urlParameters: FindByIdUrlParams,
            request: Post,
            response: Post // Again only an object
        }
    })
    public async updatePost(request: Request, response: Response) {
        return this.postsService.update(request.params.id, request.body);
    }
 
    // Here we won't return anything meaningful, there is no need to
    // define anything
    @Delete('/:id', { routeSchemas: { urlParameters: FindByIdUrlParams } } )
    public async deletePost(request: Request, response: Response) {
        return this.postsService.delete(request.params.id);
    }
 
}
```
 
These are the values that we can document for each method
 
```typescript
export interface IRouteSchemas {
    request?: ClassParameter<any> | { isArray: true; model: ClassParameter<any> }; // HTTP Body, used for documentation and validation
    response?: ClassParameter<any> | { isArray: true; model: ClassParameter<any> }; // REsponse object, only used in documentation
    query?: ClassParameter<any>; // HTTP parameters, used for documentation and validation
    urlParameters?: ClassParameter<any>; // URL variables, used for documentation and validation
    headers?: ClassParameter<any>; // HTTP Headers, used for documentation and validation
}
```
 
We can configure some aspects of the documentation generation using the [project configuration](https://github.com/plugcore/plug/wiki/Project-configuration):
 
```
{
    "web": {
        "oas": { // Everything related to OAS is inside this property, and everything is OPTIONAL
 
            "enableDocumentation": boolean, // Enable/disable documentation generation
            "documentationPath": string, // Documentation url, by default /api/documentation
 
            // From this point on all the properties are the same as defined in
            // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md 
            // for all the OAS definition that is not related to an specific url
 
            "info": InfoObject,
            "externalDocs": ExternalDocumentationObject,
            "host": string,
            "basePath": string,
            "schemes": SchemasObject | string[],
            "consumes": string[],
            "produces": string[],
            "security": Record<string, any> | SecurityRequirementObject[],
            "servers": Server[],
            "components": ComponentsObject,
            "tags": TagObject[],
 
        }
    }
}
```
 
## Security
 
In order to implement security in the APIs, we can do it manually using the events/hooks system, but we have created some little utilities
to make it easier to implement, using HTTP Basic Auth, JWT and a custom login.
 
First we have to create a service that will be responsible of the authentication system, in this example we are going
to implement the 3 systems, but we can implement any of them.
 
```typescript
@Service()
export class RoutesAuthImplService {
 
    constructor(
        @InjectLogger('auth') private log: Logger
    ) {}
 
    // Basic auth, simply a user/password that will be
    // included in every petition and will be checked
    // every time. This will be called for every url securiezed
    // with this option
    @BasicAuthLogin()
    public async basicAuthLogin(user: string, password: string, request: Request) {
        this.log.info('basicAuthLogin');
        return user === 'testUser' && password === 'testPassword';
    }
 
    // Receives a Request object and has to return the JWT Payload, this will
    // be called only in the JWT login url.
    // If the request doesn't have the correct login, you can throw an error
    // or return null
    @JwtLogin()
    public async jwtLogin(request: Request) {
        this.log.info('jwtLogin');
        if (request.body && request.body.user === 'testUser') {
            return {
                prop1: 'string1',
                prop2: 2
            };
        }
    }
 
    // Here we just define a method that will be executed in every request
    // that has this type of security, it must throw an error if something 
    // is wrong with the login
    @CustomAuth()
    public async customAuth(request: Request) {
        this.log.info('customAuth', request.headers);
        const myHeader = request.headers.myheader;
        const cookiesTest = request.cookies.TESTC;
        if (myHeader === undefined || myHeader === null) {
            throw new Error('My header is missing');
        } else {
            // Here we are using the "customData" property of the request,
            // that is a property left for us to use to store
            // any data that we want to share among all the 
            // implementations that are going to be executed through this request
            // In this example we are storing the "myHeader" inside this property
            // with some information compiled from the request
            request.customData = { myHeader: `${myHeader}${cookiesTest}` };
        }
    }
 
}
 
```
 
Once we have implemented all the security systems we can go method by method of our
controllers indicating what security type we want to use. If we indicate more than
one it will be executed as an "or" statement.
 
```typescript
@Controller({ urlBase: '/posts' })
export class PostsController {
 
    constructor(
        private logger: Logger,
        private postsService: PostsService
    ) { }
 
    @Get({
        // Example of custom security
        security: 'custom'
        routeSchemas: { response: { model: Post, isArray: true} }
    })
    public async getAllPosts(request: Request, response: Response) {
        // Remember how we used the "customData" in the custom security implementation
        this.logger.info(request.customData);
        return this.postsService.getAll();
    }
 
    @Post({
        // Example of more than 1 security type, executed as an "or" statement
        security: ['jwt', 'basic']
        routeSchemas: {
            request: Post,
            response: Post
        }
    })
    public async createPost(request: Request, response: Response) {
        if (request.jwtPayload) {
            // When a request comes with a valid JWT token, the payload is automatically
            // parsed and stored in the "jwtPayload" request property
            this.logger.info(request.jwtPayload);
        }
        return this.postsService.create(request.body);
    }
 
}
```
 
We can go route by route defining the security system, or we can define a security system for all routes and exclude only the
public ones, like in this example:
 
```typescript
@Controller({ urlBase: '/posts' })
export class PostsController {
 
    @Get({
        // No security will be forced for this method
        security: 'none'
    })
    public async getAllPosts(request: Request, response: Response) {
        return [];
    }
 
}
```
 
We can configure any aspects of the security using [the projct configuration](https://github.com/plugcore/plug/wiki/Project-configuration):
 
```
{
    "web": {
        "auth": {
            "eanbled": true, // Enable/disable security for all the application
            "securityInAllRoutes": ['jwt', 'basic'] // Array that will contain which security systems are going to be used for all the routes
            "securityInOas": ['basic'], // Security in the OAS documentation page
            "jwtPrivateKey": '8981F9391AF549443CC7D5141B24DJ4C',
            "jwtAlgorithm": 'HS256', // Possible values 'HS256' | 'HS384' | 'HS512' | 'RS256', see https://jwt.io/
            "jwtLoginPath": '/auth/jwt', // JWT login url
            "jwtExpiration": 3600 // TTL (Time to live) for any JWT token, in seconds
        }
    }
}
```
 
## Configuration
 
We can configure some options of the [listen](https://github.com/fastify/fastify/blob/master/docs/Server.md#listen) Fastify method using [the projct configuration](https://github.com/plugcore/plug/wiki/Project-configuration): 
 
```typescript
/**
* Server listen options
*/
interface ListenOptions {
    port?: number;
    host?: string;
    backlog?: number;
    path?: string;
    exclusive?: boolean;
    readableAll?: boolean;
    writableAll?: boolean;
    /**
    * @default false
    */
    ipv6Only?: boolean;
}
```
 
For example:
 
```
{
    "web": {
        "server": {
            "port": 3000,
            "host": "localhost"
        }
    }
}
```
