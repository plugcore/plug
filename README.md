
# Pludata.io Framework

![Plugdata.io](_docs/logo.png?raw=true "Plugdata.io")

En este repositorio hay todos los módulos que comprenden el framework de [Plugdata.io](https://plugdata.io).
El objetivo de este framework es la creación rápida y robusta de APIs, teniendo en cuenta todos los aspectos relacionados a esta como por ejemplo logs, eventos, documentación, etc.

# Demo

Para entender mejor el potencial del framework, hemos creado una demo con ejemplos de todas las funcionalidades básicas como por ejemplo creación de APIs, documentación, logs, eventos, configuración, etc.

Puedes entrar en el repositorio [https://github.com/plugdata/plugdata-demo](https://github.com/plugdata/plugdata-demo) para ver el código en más detalle, __pero te invitamos a descargártelo e instalarlo localmente, el proceso está automatizado y serán sólo unos minutos__.

## Requisitos de la instalación

- Nodejs 10.16 o superior con npm (se instala por defecto cuando instalas Nodejs). [Guía de instalación](https://nodejs.org)
- Git. [Guía de instalación](https://git-scm.com/downloads)
- MongoDB. [Guía de instalación](https://docs.mongodb.com/manual/installation/)

## Instalación

- Para poder probar este proyecto en local lo más sencillo es clonarse el proyecto:

```
git clone https://github.com/plugdata/plugdata-demo.git
```

- Ir a la carpeta e instalar

```
cd plugdata-demo
npm i
```

- Configurar la conexión con MongoDB

	1. Abrir el archivo `configuration\configuration.dev.json`
	2. Modificar los valores de `data.url` y `data.databaseName` con los valores de la conexión a nuestra instalación de MongoDB, así como se indica en esta plantilla:
```json
{
	"data": {
		"url": "mongodb://[USER]:[PASSWORD]@[IP_OR_DOMAIN]:27017/[LOGIN_DATABASE]",
		"databaseName": "[DATABASE_NAME]"
	}
}
```

Cabe destacar que se está instalando todo localmente en este proyecto y no se va a hacer ninguna instalación de módulos globales NPM ya que se hace uso extenso en los npm scripts de [npx](https://www.npmjs.com/package/npx) para ejecutar todos los métodos desde el `node_modules` del proyecto. De esta manera no se tiene que preocupar de versiones globales de módulos como `tsc`.

## Scripts

Ahora que ya lo tenemos instalado ya lo podemos poner en marcha, hacer tests, etc.
Para ejecutar estos comandos nos tenemos que posicionar en la carpeta del proyecto (plugdata-demo) por linea de comandos y escribir:

- `npm start`: Inicia el servidor como si fuera en producción
- `npm run dev`: Inicia el proyecto en modo desarrollo, es decir que cada vez que guardemos se reinicia el servidor
- `npm test`: Ejecuta los tests
- `npm run test:dev`: Ejecuta los tests en modo desarrollo, de tal manera que cada vez que se guarde un archivo se vuelvan a ejecutar los tests

## Estructura de carpetas

- `src`: Contiene todo el código ejecutable del proyecto, como controladores, servicios, etc.
  - `configuration`: Aquí nos crearemos nuestra interfaz que contendrá todos los atributos extras que necesitemos
  - `vehicle`: Esta es una carpeta de tipo entidad, es decir que aquí habrá todos los *.ts que tengan que ver con vehículos.
    - `vehicle.model.ts`: Aquí tenemos las clases o interfaces que tengan que ver con el modelo de base de datos
    - `vehicle.service.ts`: Este es un servicio controlado por el inyector de dependencias que tiene la conexión con la base de datos y se encarga de gestionar todas las operaciones de la Collection de Vehículos. Normalmente usará siempre las clases/interfaces definidas en `vehicle.model.ts``
    - `vehicle.api.ts`: Aquí tendremos todos los modelos que se refieran a la API, es decir que indiquen que Requests y que Responses vamos a tener, que parámetros etc. Todas las clases que definamos aquí nos servirán para 3 cosas:
      1. __Para validar todas las request__. Es decir que si indicamos que el objeto de entrada debe tener cierta propiedad de tipo string y que sea obligatoria, el sistema lo hará automáticamente por nosotros.
      2. __Para generar la documentación__. Todos los métodos en los que indiquemos que objetos hay de entrada y de salida aparecerán cuando queramos ver la documentación de la API. Esto además servirá para crear clientes automáticamente en un futuro.
      3. __Tipificar el controlador__. Esto ya es algo más propio de Typescript, pero todo lo que haya aquí nos servirá para ayudarnos en los controladores y tener más controlados los tipos de entrada/salida.
    - `vehicle.controller.ts:` Es una clase de tipo controlador que define el prefijo de url, por ejemplo "/vehicle", y sobre el cual vamos a agregar todos los métodos HTTP que queramos. Ahora está puesto un ejemplo de RESTFUL con operaciones CRUD.
    - `vehivle.events.ts`: Ejemplo de servicio que se encarga de recibir eventos.
- `test`: Contiene los tests del proyecto, no se ejecutarán como el resto del proyecto, sólo cuando hagas `npm run test`
- `configuration`: Contiene todos los archivos json de configuración de todos los entornos. En este caso se ha dejado el archivo `configuration.dev.json` con una configuración de base de datos, pero normalmente estos archivos no estarán gestionados por git y se pondrán manualmente en cada entorno.
- 
## URLs

Para empezar un buen ejemplo hacer un `POST` a `http://localhost:3000/vehicle` con un objeto del estilo:
```
{
    "model": "Tesla S1",
    "year": 2019
}
```

Podremos ver todos nuestros vehículos creados haciendo una petición a [http://localhost:3000/vehicle](http://localhost:3000/vehicle).

Para la documentación podemos acceder a [http://localhost:3000/api-documentation.json](http://localhost:3000/api-documentation.json)


## Conclusión de la demo

Hay ejemplos y comentarios por todas las clases del código, y se ha intentando seguir buenas prácticas a la hora de crear los nombres y la estructura, así que puedes usar este proyecto como plantilla para crear nuevas implementaciones y aprender más sobre plug framework haciendo pruebas.

Muchas gracias por probar, si encuentras cualquier problema por favor deja abre un ticket en: [https://github.com/plugdata/plugdata-/issues](https://github.com/plugdata/plugdata/issues)

# Listado de módulos

El framework se comprende en un listado de módulos con objetivos concretos. Esto hará posible que en cada implementación realizada con el framework sólo se utilizen las librerías necesarias y evitar carga innecesaria, a parte de otros beneficios como por ejemplo separación de conceptos y control en el desarrollo.

## @plugdata/core

[![https://nodei.co/npm/@plugdata/core.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugdata/core.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugdata/core)

Módulo principal que será necesario para cualquier  implementación, sus principales características son.

- __Inyección de dependencias__:  Es una implementación personalizada basada en una sintaxis decoradora, y será la piedra angular de todos nuestros módulos y productos. Esta sección está relacionada con nuestra filosofía de API consistente, ya que todo será administrado y configurado por el contenedor. Está influenciado por [typedi](https://github.com/typestack/typedi), pero con una funcionalidad ampliada para satisfacer nuestras necesidades. 

- __Configuración__: Habrá un archivo de configuración principal que tendrá todo lo necesario para la configuración de otros paquetes, implementaciones personalizadas y futuros productos. Se basa en archivos JSON, que podrán hacer referencia a variables de entorno y tener diferentes versiones para diferentes entornos (producción, pre-producción, desarrollo, etc...). 

- __Logs__: Para todos nuestros registros usaremos [pino](https://github.com/pinojs/pino), ya que se ajusta a nuestra filosofía y tenemos una gran conectividad con otros productos como [Elastic logs](https://www.elastic.co/es/solutions/logging).

- __Cliente Http y Https__:  Tenemos un cliente http/s liviano que es un simple contenedor promisificado del cliente [http/s de Nodejs](https://nodejs.org/api/http.html#http_http_get_options_callback) con métodos sencillos para realizar llamadas REST JSON. 

- __Manejador de eventos \*\*Próximamente\*\*__: Es una adaptación de [EventEmitter3](https://github.com/primus/eventemitter3#readme) a nuestro sistema de inyección de dependencias. Tiene casi la misma API que los [eventos Node JS](https://nodejs.org/api/events.html) pero con algunas adiciones como contextos, por lo que no será necesario llamar a `.bind(this)`, y se eliminarán algunos métodos innecesarios para un mejor rendimiento.

- __Validación de objetos__: Una integración con nuestra inyección de dependencia de [AJV](https://github.com/epoberezkin/ajv) que admite el [draft-07 of JSON Schema](http://json-schema.org/latest/json-schema-validation.html) y es una de las bibliotecas mantenidas más rápidas y mejores para este propósito.

- __Utilidades genéricas__: Durante el desarrollo de varios proyectos, hemos estado reuniendo algunas utilidades de uso común, principalmente para la manipulación de objetos y promises, y otros envoltorios de NodeJS para cosas como llamadas al sistema de archivos. 

- __Tests__: Es una biblioteca de prueba simple que utiliza la [Node JS assert library](https://nodejs.org/api/assert.html) para su validación y se basa en clases de Typescript con una integración a nuestro sistema de inyección de dependencias. No pretende ser una biblioteca de pruebas con todas las funciones como las ya existentes, y sabemos que es una elección personal de cada equipo, por lo que ofrecemos sólo una posibilidad para pruebas simples, y la usamos para todas nuestras pruebas internas, por lo que También tendrá integración con otros paquetes de `datos` y `web`. 

## @plugdata/data

[![https://nodei.co/npm/@plugdata/data.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugdata/data.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugdata/data)

En este módulo se incluirá todo lo relacionado con la persistencia de datos en cualquier sistema, especialmente en bases de datos SQL y NoSQL.

- __NoSql__: Inicialmente soportamos MongoDB dentro de nuestro sistema de inyección de dependencias y sistema de configuración, pero planeamos ir agregando otras implementaciones específicas para otras bases de datos.

- __ORM \*\*Próximamente\*\*__: Para nuestra gestión de bases de datos SQL usamos [TypeORM](https://typeorm.io/) que es un ORM con todas las funciones para las bases de datos SQL más utilizadas. Esto está totalmente integrado con nuestra configuración y sistemas de inyección de dependencias. 

- __Impration/exportation \*\*Próximamente\*\*__: Utiliza las utilidades de TypeORM para crear JSON para la importación / exportación de datos entre diferentes sistemas, pudiendo seleccionar las tablas y colecciones con el soporte de consultas.

## @plugdata/web

[![https://nodei.co/npm/@plugdata/web.png?downloads=false&downloadRank=false&stars=false](https://nodei.co/npm/@plugdata/web.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/@plugdata/web)

Aquí encontraremos todo lo necesario para la comunicación en web, como por ejemplo la generación de APIs REST.

- __Web framework__: Para la creación de APIs.

- __OAS 3__: Creemos que se necesita una buena documentación para una buena API, evento si es solo para uso interno. Esto agrega soporte para una fácil creación de archivos de descripción de [OAS 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md), pudiendo agregar pequeños trozos de documentación para cada operación creada, por lo que se actualiza fácilmente al mismo tiempo que cambia el código, y se puede versionar. 

- __Login \*\*Próximamente\*\*__:  Fácil integración de mecanismos de inicio de sesión básicos como `basic auth` o `JWT`, pero también fácil de ampliar para estrategias de inicio de sesión personalizadas, y se agregará nuevo soporte en el futuro. 

# Filosofía

- __Typescript__: Nos gusta mucho el rumbo que ha tomado Typescript desde sus inicios y creemos que ofrece justo las herramientas que necesita un proyecto de estas características.

- __Baja sobrecarga__: Nuestra herramienta utiliza el número mínimo de paquetes y librerías para que sea lo más fácil de mantener y mejorar. Esto proporciona un alto rendimiento por un bajo coste en infraestructura. 

- __Consistent internal API__: Otro problema que se encuentra uno en este tipo de librerías 
: Another problem with nowadays projects is that every library usually has a different way of doing things: configuration, execution (callbacks, promises, etc) and not always has a good support for Typescript. We try our best to create a consistent API for all functionality, it being: logs, scheduled jobs, database, APIs, etc. This can be done thanks to our custom dependency injection (see more below), configuration interfaces and extensive usage of decorators.

- __Rendimiento__: 
This connects directly to our low overhead philosophy, in all our decisions we always take performance as a high priority point. We'll keep track of it by constantly updating and running benchmarks against other libraries and ourselves.

- __Sistema de versiones__: Como práctica común en los paquetes npm, utilizaremos un [control de versiones semántico](https://semver.org/) para todos nuestros paquetes, y todos los paquetes tendrán la misma versión. Es decir, que si subimos de la versión 2.1.0 a 2.1.1, todos los paquetes relacionados con plugdata tendrán esta nueva versión

- __Seguridad__: Hoy en día la seguridad es algo que hay que tener en cuenta al mismo nivel que cualquier otra característica, por ello va a haber un gran enfoque en mantener unas librerías actualizadas y seguras, y estar atento a las últimas técnicas de seguridad web.
