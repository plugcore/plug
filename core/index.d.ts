declare module '@plugcore/core/src/cli/cli.utils' {
  export class CliUtils {
      /**
       * Execute a terminal  command
       * @param commandName
       * @param opts
       */
      static executeCommand(commandName: string, opts: string[]): Promise<unknown>;
      static promt(question: string): Promise<string>;
  }

}
declare module '@plugcore/core/src/cli/commands/help.command' {
  export default function help(args: string[], becouseOfError?: boolean): void;

}
declare module '@plugcore/core/src/cli/commands/init.command' {
  /**
   * Command to init a project
   * @param args
   * @param base
   */
  export default function init(args: string[], base: string): void;

}
declare module '@plugcore/core/src/cli/commands/start.command' {
  /**
   * Command to start the server
   * @param args
   * @param base
   */
  export default function start(args: string[], base: string): void;

}
declare module '@plugcore/core/src/cli/commands/test.command' {
  /**
   * Command to start the server
   * @param args
   * @param base
   */
  export default function test(args: string[], base: string): void;

}
declare module '@plugcore/core/src/cli/plug.cli' {
  #!/usr/bin/env node
  export {};

}
declare module '@plugcore/core/src/cli/templates/project-template/custom-configuration.template' {
  export const customConfigurationTemplate = "\nexport interface CustomConfiguration {\n\tcustom: {\n\t\texample: string;\n\t}\n}\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/editorconfig.template' {
  export const editorConfigTemplate = "\n# Editor configuration, see http://editorconfig.org\nroot = true\n\n[*]\ncharset = utf-8\nindent_style = tab\nindent_size = 4\ninsert_final_newline = true\ntrim_trailing_whitespace = true\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/example-api.template' {
  export const exampleApiTemplate = "\nimport { IsNumber, IsString, Required } from '@plugcore/core';\nimport { Example } from \"./example.shared\";\n\nexport class ExampleResponse implements Example {\n\n\t@Required()\n\t@IsString()\n\tid: string;\n\n\t@Required()\n\t@IsString()\n\ttitle: string;\n\n\t@Required()\n\t@IsNumber()\n\tquantity: number;\n\n}\n\nexport class ExampleUpdateRequest implements Omit<Example, 'id'> {\n\n\t@Required()\n\t@IsString()\n\ttitle: string;\n\n\t@Required()\n\t@IsNumber()\n\tquantity: number;\n\n}\n\nexport class ExampleIdParam {\n\n\t@Required()\n\t@IsString()\n\tid: string;\n\n}\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/example-controller.template' {
  export const exampleControllerTemplate = "\nimport { Logger, StringUtils } from '@plugcore/core';\nimport { Controller, DefaultResponseModel, Delete, Get, Post, Request, Response } from '@plugcore/web';\nimport { ExampleIdParam, ExampleResponse, ExampleUpdateRequest } from './example.api';\nimport { ExamlpleServie } from './example.service';\nimport { Example } from './example.shared';\n\n@Controller({ urlBase: '/example' })\nexport class ExampleController {\n\n\tconstructor(\n\t\tprivate examlpleServie: ExamlpleServie,\n\t\tprivate log: Logger,\n\t) { }\n\n\t//\n\t// Public API\n\t//\n\n\t@Get({\n\t\trouteSchemas: {\n\t\t\tresponse: { model: ExampleResponse, isArray: true }\n\t\t},\n\t\tonRequest: ExampleController.prototype.findAllOnRequest\n\t})\n\tpublic async findAll(): Promise<ExampleResponse[]> {\n\t\treturn this.examlpleServie.findAll();\n\t}\n\n\t@Get('/:id', {\n\t\trouteSchemas: {\n\t\t\turlParameters: ExampleIdParam,\n\t\t\tresponse: ExampleResponse\n\t\t}\n\t})\n\tpublic async findById(req: Request<undefined, ExampleIdParam>): Promise<ExampleResponse> {\n\t\tconst result = await this.examlpleServie.findById(req.params.id);\n\t\tif (!result) {\n\t\t\tthrow new Error('Example not found with id ' + req.params.id);\n\t\t} else {\n\t\t\treturn result;\n\t\t}\n\t}\n\n\t@Post({\n\t\trouteSchemas: {\n\t\t\trequest: ExampleUpdateRequest,\n\t\t\tresponse: ExampleIdParam\n\t\t}\n\t})\n\tpublic async create(req: Request<ExampleUpdateRequest>) {\n\t\tconst example: Example = {\n\t\t\tid: StringUtils.createRandomId(),\n\t\t\t...req.body\n\t\t}\n\t\tawait this.examlpleServie.create(example);\n\t\treturn { id: example.id };\n\t}\n\n\t@Delete('/:id', {\n\t\trouteSchemas: {\n\t\t\turlParameters: ExampleIdParam,\n\t\t\tresponse: DefaultResponseModel\n\t\t}\n\t})\n\tpublic async remove(req: Request<undefined, ExampleIdParam>) {\n\t\tawait this.examlpleServie.remove(req.params.id);\n\t\treturn { success: true };\n\t}\n\n\t//\n\t// Events\n\t//\n\n\tprivate async findAllOnRequest(req: Request, res: Response) {\n\t\tthis.log.debug('Example of http event: ' + req.raw.url);\n\t}\n\n}\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/example-service-test.template' {
  export const exampleServiceTestTemplate = "\nimport { TestService, AsserterService, Test, BeforeTests, Container, Logger, AfterTests } from \"@plugcore/core\";\nimport { ExamlpleServie } from \"../../src/example/example.service\";\nimport { Example } from \"../../src/example/example.shared\";\n\n@TestService()\nexport class UtilsTestClass extends AsserterService {\n\n\tprivate testId = 'testid';\n\n\tconstructor(\n\t\tprivate log: Logger,\n\t\tprivate examlpleServie: ExamlpleServie\n\t) {\n\t\tsuper();\n\t}\n\n\t@BeforeTests()\n\tpublic async beforeTests() {\n\t\tawait this.examlpleServie.remove(this.testId);\n\t\tthis.log.info('Before tests');\n\t}\n\n\t@AfterTests()\n\tpublic async afterTests() {\n\t\tthis.log.info('After tests');\n\t}\n\n\t@Test()\n\tpublic async basicTest() {\n\n\t\tconst exampleTest: Example = {\n\t\t\tid: this.testId,\n\t\t\ttitle: 'testTitle',\n\t\t\tquantity: 1\n\t\t};\n\t\tawait this.examlpleServie.create(exampleTest);\n\n\t\tconst exampleTestFromDb = await this.examlpleServie.findById(this.testId);\n\n\t\tif (exampleTestFromDb) {\n\t\t\t\tthis.assert.equal(exampleTest.id, exampleTestFromDb.id);\n\t\t\t\tthis.assert.equal(exampleTest.title, exampleTestFromDb.title);\n\t\t\t\tthis.assert.equal(exampleTest.quantity, exampleTestFromDb.quantity);\n\t\t} else {\n\t\t\t\tthrow new Error('Example from db not found');\n\t\t}\n\n\t}\n\n}\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/example-service.template' {
  export const exampleServiceTemplate = "\nimport { InjectConfiguration, Logger, OnInit, Service } from '@plugcore/core';\nimport { Collection, MongoDbDatasource } from '@plugcore/ds-mongodb';\nimport { CustomConfiguration } from '../configuration/custom.configuration';\nimport { Example } from './example.shared';\n\n@Service({ connection: 'mymongodb' })\nexport class ExamlpleServie implements OnInit {\n\n\tprivate collection: Collection<Example>;\n\n\tconstructor(\n\t\tprivate log: Logger,\n\t\t@InjectConfiguration() private configuration: CustomConfiguration,\n\t\tprivate mongoDbConnection: MongoDbDatasource\n\t) {}\n\n\tpublic async onInit() {\n\t\tthis.collection = await this.mongoDbConnection.getCollection<Example>('example');\n\t\tthis.log.info('Example of property from configuration: ' + this.configuration.custom.example);\n\t}\n\n\tpublic async findAll(): Promise <Example[]> {\n\t\treturn this.collection.find({}).toArray();\n\t}\n\n\tpublic async create(example: Example) {\n\t\treturn this.collection.insert(example);\n\t}\n\n\tpublic async findById(id: string): Promise <Example | null> {\n\t\treturn this.collection.findOne({ id });\n\t}\n\n\tpublic async update(example: Example) {\n\t\treturn this.collection.updateOne({ id: example.id }, example);\n\t}\n\n\tpublic async remove(id: string) {\n\t\treturn this.collection.remove({ id });\n\t}\n\n}\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/example-shared.template' {
  export const exampleSharedTemplate = "\nexport interface Example {\n\tid: string;\n\ttitle: string;\n\tquantity: number;\n}\n\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/gitignore.template' {
  export const gitIgnoreTemaplte = "\nnode_modules/\ndist/\npackage-lock.json\n";

}
declare module '@plugcore/core/src/cli/templates/project-template/tsconfig-json.template' {
  export const tsconfigjsonTemplate = "{\n\t\"compilerOptions\": {\n\t\t/* Basic Options */\n\t\t// \"incremental\": true,                   /* Enable incremental compilation */\n\t\t\"target\": \"es2017\", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */\n\t\t\"module\": \"commonjs\", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */\n\t\t// \"lib\": [],                             /* Specify library files to be included in the compilation. */\n\t\t// \"allowJs\": true,                       /* Allow javascript files to be compiled. */\n\t\t// \"checkJs\": true,                       /* Report errors in .js files. */\n\t\t// \"jsx\": \"preserve\",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */\n\t\t// \"declaration\": true,                   /* Generates corresponding '.d.ts' file. */\n\t\t// \"declarationMap\": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */\n\t\t// \"sourceMap\": true,                     /* Generates corresponding '.map' file. */\n\t\t// \"outFile\": \"./\",                       /* Concatenate and emit output to single file. */\n\t\t\"outDir\": \"./dist\", /* Redirect output structure to the directory. */\n\t\t// \"rootDir\": \"./\",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */\n\t\t// \"composite\": true,                     /* Enable project compilation */\n\t\t// \"tsBuildInfoFile\": \"./\",               /* Specify file to store incremental compilation information */\n\t\t// \"removeComments\": true,                /* Do not emit comments to output. */\n\t\t// \"noEmit\": true,                        /* Do not emit outputs. */\n\t\t// \"importHelpers\": true,                 /* Import emit helpers from 'tslib'. */\n\t\t// \"downlevelIteration\": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */\n\t\t// \"isolatedModules\": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */\n\t\t/* Strict Type-Checking Options */\n\t\t\"strict\": true, /* Enable all strict type-checking options. */\n\t\t// \"noImplicitAny\": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */\n\t\t// \"strictNullChecks\": true,              /* Enable strict null checks. */\n\t\t// \"strictFunctionTypes\": true,           /* Enable strict checking of function types. */\n\t\t// \"strictBindCallApply\": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */\n\t\t\"strictPropertyInitialization\": false, /* Enable strict checking of property initialization in classes. */\n\t\t// \"noImplicitThis\": true,                /* Raise error on 'this' expressions with an implied 'any' type. */\n\t\t// \"alwaysStrict\": true,                  /* Parse in strict mode and emit \"use strict\" for each source file. */\n\t\t/* Additional Checks */\n\t\t// \"noUnusedLocals\": true,                /* Report errors on unused locals. */\n\t\t// \"noUnusedParameters\": true,            /* Report errors on unused parameters. */\n\t\t// \"noImplicitReturns\": true,             /* Report error when not all code paths in function return a value. */\n\t\t// \"noFallthroughCasesInSwitch\": true,    /* Report errors for fallthrough cases in switch statement. */\n\t\t/* Module Resolution Options */\n\t\t\"moduleResolution\": \"node\", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */\n\t\t// \"baseUrl\": \"./\",                       /* Base directory to resolve non-absolute module names. */\n\t\t// \"paths\": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */\n\t\t// \"rootDirs\": [\"src\", \"test\"],                        /* List of root folders whose combined content represents the structure of the project at runtime. */\n\t\t// \"typeRoots\": [],                       /* List of folders to include type definitions from. */\n\t\t// \"types\": [],                           /* Type declaration files to be included in compilation. */\n\t\t// \"allowSyntheticDefaultImports\": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */\n\t\t\"esModuleInterop\": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */\n\t\t// \"preserveSymlinks\": true,              /* Do not resolve the real path of symlinks. */\n\t\t// \"allowUmdGlobalAccess\": true,          /* Allow accessing UMD globals from modules. */\n\t\t/* Source Map Options */\n\t\t// \"sourceRoot\": \"\",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */\n\t\t// \"mapRoot\": \"\",                         /* Specify the location where debugger should locate map files instead of generated locations. */\n\t\t// \"inlineSourceMap\": true,               /* Emit a single file with source maps instead of having a separate file. */\n\t\t// \"inlineSources\": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */\n\t\t/* Experimental Options */\n\t\t\"experimentalDecorators\": true, /* Enables experimental support for ES7 decorators. */\n\t\t\"emitDecoratorMetadata\": true, /* Enables experimental support for emitting type metadata for decorators. */\n\n\t},\n\t\"include\": [\n\t\t\"./src/**/*.ts\",\n\t\t\"./test/**/*.ts\"\n\t]\n}";

}
declare module '@plugcore/core/src/configuration/configuration.decorators' {
  /**
   * Decorator made to help you inject the configuration automatically loaded from
   * the project
   * @param sId
   */
  export function InjectConfiguration(): Function;

}
declare module '@plugcore/core/src/configuration/configuration.default' {
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  export const defaultProjectConfiguration: Omit<Configuration, 'getConnectionConfiguration'>;

}
declare module '@plugcore/core/src/configuration/configuration.interfaces' {
  import { LoggerOptions } from 'pino';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  /**
   * Configuration for initialization tasks, such as start the process to load
   * all dependencies
   */
  export interface IInitConfiguration {
      distFolder: string;
  }
  export interface ConnectionConfiguration {
      type: string;
      [key: string]: any;
  }
  /**
   * Plug framework configuration file
   */
  export interface Configuration {
      init: IInitConfiguration;
      log: Pick<LoggerOptions, 'level' | 'useLevelLabels' | 'changeLevelName' | 'redact' | 'messageKey' | 'prettyPrint' | 'enabled' | 'base'> & {
          timestamp?: boolean;
      };
      connections: Record<string, ConnectionConfiguration>;
      getConnectionConfiguration<T extends ConnectionConfiguration>(configurationClass: ClassParameter<T>, connection: string): T;
  }

}
declare module '@plugcore/core/src/configuration/configuration.loader' {
  import { DeepPartial } from '@plugcore/core/src/utils/typescript/index';
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  export class ConfigurationLoader {
      private static readonly defaultConfigurationFileName;
      private static readonly environmentVariableRegex;
      private static readonly configurationFileRegex;
      /**
       * Calls to `ConfigurationLoader.loadFile` to load the application configuration which will
       * usually be at `/configuration/condiguration.json`. It will use the defaults determined by
       * `defaultProjectConviguration`
       * @param folder
       * @param environment
       */
      static loadProject<T = Configuration>(folder: string, options?: {
          environment?: string;
          configurationFileName?: string;
      }): Promise<T>;
      /**
       * Searches in a folder for a configuration.json to convert and return it as an object.
       * The load supports:
       *   - Environment files, ex: configuration.prod.json.
       *      - In order to load it you can pass it as a parameter or with `NODE_ENV`
       *   - External imports
       *     - If you have some section of the file that is too big, you can create a different file and import it like:
       *     - `{ "log": "@[import:logcfg.json]" }`
       *   - Environment variables
       *     - At any point you can have something like `{ "log": { "level" : "$[NODE_LOG_LEVEL]" } }`
       *  It can throw errors.
       * @param folder
       * @param environment
       */
      static loadFile<T>(folder: string, options?: {
          environment?: string;
          configurationFileName?: string;
      }): Promise<DeepPartial<T>>;
      /**
       * Performs basic validations before commiting to load the configuration file.
       * All validation errors are thrown.
       */
      private static basicValidations;
      /**
       * Loads the configuration file, processes envirnoment variable and file imports, an then
       * returns it as a valid object
       */
      private static importConfigurationFile;
  }

}
declare module '@plugcore/core/src/configuration/configuration.service' {
  import { Configuration, ConnectionConfiguration } from '@plugcore/core/src/configuration/configuration/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  import { ObjectValidator } from '@plugcore/core/src/object-validator/object-validator/index';
  export class ProjectConfigurationService implements Configuration {
      private objectValidator;
      init: Configuration['init'];
      log: Configuration['log'];
      connections: Configuration['connections'];
      private frozenConfiguration;
      constructor(originalConfiguration: Configuration, objectValidator: ObjectValidator);
      getConnectionConfiguration<T extends ConnectionConfiguration>(configurationClass: ClassParameter<T>, connection: string): T;
  }

}
declare module '@plugcore/core/src/constants/plugcore.constants' {
  export class PlugConstants {
      static readonly serverConfiguration: string;
      static readonly pcmsCfgJson: string;
      static readonly ctxLoaders = "loaders";
  }

}
declare module '@plugcore/core/src/constants/reflect-metadata.constants' {
  export class RmdConstats {
      static readonly constructorParams: string;
      static readonly objectClass: string;
  }

}
declare module '@plugcore/core/src/constants/string.constants' {
  export class StringConstants {
      static readonly regexStart = "^";
      static readonly regexEnd = "$";
      static readonly regexHttpAny = "[a-z,A-Z,0-9,\\_,\\-,\\%]*";
      static readonly UTF_8: string;
      static readonly blank = "";
      static readonly space = " ";
      static readonly slash = "/";
      static readonly comma = ",";
      static readonly openBraket = "{";
      static readonly closeBraket = "}";
      static readonly colon = ":";
  }

}
declare module '@plugcore/core/src/data-source/data-source.decorators' {
  import { IDatasourceInfo } from '@plugcore/core/src/data-source/data-source/index';
  /**
   * Marks this service as a datasource
   * @param inp
   */
  export function DataSource(inp: IDatasourceInfo): Function;

}
declare module '@plugcore/core/src/data-source/data-source.interfaces' {
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export interface IDatasourceInfo {
      type: string;
  }
  export interface IDatasourceEntry extends IDatasourceInfo {
      serviceClass: ClassParameter<any>;
  }

}
declare module '@plugcore/core/src/data-source/data-source.utils' {
  import { IDatasourceEntry, IDatasourceInfo } from '@plugcore/core/src/data-source/data-source/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class DatasourceUtils {
      private static entries;
      /**
       * Saves the datasource type
       * @param inp
       * @param serviceClass
       */
      static registerDatsource(inp: IDatasourceInfo, serviceClass: ClassParameter<any>): void;
      /**
       * Returns a list of all the datasources registered until now
       */
      static getDatasources(): IDatasourceEntry[];
  }

}
declare module '@plugcore/core/src/dependecy-injection/di.container' {
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  import { IDiServiceMetadata, IServiceIdentifier, OnServiceReadyCallback } from '@plugcore/core/src/dependecy-injection/di/index';
  /**
   * Service container.
   */
  export class Container {
      /**
       * You can use this constant in order to inject services
       * from the global context in context scoped services.
       * ej `@Inject({ ctx:  }) `
       */
      static readonly globalCtx = "GLOBAL";
      /**
       * Defines the variation var name that interanlly wiil be used
       * to inject connection names
       */
      static readonly connection = "connection";
      private static readonly serviceMetadata;
      private static onServiceReadyCallbacks;
      /**
       * Registers the given Class as a new service and it will try to create a new instance
       * and return it to any Container.get requesting this IServiceIdentifier as soon as
       * all the dependecies are met
       */
      static registrerService<T>(inp: {
          id: IServiceIdentifier<T>;
          clazz: ClassParameter<T>;
          params?: ClassParameter<any>[];
          ctx?: string;
          connection?: string;
      }): void;
      /**
       * Sets the given service with its instance and marks it as ready, so
       * other services can have it as dependency.
       * @param serviceClass
       * @param instance
       * @param serviceId
       * @param ctx
       */
      static set<T>(serviceClass: ClassParameter<T>, instance: T, id?: string, ctx?: string): void;
      /**
       * Returns the requested service once all it's dependencies has been
       * met. This method keep the current thread alive until it returns
       * a value.
       * @param serviceId
       * @param ctx
       */
      static get<T>(serviceId: string | ClassParameter<T>, variation?: Record<string, any>, ctx?: string): Promise<T>;
      /**
       * Shorcut for `Container.get()` when you want a dependency from
       * a specific context
       * @param serviceId
       * @param ctx
       */
      static getFromContext<T>(serviceId: string | ClassParameter<T>, ctx?: string): Promise<T>;
      /**
       * * Used for internal operations *
       * This will wait for the target service to be ready and returns it.
       * It takes into consideration the service connection
       * @param serviceId
       * @param ctx
       */
      static getServiceProperty<T>(inp: {
          originalService: {
              id: IServiceIdentifier;
              clazz: ClassParameter<T>;
          };
          targetService: {
              id: IServiceIdentifier;
              ctx?: string;
              variation?: Record<string, any>;
          };
      }): Promise<T>;
      /**
       * Internal usage only, it registers a Class property as dependency for the service
       * @param serviceId
       * @param targetServiceId
       * @param ctx
       * @param update
       */
      static registerDepLeft(inp: {
          serviceId: IServiceIdentifier;
          targetServiceId: IServiceIdentifier;
          targetCtx?: string;
          update?: boolean;
          variation?: Record<string, any>;
          variationVarName?: string;
      }): void;
      /**
       * Internal usage only, it register a class constructor property, it's the only way
       * you can se parameters like serviceId or context
       * @param id
       * @param targetId
       * @param index
       * @param ctx
       * @param update
       */
      static registrerConstructorHandler(inp: {
          id: IServiceIdentifier;
          targetId: IServiceIdentifier;
          index: number;
          targetCtx?: string;
          update?: boolean;
          variation?: Record<string, any>;
          variationVarName?: string;
      }): void;
      /**
       * Returns a promise that gets executed once all the dependecies
       * passed in the input array are met
       * @param deps
       */
      static waitFor(deps: IDiServiceMetadata[]): Promise<void>;
      /**
       * Returns the service metadata attached to the function if it exists
       * (then it means this class is controlled by the container) or undefined
       * if no metadata is found
       * @param clazz
       */
      static getServiceMetadata(clazz: Function): IDiServiceMetadata | undefined;
      /**
       * Registar a callback that is going to be called for every service
       * that has been set as ready or that has already been marked
       * @param callback
       */
      static onServiceReady(callback: OnServiceReadyCallback): void;
      private static registerEntryDepLeft;
      private static updateConstructorHandler;
      private static initConstructorService;
      private static initService;
      private static setServiceAsReady;
      private static processReadyService;
      /**
       * Registers a new pending request for the given service,
       * once the service is loaded all the requests will be executed
       * @param serviceName
       * @param ctx
       */
      private static waitForDep;
      private static hasOnInit;
      private static hasAllDeps;
      private static checkIfReady;
      private static setServiceMetadata;
      private static updateDependenciesWithConnectionIfNecessary;
      private static isConstructorHandler;
      private static resolveServiceProperties;
  }

}
declare module '@plugcore/core/src/dependecy-injection/di.decorators' {
  import 'reflect-metadata';
  import { IInjectArgs, IServiceArgs, IServiceIdentifier } from '@plugcore/core/src/dependecy-injection/di/index';
  /**
   * Service decorator made to easily registrer the class into the container
   * @param sId
   */
  export function Service({ ctx, sId, connection }?: IServiceArgs): Function;
  /**
   * Injects the dependency into the property. It can be placed in a property
   * definition at class level or at constructor level
   * @param sId
   */
  export function Inject(inp?: IServiceIdentifier<any> | IInjectArgs): Function;
  /**
   * Injects the dependency into the property. It can be placed in a property
   * definition at class level or at constructor level
   * @param sId
   */
  export function InjectConnection(): Function;

}
declare module '@plugcore/core/src/dependecy-injection/di.service' {
  import { IDiEntry, IServiceIdentifier } from '@plugcore/core/src/dependecy-injection/di/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class DiService {
      static readonly variationStart = "<[";
      static readonly variationEnd = "]>";
      private static readonly tmpCtx;
      private static contexts;
      private static variationsMap;
      static genServiceId(service: IServiceIdentifier, variation?: Record<string, any>): string;
      /**
       * Adds the given entry into the provided context.
       * If no context is provided, then the global context will be used.
       * @param entry
       * @param ctx
       */
      static addEntry(entry: IDiEntry, ctx?: string): void;
      /**
       * Creates a IDiEntry with the minium required fields
       * @param serviceId
       * @param clazz
       */
      static createBasicEntry(serviceId: string, clazz?: ClassParameter<any>): IDiEntry;
      /**
       * Creates or updates the given entry into the provided context.
       * If no context is provided, then the global context will be used.
       * @param entry
       * @param ctx
       */
      static updateEntry(entry: IDiEntry, ctx?: string): void;
      /**
       * Checks if exists an IDiEntry with the given serviceId in the provided context.
       * If no context is provided, then the global context will be used.
       * @param serviceId
       * @param ctx
       */
      static exists(serviceId: string, ctx?: string): boolean;
      /**
       * Tries to retrieve an IDiEntry with the given serviceId in the provided context.
       * If no entry is found, it will return undefined.
       * If no context is provided, then the global context will be used.
       * @param serviceId
       * @param ctx
       */
      static getEntry(serviceId: string, ctx?: string): IDiEntry | undefined;
      /**
       * Same than `getEntry()` but only returns the entry if it's a template.
       * It also ignores any variation in the service id (ex: <[0]>)
       * @param serviceId
       * @param ctx
       */
      static getTemplateEntry(serviceId: string, ctx?: string): IDiEntry | undefined;
      /**
       * Gets or creates the entry with the given parameters.
       * If no context is provided, then the global context will be used.
       * @param serviceId
       * @param clazz
       * @param ctx
       */
      static getEnrySafely(serviceId: string, clazz?: ClassParameter<any>, ctx?: string): IDiEntry;
      /**
       * Checks the property 'isReady' in the IDiEntry from the provided context.
       * If no entry is found, it returns false.
       * If no context is provided, then the global context will be used.
       * @param serviceId
       * @param ctx
       */
      static depIsReady(serviceId: string, ctx?: string): boolean;
      /**
       * Gets or creates the entry with the given serviceId in a temporal context.
       * If the class is provided it will try to set it in the result object.
       * @param serviceId
       * @param clazz
       */
      static getTmpEnrySafely(serviceId: string, clazz?: ClassParameter<any>): IDiEntry;
      /**
       * Updates or creates the entry with the given serviceId in a temporal context.
       * If the class is provided it will try to set it in the result object.
       * @param serviceId
       * @param clazz
       */
      static updateTmpEnry(entry: IDiEntry): void;
      /**
       * Removes the entry from the temporal context. Returns true
       * if the entry was found.
       * @param serviceId
       * @param clazz
       */
      static discardTmpEntry(serviceId: string): boolean;
      /**
       * Finds all the IDiEntry that have a depLeft with the given serviceId and
       * context. The result object is
       * @param serviceId
       * @param ctx
       */
      static getAllRelatedDeps(serviceId: string, ctx?: string): Record<string, Record<string, any>>;
      /**
       * Overrides the metada field for the given service with the provided metadata
       * @param serviceId
       * @param metadata
       * @param ctx
       */
      static updateMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean, ctx?: string): void;
      /**
       * Tries to return the metadata field of the given service, it will return
       * undefined if the service doesn't exists or the field has not ben set
       * @param serviceId
       * @param ctx
       */
      static getMetadata(serviceId: IServiceIdentifier, ctx?: string): any | undefined;
      /**
       * Overrides the metada field for the given service with the provided metadata
       * @param serviceId
       * @param metadata
       * @param ctx
       */
      static updateTmpMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean): void;
      /**
       * Tries to return the metadata field of the given service, it will return
       * undefined if the service doesn't exists or the field has not ben set
       * @param serviceId
       * @param ctx
       */
      static getTmpMetadata(serviceId: IServiceIdentifier): any | undefined;
      /**
       * Returns a list of all the services set as ready
       */
      static getAllReadyEntries(): IDiEntry<any>[];
      /**
       * Returns a list of all the services set as ready
       */
      static getAllEntries(): IDiEntry<any>[];
      private static getCtx;
      private static updateCtx;
      /**
       * Tries to find the index an IDiEntry with the given serviceId in the provided context.
       * If no entry is found, it will return -1.
       * If no context is provided, then the global context will be used.
       * @param serviceId
       * @param ctx
       */
      private static getIndexOf;
  }

}
declare module '@plugcore/core/src/dependecy-injection/di.shared' {
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  /**
   * Service interface.
   */
  export type IServiceIdentifier<T = any> = ClassParameter<T> | string;
  /**
   * Function passed to `Container.onServiceReady` that will be executed
   * every time a new service instace is set as ready
   */
  export type OnServiceReadyCallback = (entry: IDiEntry) => void;
  /**
   * Use this interface when your class has an async
   * condition in order to be ready. All dependencies
   * will be loaded before calling this method
   */
  export interface OnInit {
      onInit(): Promise<void>;
  }
  export interface IServiceArgs<T = any> {
      sId?: IServiceIdentifier<T>;
      ctx?: string;
      connection?: string;
  }
  export interface IInjectArgs<T = any> extends IServiceArgs<T> {
      variationVarName?: string;
      variation?: Record<string, any>;
  }
  /**
   * Constructor handler interface
   */
  export interface IConstructorHandler {
      targetId: IServiceIdentifier;
      index: number;
  }
  /**
   * Entry model, internal usage only
   */
  export interface IDiEntry<T = any> {
      serviceId: string;
      isReady: boolean;
      depsClosed: boolean;
      isOnlyTemplate: boolean;
      serviceClass?: ClassParameter<T>;
      object?: any;
      constructorHandlers?: IDiConstructorHandler[];
      depsLeft?: IDiDepLeft[];
      cbWaiting?: Function[];
      propertiesWaiting?: {
          id: IServiceIdentifier;
          ctx?: string;
          variation?: Record<string, any>;
          cb: (service: any) => void;
      }[];
      metadata?: any;
      variation?: Record<string, any>;
  }
  export interface IDiDepLeft {
      targetServiceId: string;
      depMet: boolean;
      targetCtx?: string;
      variationVarName?: string;
      variationVarValue?: any;
  }
  export interface IDiConstructorHandler extends Omit<IDiDepLeft, 'depMet'> {
      index: number;
      variation?: Record<string, any>;
  }
  /**
   * Service metadata attached to the class (in js represented as a Function)
   * so you can determine if the given class is a service mantained by the
   * Container
   */
  export interface IDiServiceMetadata {
      serviceId: IServiceIdentifier;
      ctx?: string;
  }

}
declare module '@plugcore/core/src/dependecy-injection/di.utils' {
  import { IDiServiceMetadata } from '@plugcore/core/src/dependecy-injection/di/index';
  export class DiUtils {
      private static readonly defaultDependencyTimeout;
      /**
       * Loads all the js files recursively in the given path, and waits for all the
       * services to be loaded.
       * @param folderPath
       */
      static waitForFolder(folderPath: string, recursive?: boolean, dependencyTimeout?: number): Promise<IDiServiceMetadata[]>;
      /**
       * Reads the result from waitForFolder function and generates an string
       * with the prefix, a comma separated list of services, and if the services are empty
       * or null/undefined, then the result will be the notFound parameter
       * @param data
       */
      static getServicesAsString(prefix: string, services: IDiServiceMetadata[], notFound: string): string;
      /**
       * Returns a list of all the classes loaded by the loadFolder function
       * @param jsFiles
       */
      private static getClasses;
  }

}
declare module '@plugcore/core/src/ds-http/http.configuration' {
  import { ConnectionConfiguration } from '@plugcore/core/src/configuration/configuration/index';
  export class HttpDsConfiguration implements ConnectionConfiguration {
      type: string;
      url: string;
  }

}
declare module '@plugcore/core/src/ds-http/http.datasource' {
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  import { HttpCallOptions } from '@plugcore/core/src/ds-http/http/index';
  import { Logger } from '@plugcore/core/src/logs/logger';
  export class HttpDatasource {
      private configuration;
      private log;
      private connection?;
      private httpConfiguration;
      private httpCall;
      private baseUrl;
      constructor(configuration: Configuration, log: Logger, connection?: string | undefined);
      get<T>(path: string, options?: Omit<HttpCallOptions, 'method'>): Promise<T>;
      post<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T>;
      put<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T>;
      patch<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T>;
      delete<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T>;
      /**
       * Creates a valid url Object to make the http call
       */
      private resolveURL;
  }

}
declare module '@plugcore/core/src/ds-http/http.shared' {
  /// <reference types="node" />
  import { RequestOptions as HttpRequestOptions } from 'http';
  import { RequestOptions as HttpsRequestOptions } from 'https';
  import { Omit } from '@plugcore/core/src/utils/typescript/index';
  export interface HttpCallOptions {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      params?: Record<string, any>;
      headers?: HttpRequestOptions['headers'];
      options?: Omit<HttpRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
      contentType?: 'application/json' | 'application/xml' | string;
      responseContentType?: 'application/json' | 'application/xml' | string;
      responseEncoding?: 'utf8' | string;
  }
  export interface HttpsCallOptions extends HttpCallOptions {
      options?: Omit<HttpsRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
  }
  export type HttpCall = <T>(url: URL | string, options?: HttpCallOptions, body?: any) => Promise<T>;

}
declare module '@plugcore/core/src/ds-http/http.utils' {
  /// <reference types="node" />
  import { URL } from 'url';
  import { HttpCallOptions, HttpsCallOptions } from '@plugcore/core/src/ds-http/http/index';
  export class HttpUtils {
      static httpCall<T>(url: URL | string, options?: HttpCallOptions, body?: any): Promise<T>;
      static httpsCall<T>(url: URL | string, options?: HttpsCallOptions, body?: any): Promise<T>;
      private static createOptions;
      private static makeCall;
  }

}
declare module '@plugcore/core/src/events/event.constants' {
  export class PublicEvents {
      static readonly allServicesLoaded = "plug:all-services-loaded";
  }

}
declare module '@plugcore/core/src/events/event.decorators' {
  export function OnEvent(event: string): (clazz: any, methodName: string) => void;

}
declare module '@plugcore/core/src/events/event.dispatcher' {
  import { ListenerFn } from 'eventemitter3';
  import { Logger } from '@plugcore/core/src/logs/logger';
  export class EventDispatcher {
      private log;
      constructor(log: Logger);
      private readonly eventEmitter;
      on(event: string, func: ListenerFn<any[]>, context?: any): void;
      emit(event: string, eventPayload?: any): void;
  }

}
declare module '@plugcore/core/src/events/event.shared' {
  export interface IRegisteredEvent {
      methodName: string;
      event: string;
  }

}
declare module '@plugcore/core/src/events/event.utils' {
  import * as EventEmitterType from 'eventemitter3';
  import { IDiEntry } from '@plugcore/core/src/dependecy-injection/di/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  import { IRegisteredEvent } from '@plugcore/core/src/events/event/index';
  export const globalEventEmitter: EventEmitterType;
  export class EventUtils {
      static readonly propertyMetadataPrefix = "p-event-listener:";
      static onServiceReady(entry: IDiEntry): void;
      static registerEventListener(clazz: ClassParameter<any>, methodName: string, event: string): void;
      static getRegisteredEvents<T>(clazz: ClassParameter<T>): IRegisteredEvent[];
  }

}
declare module '@plugcore/core/src/extensions/configuration/ext-configuration.interface' {
  export interface ExtConfiguration {
      id: string;
      baseFolder: string;
      distFolder: string;
  }

}
declare module '@plugcore/core/src/extensions/configuration/ext-default.configuration' {
  import { ExtConfiguration } from '@plugcore/core/src/extensions/configuration/ext-configuration/index';
  export class DefaultExtConfiguration implements ExtConfiguration {
      id: 'plugcore-ext';
      baseFolder: '';
      distFolder: 'dist';
  }

}
declare module '@plugcore/core/src/extensions/configuration/exts-configuration.checker' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  import { ExtConfiguration } from '@plugcore/core/src/extensions/configuration/ext-configuration/index';
  export class ExtsConfigurationChecker implements OnInit {
      scannedExts: ExtConfiguration[];
      primaryExt: ExtConfiguration;
      onInit(): Promise<void>;
      /**
       * Generates the extension configuration object and adds it to the
       * dependency injection container. All the properties have a default
       * value but can be overriden by properties defined in the
       * 'pcms-cfg/configuration.json' file in the extension directory
       * @param extBaseFolder
       */
      private generateExtensionConfiguration;
  }

}
declare module '@plugcore/core/src/extensions/ext-ctx.generator' {
  export class ExtCtxGenerator {
      private static extFolders;
      /**
       * Registers a base extension folder and assigns it an id. These values are
       * stored to be able to get the ext id given a folder path
       * @param extId
       * @param extFolder
       */
      static registerExtFolder(extId: string, extFolder: string): void;
      /**
       * Looks into the extension folders and tries to find the best match.
       * Default value: Container.globalCtx
       * @param folderPath
       */
      static generateCtx(folderPath: string): string | undefined;
  }

}
declare module '@plugcore/core/src/extensions/ext.conductor' {
  import { Logger } from '@plugcore/core/src/logs/logger';
  import { ExtsConfigurationChecker } from '@plugcore/core/src/extensions/configuration/exts-configuration/index';
  export class ExtConductor {
      private extCfgChecker;
      private logger;
      constructor(extCfgChecker: ExtsConfigurationChecker, logger: Logger);
      scan(): Promise<void>;
      private scanExt;
      private loadExts;
  }

}
declare module '@plugcore/core/src/io/fs.utils' {
  /// <reference types="node" />
  import { Stats } from 'fs';
  export interface IFileStats {
      path: string;
      stats: Stats;
  }
  /**
   * File System utils
   */
  export class FsUtils {
      /**
       * Returns a list with all the files inside that folder, it can search
       * recursively
       * @param folderPath
       * @param recursive
       * @param resultFiles
       */
      static getAllFilesFromFolder(folderPath: string, recursive?: boolean, resultFiles?: string[]): Promise<string[]>;
      /**
       * Converts a list of file paths to the stats
       * @param folderFiles
       */
      static getFilesStats(baseFolder: string, folderFiles: string[]): Promise<IFileStats>[];
      /**
       * Promise wrapper to readdir
       * @param folderPath
       */
      static getFolderFiles(folderPath: string): Promise<string[]>;
      /**
       * Promise wrapper to getStats
       * @param filePath
       */
      static getStats(filePath: string): Promise<Stats>;
      /**
       * Promise wrapper to readFile
       * @param filePath
       */
      static loadFile(filePath: string): Promise<string>;
      /**
       * Promise wrapper to write on specified
       * @param fileDescriptor
       * @param message
       * @param offset
       */
      static writeToFile(fileDescriptor: number, message: string, offset: number): Promise<unknown>;
      /**
       * Create of updates the file with the string content
       * @param fileDescriptor
       * @param message
       * @param offset
       */
      static saveFile(filePath: string, fileContent: string): Promise<unknown>;
      /**
       * Recursively creates a folder structure, as many levels
       * as needed
       * @param folderPath
       */
      static createFolder(folderPath: string): Promise<unknown>;
      /**
       * Copy a folder with its content
       * @param source
       * @param target
       */
      static copyFolderRecursiveSync(source: string, target: string): void;
      /**
       * Copy a file
       * @param source
       * @param target
       */
      static copyFileSync(source: string, target: string): void;
      /**
       * Copy a file async
       * @param source
       * @param target
       */
      static copyFile(source: string, target: string): Promise<unknown>;
      /**
       * Rename a file or a folder
       * @param source
       * @param name
       */
      static renameFileOrFolderSync(source: string, name: string): void;
      static removeDir(path: any, callback: any): any;
      static isJsFile(filePath: string): boolean;
      /**
       * Loads all the javascript files inside the folder and
       * returns an array with all the exports from each file
       * @param folderPath
       */
      static loadJsFolder(folderPath: string, recursive?: boolean): Promise<any[]>;
      /**
       * Check if the folder exists and you have permissions over it. It doesn't throw an error
       * but returns it instead.
       * @param folderPath
       */
      static fileOrFolderExists(folderPath: string): Promise<{
          exists: boolean;
          error?: Error;
      }>;
      /**
       * Tries to load the file path contents as JSON, can throw exceptions
       * @param filePath
       */
      static loadJsonFile<T>(filePath: string, options?: {
          encoding?: string;
          flag?: string;
      }): Promise<T>;
  }

}
declare module '@plugcore/core/src/logs/log.colors' {
  export enum ConsoleColors {
      reset = "\u001B[0m",
      bright = "\u001B[1m",
      dim = "\u001B[2m",
      underscore = "\u001B[4m",
      blink = "\u001B[5m",
      reverse = "\u001B[7m",
      hidden = "\u001B[8m",
      fgBlack = "\u001B[30m",
      fgRed = "\u001B[31m",
      fgGreen = "\u001B[32m",
      fgYellow = "\u001B[33m",
      fgBlue = "\u001B[34m",
      fgMagenta = "\u001B[35m",
      fgCyan = "\u001B[36m",
      fgWhite = "\u001B[37m",
      bgBlack = "\u001B[40m",
      bgRed = "\u001B[41m",
      bgGreen = "\u001B[42m",
      bgYellow = "\u001B[43m",
      bgBlue = "\u001B[44m",
      bgMagenta = "\u001B[45m",
      bgCyan = "\u001B[46m",
      bgWhite = "\u001B[47m"
  }

}
declare module '@plugcore/core/src/logs/log.decorators' {
  /**
   * Decorator made to easily inject name logger instances.
   * The name argument will be used to make that the uotput log objects
   * have a "name" property with this value. This way we can easly
   * filters logs with this name when they are stored in the db
   * @param sId
   */
  export function InjectLogger(name?: string): Function;

}
declare module '@plugcore/core/src/logs/logger' {
  import * as pino from 'pino';
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  /**
   * Class designed to be injected if other services in order to handle all the log levels
   */
  export class Logger {
      private projectConfiguration;
      private logName?;
      private connection?;
      private pinoLogger;
      pinoOptions: pino.LoggerOptions;
      constructor(projectConfiguration: Configuration, logName?: string | undefined, connection?: string | undefined);
      debug(...inMsgs: any): void;
      info(...inMsgs: any): void;
      warn(...inMsgs: any): void;
      error(...inMsgs: any): void;
      fatal(...inMsgs: any): void;
  }

}
declare module '@plugcore/core/src/object-mapper/object-mapper.interfaces' {
  /**
   * Defines how the object transformation has to be done
   */
  export type ObjectMappingDefinition<T> = Record<string, ObjectMappingValue<T> | string | (ObjectMappingValue<T> | string)[]>;
  /**
   * Function that has already stored a mapping operation and transform objects from
   * one structure to another
   */
  export type ObjectMapping<T1, T2> = (sourceObject: T1) => T2;
  export interface ObjectMappingValue<T, K extends keyof T = any> {
      key: K | string;
      transform: (inp: T[K] | any) => any;
      default?: () => T[K] | string | number | any;
  }

}
declare module '@plugcore/core/src/object-mapper/object-mapper.service' {
  import { DeepPartial } from '@plugcore/core/src/utils/typescript/index';
  import { ObjectMapping, ObjectMappingDefinition } from '@plugcore/core/src/object-mapper/object-mapper/index';
  export class ObjectMapper {
      /**
       * Given an object mappeing definiton creates a new object with that
       * structure
       * @param sourceObject
       * @param objectMapping
       */
      map<T1, T2>(objectMapping: ObjectMappingDefinition<T1>, sourceObject: T1): T2;
      /**
       * Given an object mappeing definiton creates a new object with that
       * structure and merges it with the secondg object
       * @param sourceObject
       * @param objectMapping
       */
      mapAndMerge<T1, T2>(objectMapping: ObjectMappingDefinition<T1>, sourceObject: T1, targetObject: DeepPartial<T2>): T2;
      /**
       * Creates a function that already has stored an object mapping and has the correct types
       * for source object and target object. This functions accepts a source objects ands performs
       * the stored mapping
       * @param objectMapping
       */
      createMapping<T1, T2>(objectMapping: ObjectMappingDefinition<T1>): ObjectMapping<T1, T2>;
  }

}
declare module '@plugcore/core/src/object-validator/object-validator.decorators' {
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  import { IArraySchemaValidator, INumberSchemaValidator, IStringSchemaValidator } from '@plugcore/core/src/object-validator/object-validator/index';
  export function IsString(options?: IStringSchemaValidator): (target: any, propertyKey: string) => void;
  export function IsNumber(options?: INumberSchemaValidator): (target: any, propertyKey: string) => void;
  export function IsBoolean(): (target: any, propertyKey: string) => void;
  export function IsArray(options?: IArraySchemaValidator): (target: any, propertyKey: string) => void;
  export function IsObject<T>(clazz: ClassParameter<T>): (target: any, propertyKey: string) => void;
  export function Required(): (target: any, propertyKey: string) => void;

}
declare module '@plugcore/core/src/object-validator/object-validator.service' {
  import * as Ajv from 'ajv';
  import { ValidationResult, CompiledValidation, ObjectValidatorFunction } from '@plugcore/core/src/object-validator/object-validator/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class ObjectValidator {
      private readonly ajv;
      /**
       * Executes a validation from a compiled JSON schema validation or form a JSON schema object
       * to the given object, and returns a `ValidationResult` wich has a property 'valid: boolean'
       * and a list of possible errors. It DOES not execute async validations
       * @param schemaOrValidateFunction
       * @param objToValidate
       */
      validate<T = any>(schemaOrValidateFunction: object | Ajv.ValidateFunction, objToValidate: T): ValidationResult;
      /**
       * Same than `validate`, but can perform an async validation
       * @param schemaOrValidateFunction
       * @param objToValidate
       */
      asyncValidate<T>(schemaOrValidateFunction: object | Ajv.ValidateFunction, objToValidate: T): Promise<ValidationResult>;
      /**
       * Given a valid JSON Schema object, it creates a function that is a compiled version of the
       * schema in order to improve performance
       * @param schema
       */
      compile(schema: object): CompiledValidation;
      /**
       * Same than `compile` but can execute async functionality
       * @param schema
       */
      asyncCompile(schema: object): Promise<CompiledValidation>;
      /**
       * Given a file path that poiints to a JSON Object, it loads and compiles it.
       * @param jsonFile
       */
      compileFromFile(jsonFile: string): Promise<Ajv.ValidateFunction>;
      /**
       * If you have a model class decorated with this module decorators such as
       * `@IsNumber()`, `@IsString()`, etc. Generates a valid JSON Schema object and compiles it
       * @param clazz
       */
      compileFromClass(clazz: ClassParameter<any>, options?: {
          asArray?: boolean;
          ignoreSchemaVersion?: boolean;
      }): Ajv.ValidateFunction;
      /**
       * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
       * version of JSON Schema file. This way you can store the funcion and call it
       * just with the value that you want to vaidate
       * @param jsonFile
       */
      createValidatorFromFile<T>(jsonFile: string): Promise<ObjectValidatorFunction<T>>;
      /**
       * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
       * version of the model class. This way you can store the funcion and call it
       * just with the value that you want to vaidate
       * @param clazz
       */
      createValidatorFromClass<T>(clazz: ClassParameter<T>): ObjectValidatorFunction<T>;
      /**
       * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
       * version of the model class. This way you can store the funcion and call it
       * just with the value that you want to vaidate
       * @param clazz
       */
      createValidatorFromClassAsArray<T>(clazz: ClassParameter<T>): ObjectValidatorFunction<T[]>;
  }

}
declare module '@plugcore/core/src/object-validator/object-validator.shared' {
  import * as Ajv from 'ajv';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export interface INumberSchemaValidator {
      maximum?: number;
      minimum?: number;
      exclusiveMinimum?: number;
      exclusiveMaximum?: number;
  }
  export interface IStringSchemaValidator {
      maxLength?: number;
      minLength?: number;
      pattern?: string;
      format?: 'date' | 'date-time' | 'uri' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'regex';
      formatMaximum?: string;
      formatMinimum?: string;
      formatExclusiveMaximum?: string;
      formatExclusiveMinimum?: string;
  }
  export interface IArraySchemaValidator {
      maxItems?: number;
      minItems?: number;
      uniqueItems?: boolean;
      items?: Record<string, any> | Record<string, any>[] | ClassParameter<any> | ClassParameter<any>[];
      additionalItems?: Record<string, any> | boolean;
  }
  export interface ValidationResult {
      valid: boolean;
      errors: Ajv.ErrorObject[];
  }
  export interface IPropertyValidatorMetadata<T extends TObjectValidatorProeprtyOptions> {
      property: string;
      type: EObjectValidatorPropertyTypes;
      options?: T;
  }
  export enum EObjectValidatorPropertyTypes {
      number = "number",
      string = "string",
      boolean = "boolean",
      array = "array",
      object = "object",
      required = "required"
  }
  export type TObjectValidatorProeprtyOptions = INumberSchemaValidator | IStringSchemaValidator | IArraySchemaValidator | ClassParameter<any> | undefined;
  export type CompiledValidation = Ajv.ValidateFunction;
  export type ObjectValidatorFunction<T> = (objToValidate: T) => ValidationResult;

}
declare module '@plugcore/core/src/object-validator/object-validator.utils' {
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  import { EObjectValidatorPropertyTypes, IPropertyValidatorMetadata, TObjectValidatorProeprtyOptions } from '@plugcore/core/src/object-validator/object-validator/index';
  export class ObjectValidatorDecoratorUtils {
      static readonly propertyMetadataPrefix = "p-object-validator-prop:";
      /**
       * Adds metadata to the target class about it's hoow to validate this field
       * @param inp
       */
      static addProperty(inp: {
          target: any;
          propertyKey: string;
          type: EObjectValidatorPropertyTypes;
          options?: TObjectValidatorProeprtyOptions;
      }): void;
      /**
       * Retrieves all the metadata added by the validator decorator to the target classes
       * @param clazz
       */
      static getClassProperties<T>(clazz: ClassParameter<T>): IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[];
      static sortClassProperties<T>(clazz: ClassParameter<T>): {
          objectProperties: Record<string, IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[]>;
          requiredProperties: IPropertyValidatorMetadata<undefined>[];
      };
  }
  export class ObjectValidatorUtils {
      private static readonly schemaVersion;
      /**
       * Generates a valid [Json schema](https://json-schema.org/) from a decorated class
       * with any of the validator decorators like `@IsString()`, `@IsNumber()`,
       * `@IsArray()`, `@IsObject()` or `@RequiredProperty()`
       * @param clazz
       */
      static generateJsonSchema<T>(clazz: ClassParameter<T>, options?: {
          asArray?: boolean;
          ignoreSchemaVersion?: boolean;
      }): Record<string, any>;
      /**
       * All array decorators that are using clases in the items property instead
       * of a JSON schema object, have to be changed, ex:
       * @IsArray({
       *	 items: [String, Number, Boolean],
       *   additionalItems: false
       * })
       * Has to be {
       *	 items: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
       *   additionalItems: false
       * }
       */
      private static changeArrayClassTypesToJsonSchema;
  }

}
declare module '@plugcore/core/src/project-init/project-init.cli' {
  #!/usr/bin/env node
  export {};

}
declare module '@plugcore/core/src/project-init/project-init.util' {
  export class PorjectInitialization {
      private static readonly defaultConfigurationFolder;
      /**
       * Starts the application from the ground, creating all the minimal dependencies
       * in the correct order. It takes as a parameter a folder from which it will lookup
       * for a configuration folder to load it, and fire the required events.
       */
      static start(projectFolder: string, configurationFolder?: string): void;
      private static setConfiguration;
  }

}
declare module '@plugcore/core/src/schedule/schedule.decorator' {
  import { IServiceArgs } from '@plugcore/core/src/dependecy-injection/di/index';
  export function Scheduler({ sId, ctx }?: IServiceArgs): (target: Function) => void;
  /**
   *
   * @param cronExp
   */
  export function ScheduledJob(cronExp: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;

}
declare module '@plugcore/core/src/schedule/schedule.structure' {
  export interface ExecutedJob {
      initialDate: number;
      endDate: number;
      outputLog: any;
      status: CronStatus;
      idJob: string;
      data: any;
      executionCron: string;
  }
  export interface RegisteredJob {
      idJob: string;
      defaultCron: string;
      lastTimeExecuted: number;
      nextTimeExecuted: number;
      defaultData?: any;
      repetible?: boolean;
  }
  export enum CronStatus {
      OK = 0,
      WAITING = 1,
      ERROR = 2
  }

}
declare module '@plugcore/core/src/schedule/scheduler' {
  export class CronUtils {
      private static cronPattern;
      private static rangeRegex;
      private static months;
      private static shortMonths;
      private static weekDays;
      private static shortWeekDays;
      private static wildCard;
      private static hyphen;
      private static comma;
      private static ranges;
      static createCronJob(expression: string, method: Function, clazz?: string | Function): void;
      private static manageCronExecution;
      static getTimeInMs(cronExp: number[][]): number;
      private static checkRange;
      static validateCron(expression: string): number[][];
      /**
       * 1. We parse the non numeric values
       * @param value
       * @param field
       * @param longVals
       * @param shortVals
       */
      private static replaceTextToNumber;
      /**
       * 2. Translate all wildcards to a given range of values
       * @param value
       * @param field
       */
      private static replaceWildCard;
      /**
       * 3. Parse ranges to plane numbers and return the values joined
       * @param value
       * @param field
       */
      private static replaceRanges;
      private static parseRanges;
  }

}
declare module '@plugcore/core/src/test/test.asserter' {
  import { IAssertOptions, ITestService } from '@plugcore/core/src/test/test/index';
  export class Asserter {
      private testClass;
      constructor(testClass: ITestService);
      /**
       * Tests for deep equality between the actual and expected parameters.
       */
      deepEqual(actual: any, expected: any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned
       * promise to complete. It will then check that the promise is not rejected.
       */
      doesNotReject(func: Promise<any> | (() => Promise<any>), { message, stopOnError }?: IAssertOptions): Promise<void>;
      /**
       * Asserts that the function fn does not throw an error.
       */
      doesNotThrow(func: () => any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Tests for deep strict inequality. Opposite of `assert.deepEqual()`
       */
      notDeepEqual(actual: any, expected: any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Tests strict inequality between the actual and expected parameters as determined by the `SameValue Comparison`.
       */
      notEqual(actual: any, expected: any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Tests if value is truthy. It is equivalent to `assert.equal(!value, true)`
       */
      ok(val?: any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the
       * returned promise to complete. It will then check that the promise is rejected.
       */
      rejects(func: Promise<any> | (() => Promise<any>), { message, stopOnError }?: IAssertOptions): Promise<void>;
      /**
       * Tests strict equality between the actual and expected parameters as determined by the `SameValue Comparison`.
       */
      equal(actual: any, expected: any, { message, stopOnError }?: IAssertOptions): void;
      /**
       * Expects the function fn to throw an error.
       */
      throws(func: () => any, { message, stopOnError }?: IAssertOptions): void;
      private controledExec;
      private controledAsyncExec;
      private getMethodAndClass;
  }

}
declare module '@plugcore/core/src/test/test.cli' {
  #!/usr/bin/env node
  export {};

}
declare module '@plugcore/core/src/test/test.decorators' {
  import 'reflect-metadata';
  import { ITestServiceArgs, ITestMethodArgs } from '@plugcore/core/src/test/test/index';
  /**
   * Decorate the class that envelops a determinated set of tests in order
   * to be able to execute them
   */
  export function TestService(decoratorArgs?: ITestServiceArgs): Function;
  /**
   * Use this in any method inside a class decorated with `@TestService()` to
   * execute it while testing. It can by an async or normal function.
   */
  export function Test(decoratorArgs?: ITestMethodArgs): Function;
  /**
   * Use this in any method inside a class decorated with `@TestService()` to
   * execute it before any tests are performed inside this class.
   * It can by an async or normal function.
   */
  export function BeforeTests(): Function;
  /**
   * Use this in any method inside a class decorated with `@TestService()` to
   * execute it after all tests are performed inside this class.
   * It can by an async or normal function.
   */
  export function AfterTests(): Function;

}
declare module '@plugcore/core/src/test/test.manager' {
  import { ITestServiceArgs, ITestMethodArgs } from '@plugcore/core/src/test/test/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class TestManager {
      private static testClasses;
      private static tmpMethods;
      private static tmpBeforeMethods;
      private static tmpAfterMethods;
      private static executionStats;
      private static initialExecutionTime;
      static executeTests(testFolder: string, argConfigFolder?: string): Promise<void>;
      static showTestsInfo(testFolder: string): Promise<void>;
      static registerTestService(clazz: ClassParameter<any>, decoratorArgs: ITestServiceArgs): void;
      static registerTestMethod(testClass: string, methodName: string, methodFunc: Function, decoratorArgs: ITestMethodArgs): void;
      static registerBeforeTestMethod(testClass: string, methodName: string, methodFunc: Function): void;
      static registerAfterTestMethod(testClass: string, methodName: string, methodFunc: Function): void;
      static assertErrorOnTest(testClass: string, testMethod: string): void;
      static assertSuccessOnTest(testClass: string, testMethod: string): void;
      static unexpectedAssertErrorOnTestMethod(testClass: string, testMethod: string): void;
      static unexpectedAssertErrorOnTestService(testClass: string): void;
      static finishedTestMethod(testClass: string, testMethod: string): void;
      static finishedTestService(testClass: string): void;
      private static loadTests;
      private static iterateOverTests;
      private static logTestService;
      private static logTestMethod;
      private static printTestsStart;
      private static printTestsExec;
      private static printTestsEnd;
      private static executeTestService;
      private static executeTestMethod;
      private static getTestServiceStat;
      private static getTestMethodStat;
  }

}
declare module '@plugcore/core/src/test/test.shared' {
  import { Asserter } from '@plugcore/core/src/test/test/index';
  import { ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class AsserterService {
      protected assert: Asserter;
  }
  export interface IAssertOptions {
      stopOnError?: boolean;
      message?: string;
  }
  export interface ITestServiceArgs {
      testThisOnly?: boolean;
      /**
       * If you want to import datasources the same way you do with
       * services you can use a connection
       */
      connection?: string;
  }
  export interface ITestMethodArgs {
      testThisOnly?: boolean;
  }
  export interface ITestService {
      clazz: ClassParameter<any>;
      name: string;
      testMethods: ITestMethod[];
      beforeTestMethods: ITestMethod[];
      afterTestMethods: ITestMethod[];
      testThisOnly?: boolean;
  }
  export interface ITestMethod {
      methodName: string;
      methodFunc: Function;
      testThisOnly?: boolean;
  }
  export interface ITestStats {
      className: string;
      success: boolean;
      unexpectedError: boolean;
      methods: ITestMethodStats[];
  }
  export interface ITestMethodStats {
      methodName: string;
      success: boolean;
      successAsserts: number;
      errorAsserts: number;
      unexpectedError: boolean;
  }
  export interface ITestMethodErrorToIgnore {
      ignoreTestError: boolean;
  }
  export type TTestServiceItFunc = (clazz: ITestService) => Promise<void>;
  export type TTestMethodItFunc = (method: ITestMethod, clazz: ITestService) => Promise<void>;
  export class TestTypeDetector {
      static isTestMethodErrorToIgnore(error: any): error is ITestMethodErrorToIgnore;
  }

}
declare module '@plugcore/core/src/test/test.utils' {
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  import { DeepPartial } from '@plugcore/core/src/utils/typescript/index';
  export class TestUtils {
      static createConfiguration(cfg: DeepPartial<Configuration>): Configuration & DeepPartial<Configuration>;
  }

}
declare module '@plugcore/core/src/utils/array.utils' {
  export class ArrayUtils {
      /**
       * Pushes the value/s to an existing array, or creates a
       * new one
       * @param val
       * @param arr
       */
      static append<T>(val: T | T[], arr?: any[]): T[];
      /**
       * Returns an array containing only the values that are
       * reapeated in both arrays
       * @param arr1
       * @param arr2
       */
      static onlySame<T>(arr1: T[], arr2: T[]): T[];
      /**
       * Safely flattens an "N" levels deep array of arrays
       * @param arr
       */
      static flat<T>(arr: T[][]): T[];
      /**
       * Flats an array of arrays and removes all duplicate entries
       * @param inp
       */
      static flatAndRemoveDuplicates<T>(inp: T[][]): T[];
      /**
       * Removes duplicate entries
       * @param inp
       */
      static removeDuplicates<T>(inp: T[]): T[];
      /**
       * Returns a map with all the repeated ocurrences counted.
       * Example: `ArrayUtils.countOcurrences([1, 1, 2]).get(1) // Returns 2 `
       * @param array
       */
      static countOcurrences<T extends string | number>(array: T[]): T extends string ? {
          [key: string]: number;
      } : {
          [key: number]: number;
      };
      /**
       * Filters out all of the values from the original array that also
       * appears in the second array, es: `([1, 2], [1]) = [2]`
       * @param original
       * @param toFilter
       */
      static filterArrs<T>(original: T[], toFilter: T[]): T[];
      /**
       * Checks if two arrays have the same contents independly of the order
       */
      static contentsAreTheSame<T>(arr1: T[], arr2: T[]): boolean;
      /**
       * Checks if any of the contents of one array are in the other one
       */
      static someContentsAreTheSame<T>(arr1: T[], arr2: T[]): boolean;
      /**
       * Creates an array from 0..maxNum, example:
       * `[0, 1]` from a maxNum of `2`. The offset is
       * if you want something like: `[1, 2]` with an
       * offset of 1
       * @param maxNum
       */
      static orderedNumArray(maxNum: number, ofset?: number): number[];
      /**
       * Creates an object which keys are different types of values of the field,
       * and inside it has all the objects that have the same value.
       * Example: `[{a: 1}, {a: 2}, {a:1}]` = `{ 1: [{a: 1}, {a: 1}], 2: [{a: 2}]}`
       * The `null` return type is there to prevent using keys wich value is not
       * string or number, but it will allways try to return an object
       * @param arr
       * @param field
       */
      static groupBy<T, K extends keyof T>(arr: T[], field: K): (T[K] extends string ? {
          [key: string]: T[];
      } : T[K] extends number ? {
          [key: number]: T[];
      } : null);
      /**
       * Puts the value of the field as a property of the object.
       * Be sure that every object in the array has differente values.
       * @param arr
       * @param field
       */
      static indexByField<T>(arr: T[], field: keyof T): {
          [key: string]: T;
      };
  }

}
declare module '@plugcore/core/src/utils/js-stack.utils' {
  /// <reference types="node" />
  export class JsStackUtils {
      static getLastCallFromStack(depth?: number): string;
      private static getCaller;
      static getStack(): NodeJS.CallSite[];
  }

}
declare module '@plugcore/core/src/utils/log.utils' {
  export class LogUtils {
      /**
       * Creates a "Self and total Time from start" indicating how
       * long some timer has been clocking for this specific block
       * of code and for the one enblogin this one
       */
      static selfAndTotalTimeFromStart(selfStart: number, totalStart: number): string;
      private static getMs;
  }

}
declare module '@plugcore/core/src/utils/object.utils' {
  import { IObjectEntry } from '@plugcore/core/src/utils/utils/index';
  export class ObjectUtils {
      /**
       * Recursively removes all unused attributes of an object
       * @param inp
       */
      static deepReduction(inp: Record<string, any>): void;
      /**
       * Detects all the new or modified attributres from the original
       * objtect to the new object recursively. It excludes the attributes
       * this are not defined in the new object.
       * The overrideAttrWithMissingElements paramter will override any object attribute that has
       * missing sub attributes in the original object, example: __origObject__ `{ a: { a1: 1, a2: 2 }}`
       * __newObject__ `{ a: {a1: 1 }}` the result will be `{ a: {a1: 1 }}`
       * @param origObject
       * @param newObject
       * @param overrideAttrWithMissingElements
       */
      static detectChanges<T, K>(origObject: T, newObject: K, overrideAttrWithMissingElements?: boolean): Partial<T & K>;
      static detectChangesBetweenArrays(arr1: any[], arr2: any[]): any[];
      /**
       * Deeply merges two or more objects, it means that all sub properties of all the
       * source objects will be applied to the target object
       * @param target
       * @param sources
       */
      static deepMerge<T, K>(target: T, ...sources: K[]): T | T & K;
      /**
       * Deeply merges two or more objects, it means that all sub properties of all the
       * source objects will be applied to the target object
       * @param target
       * @param sources
       */
      static mergeArrays<T, K>(originArr: T[], newArr: K[]): (T | K)[];
      /**
       * Deep and truly clones a js object without the problems of
       * `Object.assign({}, obj)` with sub properties
       * https://stackoverflow.com/a/40294058
       * @param obj Object to clone
       * @param hash internal ussage hash
       */
      static deepClone<T extends Record<string, any>>(obj: T, hash?: WeakMap<object, any>): T;
      /**
       * Removes all attributes that are like `{ attr: {} }` and it does it recursivley,
       * it means that `{ attr: { sub: {} }  }` = `{}`
       * @param obj
       */
      static cleanEmptyObjects<T>(obj: T): T;
      /**
       * Removes all attributes that are like `{ attr: [] }`
       * @param obj
       */
      static cleanEmptyArrays<T>(obj: T): T;
      /**
       * Returns an array with an entry for every value in the object, it goes throught
       * all sub properties and array elements.
       * @param obj
       * @param func
       */
      static walkThroughObject<T extends Record<string, any>>(obj: T, currVals?: IObjectEntry[]): IObjectEntry[];
      /**
       * Behaves like `Object.assign()` but takes into account subproperties
       * @param base
       * @param override
       */
      static deepAssign<T extends Record<string, any>, K extends Record<string, any>>(base: T, override: K): T & K;
      /**
       * Applies `Object.freeze()` recursivley to all objects defined as properties from
       * the original object. See frozen objects in
       * [MDN documentation](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/freeze).
       *
       */
      static deepFreeze<T>(object: any): T;
      private static isMergebleObject;
  }

}
declare module '@plugcore/core/src/utils/promise.utils' {
  export class PromiseUtils {
      /**
       * Executes a large list of promises in batch, but sinces functions that create promises
       * are executen the moment you call them, yo can't just execute all of them at once, therefore
       * you have to pass an array of elemnts and a function that will convert those elements into a promise
       * to be executed
       * @param sourceObjs Source objects
       * @param funcPerObj Function to convert said object into a promise
       * @param batchSize Number of promises to execute at the same time
       */
      static execInBatch<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>, batchSize: number): Promise<(R | Error)[]>;
      /**
       * Executes the function for each object in the array secuentially
       * @param sourceObjs
       * @param funcPerObj
       */
      static execSecuentally<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>): Promise<R[]>;
      /**
       * Waits for a promise to resolve x seconds, if it doesn't respond or it
       * generates an error, the promise gets rejected
       * @param promiseToExec
       * @param miliseconds
       */
      static timeOut<T>(promiseToExec: Promise<T>, miliseconds: number): Promise<T>;
      /**
       * Generates a promise that will wait what you pass to it
       * @param milsToWait
       */
      static wait(milsToWait: number): Promise<unknown>;
  }

}
declare module '@plugcore/core/src/utils/string.utils' {
  export class StringUtils {
      /**
       * Shows the string version of the given object with 2 levels
       * of properties depth, but it can be changed with the depth
       * parameter. It uses the same format that `console.log`, it's
       * not a valid JSON
       * @param inp
       * @param depth
       */
      static objToStr(inp: Record<string, any>, depth?: number): string;
      /**
       * Returns a string with all the elements in the input array
       * separated by commas
       * @param inp
       */
      static arrayToString(inp: any[]): string;
      /**
       * Replaces non ASCII characters
       * @param inp
       */
      static normalizeText(inp: string, toLowerCase?: boolean, replaceSpaces?: boolean): string;
      /**
       * Creates a random string id with A-z chars
       * @param length 7 by default
       */
      static createRandomId(length?: number): string;
      /**
       * Uppercases the first letter
       * @param inp
       */
      static capitalize(inp: string): string;
  }

}
declare module '@plugcore/core/src/utils/type.checker' {
  /// <reference types="node" />
  import { TPrimitive, ClassParameter } from '@plugcore/core/src/utils/typescript/index';
  export class TypeChecker {
      static isString(arg: any): arg is string;
      static isNumber(arg: any): arg is number;
      static isBoolean(arg: any): arg is boolean;
      static isSymbol(arg: any): arg is Symbol;
      static isUndefined(arg: any): arg is undefined;
      static isNull(arg: any): arg is null;
      static isPrimitive(arg: any): arg is TPrimitive;
      static isObject(arg: any): arg is Record<string, any>;
      static isArray<T>(arg: any): arg is T[];
      static isError(arg: any): arg is Error;
      static isClass(arg: any): arg is ClassParameter<any>;
      static isBuffer(arg: any): arg is Buffer;
      static isPromise<T = unknown>(arg: any): arg is Promise<T>;
      static typeIsString(arg: any): arg is String;
      static typeIsNumber(arg: any): arg is Number;
      static typeIsBoolean(arg: any): arg is Boolean;
      static typeIsPrimitive(arg: any): arg is TPrimitive;
      private static hasValue;
  }

}
declare module '@plugcore/core/src/utils/typescript.utils' {
  export type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : T[P] extends readonly (infer U)[] ? readonly DeepPartial<U>[] : DeepPartial<T[P]>;
  };
  export type ThenArg<T> = T extends Promise<infer U> ? U : T;
  /**
   * Removes properties from type
   */
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  export type TPrimitive = boolean | null | undefined | number | string | Symbol;
  export interface ClassParameter<T> {
      new (...args: any[]): T;
  }

}
declare module '@plugcore/core/src/utils/utils.interfaces' {
  export interface IObjectEntry {
      value: any;
      objRef: Record<string, any>;
      key: string;
  }

}
declare module '@plugcore/core/src/utils/validator.utils' {
  export class ValidatorUtils {
      /**
       * Determines that the param is not null nor undefined.
       * If it's an string, then it also determines that the string is not empty
       */
      static isDefined<T>(inp: T | undefined | null): inp is T;
      /**
       * Wrapper of Nodejs `assert.deepStrictEqual`, determines if both objects
       * have the same properties an properties values
       * @param obj1
       * @param obj2
       */
      static deepEqual<T1 = Record<string, any>, T2 = Record<string, any>>(obj1: T1, obj2: T1 | T2): obj2 is T1;
      /**
       * Wrapper of Nodejs `assert.strictEqual`, determines if two variables are the same.
       * If you wish to compare objects, use `ValidatorUtils.deepEqual`, this is ment to
       * other variable types such as  strings, numbers, etc.
       * @param inp1
       * @param inp2
       */
      static equal<T1, T2>(inp1: T1, inp2: T1 | T2): inp2 is T1;
      /**
       * Check if the string desn't exists or it has an empty value
       * @param inp
       */
      static isBlank(inp: string | undefined | null): inp is undefined | null | '';
      /**
       * Check if the string exists and has value
       * @param inp
       */
      static isNotBlank(inp: string | undefined | null): inp is string;
  }

}
declare module '@plugcore/core/test/configuration/configuration-loader.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class ConfigurationLoaderTest extends AsserterService {
      private customConfigurationService;
      private readonly testFilesFolder;
      beforeTests(): Promise<void>;
      injectConfiguration(): Promise<void>;
      loadProjectConfiguration(): Promise<void>;
      loadFile(): Promise<void>;
  }

}
declare module '@plugcore/core/test/configuration/customconfiguration.service' {
  import { Configuration } from '@plugcore/core/src/configuration/configuration/index';
  export class CustomConfigurationService {
      private configuration;
      constructor(configuration: Configuration);
      getConfiguration(): Configuration;
  }

}
declare module '@plugcore/core/test/data-source/data-source-example' {
  import { Configuration, ConnectionConfiguration } from '@plugcore/core/src/configuration/configuration/index';
  export class DatasourceExampleConfiguration implements ConnectionConfiguration {
      type: string;
      stringProp: string;
      numberProp: number;
  }
  export class DataSourceExample {
      private connection;
      private configuration;
      private connectionConfiguration;
      constructor(connection: string, configuration: Configuration);
      getConfiguration(): DatasourceExampleConfiguration;
      getConnection(): string;
  }

}
declare module '@plugcore/core/test/data-source/data-source.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class DatasourceTest extends AsserterService {
      private dataSourceExample;
      beforeTest(): Promise<void>;
      datasourceExampleCreated(): Promise<void>;
      creationErrores(): Promise<void>;
      datasourcesUtils(): Promise<void>;
  }

}
declare module '@plugcore/core/test/demo-project/init.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class InitTest extends AsserterService {
      private readonly initTestFolder;
      startApp(): Promise<void>;
  }

}
declare module '@plugcore/core/test/dependecy-injection/container.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class DiContainerTest extends AsserterService {
      private example1;
      private example2;
      private example3;
      private example4;
      private example5;
      private example6;
      private example7;
      private example8;
      private example9;
      private example10;
      private example11;
      private example12;
      private example13;
      private example14;
      private example15;
      private example16;
      private example17;
      private example18;
      private example19;
      private example20;
      private example21;
      private example22;
      beforeStart(): Promise<void>;
      serviceWithInject(): void;
      serviceWithIDiOnInit(): void;
      serviceWith2Injects(): void;
      serviceWithConstructorDependencies(): void;
      serviceWithCustomSId(): void;
      serviceForCustomCtx(): void;
      serviceForCustomCtxInjectinAnotherServiceFromSameCtx(): void;
      serviceForCustomCtxWithReferencesOtherCtxs(): void;
      serviceWithVariationVar(): void;
      serviceWithVariation(): void;
      servicesWithInjectedConnections(): void;
      servicesWithOptionalConnections(): void;
      servicesWithOptionalVariations(): void;
      servicesWithPartialOptionalVariations(): void;
      servicesWithPrimitiveTypeDependencies(): void;
      mixBetweenConnectionAndOptionalVariationVars(): void;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di1.example' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  import { Di2Example } from '@plugcore/core/test/dependecy-injection/examples/di2/index';
  export class Di1Example implements OnInit {
      private example2;
      timesOnInitCalled: number;
      getExample2(): Di2Example;
      onInit(): Promise<void>;
      asyncLoad(): Promise<void>;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di10.example' {
  import { Di3Example } from '@plugcore/core/test/dependecy-injection/examples/di3/index';
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  export class Di10Example {
      private example3;
      private example1;
      private variationVar;
      timesConstructorCalled: number;
      constructor(example3: Di3Example, example1: Di1Example, variationVar: string);
      getExample3(): Di3Example;
      getExample1(): Di1Example;
      getVariationVar(): string;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di11.example' {
  import { Di10Example } from '@plugcore/core/test/dependecy-injection/examples/di10/index';
  export class Di11Example {
      private d10example2;
      timesConstructorCalled: number;
      private d10example1;
      constructor(d10example2: Di10Example);
      getD10example1(): Di10Example;
      getD10example2(): Di10Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di12.example' {
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  export class Di12Example {
      private di1Example;
      private connection;
      timesConstructorCalled: number;
      constructor(di1Example: Di1Example, connection: string);
      getDi1Example(): Di1Example;
      getConnection(): string;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di13.example' {
  export class Di13Example {
      timesConstructorCalled: number;
      private connection;
      constructor();
      getConnection(): string;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di14.example' {
  import { Di12Example } from '@plugcore/core/test/dependecy-injection/examples/di12/index';
  import { Di13Example } from '@plugcore/core/test/dependecy-injection/examples/di13/index';
  export class Di14Example {
      private di13Example;
      timesConstructorCalled: number;
      private di12Example;
      constructor(di13Example: Di13Example);
      getDi12Example(): Di12Example;
      getDi13Example(): Di13Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di15.example' {
  export class Di15Example {
      private stringExample;
      private connection?;
      constructor(stringExample: string);
      getConnection(): string | undefined;
      getStringExample(): string;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di16.example' {
  export class Di16Example {
      private connection?;
      private numberExample;
      constructor(connection?: string | undefined);
      getConnection(): string | undefined;
      getNumberExample(): number;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di17.example' {
  export class Di17Example {
      private booleanExample;
      private optionalVariationNumber?;
      private optionalVariationString?;
      constructor(booleanExample: boolean, optionalVariationNumber?: number | undefined);
      getOptionalVariationString(): string | undefined;
      getOptionalVariationNumber(): number | undefined;
      getBooleanExample(): boolean;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di18.example' {
  import { Di15Example } from '@plugcore/core/test/dependecy-injection/examples/di15/index';
  import { Di16Example } from '@plugcore/core/test/dependecy-injection/examples/di16/index';
  import { Di17Example } from '@plugcore/core/test/dependecy-injection/examples/di17/index';
  export class Di18Example {
      private di16Example;
      private di17Example;
      private di15Example;
      constructor(di16Example: Di16Example, di17Example: Di17Example);
      getDi15Example(): Di15Example;
      getDi16Example(): Di16Example;
      getDi17Example(): Di17Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di19.example' {
  import { Di15Example } from '@plugcore/core/test/dependecy-injection/examples/di15/index';
  import { Di16Example } from '@plugcore/core/test/dependecy-injection/examples/di16/index';
  import { Di17Example } from '@plugcore/core/test/dependecy-injection/examples/di17/index';
  export class Di19Example {
      private di16Example;
      private di17Example2;
      private di17Example3;
      private di17Example4;
      private di15Example;
      private di17Example1;
      constructor(di16Example: Di16Example, di17Example2: Di17Example, di17Example3: Di17Example, di17Example4: Di17Example);
      getDi15Example(): Di15Example;
      getDi16Example(): Di16Example;
      getDi17Example1(): Di17Example;
      getDi17Example2(): Di17Example;
      getDi17Example3(): Di17Example;
      getDi17Example4(): Di17Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di2.example' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  export class Di2Example implements OnInit {
      testNumber: number;
      timesOnInitCalled: number;
      onInit(): Promise<void>;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di20.example' {
  export class Di20Example {
      private varConstructor;
      private varConstructorConnection;
      private varProp;
      constructor(varConstructor: string, varConstructorConnection: string);
      getVarProp(): string;
      getVarConstructor(): string;
      getVarConstructorConnection(): string;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di21.example' {
  import { Di20Example } from '@plugcore/core/test/dependecy-injection/examples/di20/index';
  export class Di21Example {
      private di20Example1;
      private di20Example2;
      private di20Example3;
      private di20Example4;
      constructor(di20Example1: Di20Example, di20Example2: Di20Example, di20Example3: Di20Example, di20Example4: Di20Example);
      getDi20Example1(): Di20Example;
      getDi20Example2(): Di20Example;
      getDi20Example3(): Di20Example;
      getDi20Example4(): Di20Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di22.example' {
  import { Di20Example } from '@plugcore/core/test/dependecy-injection/examples/di20/index';
  export class Di22Example {
      private di20Example1;
      private di20Example2;
      private di20Example3;
      private di20Example4;
      constructor(di20Example1: Di20Example, di20Example2: Di20Example, di20Example3: Di20Example, di20Example4: Di20Example);
      getDi20Example1(): Di20Example;
      getDi20Example2(): Di20Example;
      getDi20Example3(): Di20Example;
      getDi20Example4(): Di20Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di3.example' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  import { Di2Example } from '@plugcore/core/test/dependecy-injection/examples/di2/index';
  export class Di3Example implements OnInit {
      testNumber: number;
      private example2;
      private example1;
      timesOnInitCalled: number;
      getExample2(): Di2Example;
      getExample1(): Di1Example;
      onInit(): Promise<void>;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di4.example' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  import { Di3Example } from '@plugcore/core/test/dependecy-injection/examples/di3/index';
  export class Di4Example implements OnInit {
      private example3;
      private example1;
      timesConstructorCalled: number;
      constructor(example3: Di3Example, example1: Di1Example);
      onInit(): Promise<void>;
      getExample3(): Di3Example;
      getExample1(): Di1Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di5.example' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  import { Di2Example } from '@plugcore/core/test/dependecy-injection/examples/di2/index';
  import { Di6Example } from '@plugcore/core/test/dependecy-injection/examples/di6/index';
  export class Di5Example implements OnInit {
      private example6;
      private example2;
      timesConstructorCalled: number;
      timesOnInitCalled: number;
      private example1;
      constructor(example6: Di6Example, example2: Di2Example);
      onInit(): Promise<void>;
      getExample1(): Di1Example;
      getExample2(): Di2Example;
      getExample6(): Di6Example;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di6.example' {
  export class Di6Example {
      timesOnInitCalled: number;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di7.example.ctx' {
  import { OnInit } from '@plugcore/core/src/dependecy-injection/di/index';
  export class Di7Example implements OnInit {
      timesOnInitCalled: number;
      onInit(): Promise<void>;
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di8.example.ctx' {
  import { Di7Example } from '@plugcore/core/test/dependecy-injection/examples/di7.example/index';
  export class Di8Example {
      di7Example: Di7Example;
      timesConstructorCalled: number;
      constructor(di7Example: Di7Example);
  }

}
declare module '@plugcore/core/test/dependecy-injection/examples/di9.example.ctx' {
  import { Di1Example } from '@plugcore/core/test/dependecy-injection/examples/di1/index';
  import { Di8Example } from '@plugcore/core/test/dependecy-injection/examples/di8.example/index';
  export class Di9Example {
      di8Example: Di8Example;
      di1Example: Di1Example;
      timesConstructorCalled: number;
      constructor(di8Example: Di8Example, di1Example: Di1Example);
  }

}
declare module '@plugcore/core/test/ds-http/http-datsource.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class HttpDatasourceTest extends AsserterService {
      private readonly getEx;
      private readonly postEx;
      private readonly putEx;
      private readonly pathcEx;
      private readonly deleteEx;
      private httpClient;
      private httpsClient;
      private readonly mokPost;
      private readonly mokPost2;
      private readonly mokPost3;
      private readonly mokPost4;
      beforeTests(): Promise<void>;
      httpTests(): Promise<void>;
      httpsTests(): Promise<void>;
      otherFormats(): void;
  }

}
declare module '@plugcore/core/test/ds-http/http-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class HttpUtilsTest extends AsserterService {
      private readonly getEx;
      private readonly postEx;
      private readonly putEx;
      private readonly pathcEx;
      private readonly deleteEx;
      httpTests(): Promise<void>;
      httpsTests(): Promise<void>;
  }

}
declare module '@plugcore/core/test/events/events.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class EventsTest extends AsserterService {
      executeEvent(): Promise<void>;
  }

}
declare module '@plugcore/core/test/events/examples/events.example' {
  export const testEventName = "testEvent";
  export class EventsExample {
      payload: any;
      readyFunc: Function;
      onTestEvent(payload: any): void;
  }

}
declare module '@plugcore/core/test/io/fs-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class FsUtilsTest extends AsserterService {
      getAllFilesFromFolder(): void;
      getFilesStats(): void;
      getFolderFiles(): void;
      getStats(): void;
      loadFile(): void;
      openLogFile(): void;
      openNormalFile(): void;
      writeToFile(): void;
      copyFolderRecursiveSync(): void;
      copyFileSync(): void;
      renameFileOrFolderSync(): void;
      removeDir(): void;
      isJsFile(): void;
      loadJsFolder(): void;
  }

}
declare module '@plugcore/core/test/logs/logger.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  import { TestLogConnectionService } from '@plugcore/core/test/logs/testlog.connection/index';
  import { TestLogService } from '@plugcore/core/test/logs/testlog/index';
  export class LoggerTest extends AsserterService {
      private testLogService;
      private testLogConnectionService;
      constructor(testLogService: TestLogService, testLogConnectionService: TestLogConnectionService);
      log(): Promise<void>;
  }

}
declare module '@plugcore/core/test/logs/testlog.connection.service' {
  import { Logger } from '@plugcore/core/src/logs/logger';
  export class TestLogConnectionService {
      private connectionLog;
      private namedLog;
      constructor(connectionLog: Logger, namedLog: Logger);
      outputLogs(): void;
  }

}
declare module '@plugcore/core/test/logs/testlog.service' {
  import { Logger } from '@plugcore/core/src/logs/logger';
  export class TestLogService {
      private mainLog;
      constructor(mainLog: Logger);
      outputLogs(): void;
  }

}
declare module '@plugcore/core/test/object-mapper/object-mapper.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  /**
   * Tests from https://github.com/wankdanker/node-object-mapper
   */
  export class ObjectMapperTest extends AsserterService {
      private objectMapper;
      beforeTests(): Promise<void>;
      map(): Promise<void>;
      mapAndMerge(): Promise<void>;
      createMapping(): Promise<void>;
  }

}
declare module '@plugcore/core/test/object-validator/object-validator.models' {
  export class MyCustomSubModel {
      numberSubProp: number;
      stringSubProp: string;
      boolSubProp: boolean;
  }
  export class MyCustomModel {
      numberProp: number;
      stringProp: string;
      arrayProp: (string | number | boolean)[];
      objectsArrayProp: MyCustomSubModel[];
      subPropr: MyCustomSubModel;
  }

}
declare module '@plugcore/core/test/object-validator/object-validator.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class ObjectValidatorDecorators extends AsserterService {
      private objectValidator;
      private jsonFileSchema;
      private jsonFileDataOk;
      private jsonFileDataError;
      private customClassDataOk;
      private customClassDataError;
      private readonly basePath;
      private jsonFileSchemaPath;
      private jsonFileDataOkPath;
      private jsonFileDataErrorPath;
      private customClassDataOkPath;
      private customClassDataErrorPath;
      beforeTests(): Promise<void>;
      validateWithObject(): Promise<void>;
      compile(): Promise<void>;
      compileFromFile(): Promise<void>;
      validateWithFunction(): Promise<void>;
      compileFromClass(): Promise<void>;
      createValidatorFromFile(): Promise<void>;
      createValidatorFromClass(): Promise<void>;
      createValidatorFromClassAssArray(): Promise<void>;
  }

}
declare module '@plugcore/core/test/utils/array-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class ArrayUtilsTest extends AsserterService {
      append(): void;
      onlySame(): void;
      flat(): void;
      flatAndRemoveDuplicates(): void;
      removeDuplicates(): void;
      countOcurrences(): void;
      filterArrs(): void;
      contentsAreTheSame(): void;
      someContentsAreTheSame(): void;
      orderedNumArray(): void;
      groupBy(): void;
      indexByField(): void;
  }

}
declare module '@plugcore/core/test/utils/js-stak-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class JsStackUtilsTest extends AsserterService {
      getLastCallFromStack(): void;
      getStack(): void;
      private stackLvl1;
      private stackLvl2;
      private stackLvl3;
      private lastCallstackLvl1;
      private lastCallstackLvl2;
      private lastCallstackLvl3;
  }

}
declare module '@plugcore/core/test/utils/log-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class LogUtilsTest extends AsserterService {
      selfAndTotalTimeFromStart(): void;
  }

}
declare module '@plugcore/core/test/utils/object-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class ObjectUtilsTest extends AsserterService {
      deepReduction(): void;
      detectChanges(): void;
      detectChangesBetweenArrays(): void;
      deepMerge(): void;
      mergeArrays(): void;
      deepClone(): void;
      cleanEmptyObjects(): void;
      cleanEmptyArrays(): void;
      walkThroughObject(): void;
      deepAssign(): void;
  }

}
declare module '@plugcore/core/test/utils/promise-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class PromiseUtilsTest extends AsserterService {
      execInBatch(): Promise<void>;
      execSecuentally(): Promise<void>;
      timeOut(): Promise<void>;
      wait(): Promise<void>;
  }

}
declare module '@plugcore/core/test/utils/string-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class StringUtilsTest extends AsserterService {
      objToStr(): void;
      arrayToString(): void;
      normalizeText(): void;
      createRandomId(): void;
      capitalize(): void;
  }

}
declare module '@plugcore/core/test/utils/type-checker.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class TypeCheckerTest extends AsserterService {
      isString(): void;
      isNumber(): void;
      isBoolean(): void;
      isObject(): void;
      isArray(): void;
      isClass(): void;
      typeIsString(): void;
      typeIsNumber(): void;
      typeIsBoolean(): void;
  }

}
declare module '@plugcore/core/test/utils/validator-utils.test' {
  import { AsserterService } from '@plugcore/core/src/test/test/index';
  export class ValidatorUtilsTest extends AsserterService {
      isDefined(): void;
      deepEqual(): void;
      equal(): void;
      isBlank(): void;
      isNotBlank(): void;
  }

}
declare module '@plugcore/core' {
  import main = require('@plugcore/core/index');
  export = main;
}