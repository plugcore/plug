 
# Plugcore Framework
 
![plugcore.com](https://raw.githubusercontent.com/plugcore/plug/master/_docs/logo.png "plugcore.com")
 
El objeto de este framework es ayudar con todas las necesidades de una API REST, y también conseguir que tenga el mejor rendimiento y seguridad.
 
Internamente usa un inyector de dependencias personalizado para ayudar con la arquitectura del proyecto, y todos los módulos relacionados como la creación de APIs, conexiones a bases de datos, etc, también están integrados en este sistema. El inyector de dependencias está basado en clases de Typescript con decoradores.
 
La implementación interna del sistema de API está basada en [Fastify](https://www.fastify.io/) para crear servidores ligeros, y de momento sólo tiene soporte para conexiones a [MongoDB](https://www.mongodb.com), pero otros conectores están de camino.
 
Puedes [leer toda la documentación en nuestra Github Wiki](https://github.com/plugcore/plug/wiki/%C3%8Dndice).
 
Actualmente estás en la versión en __Español__ de este documento, también está disponible en los siguientes idiomas: 
- [English](https://github.com/plugcore/plug/)
 
## Módulos
 
De momento hay 3 módulos:
- [@plugcore/core](https://www.npmjs.com/package/@plugcore/core): Contiene las funcionalidades más basicas como el inyector de dependencias, logs, validador y transformador de objetos, framework de test, cli, configuración del proyecto, etc.
- [@plugcore/web](https://www.npmjs.com/package/@plugcore/web): Agrega todoas las librerías necesarias para la publicación de API REST.
- [@plugcore/ds-mongodb](https://www.npmjs.com/package/@plugcore/ds-mongodb): Conector MongoDB integrado con el sistem de inyeccion de dependencias.
 
## Instalación
 
La forma más sencilla de usar el framework es inicializarlo en una carpeta, que normalmente será un repositorio de GIT recién clonado:
 
```
mkdir myproject
- ó -
git clone https://server.com/git/myproject.git
```
 
De esta manera ya sólo tenemos que ejecutar:
 
```
cd myproject
npx @plugcore/core init
```
 
Aparecerán algunas preguntas que te guiarán en la creación del proyecto, si es tu primera vez te recomendamos crear la demo con una base de datos en memoria que se hace pasar por una instancia de MongoDB, de esta manera podremos iniciar y probar el framework desde el primer momento:
 
```
Do you want to create a basic demo with API REST and a MongoDB client? (y/yes): yes
Do you want to use an in memory database mocked as MongoDB for development or tests purposes? (y/yes): yes
```
 
Una vez la instalación a terminado, nos quedará una estructura del proyecto parecida a esta:
 
```
myproject/                                -- Carpeta del proyecto
    ├── configuration/                    -- Carpeta encargada de guardar todos los archivos de configuración
    │    ├── configuration.json           -- Archivo de configuración por defecto
    │    └── configuration.pro.json       -- Propiedades que se sobreescribirán cuando se ejecute en modo producción
    ├── src                               -- Código fuente del proyecto
    │   ├── configuration                 -- Carpeta para guardar todos los tipos relacionados con la configuración
    │   │   └── custom.configuration.ts   -- Interfaz de la nuestra configuración personalizada
    │   └── example                       -- Carpeta donde vamos a guardar todo lo relacionado con la entidad Example
    │       ├── example.api.ts            -- Archivo donde estarán las definiciones de los objetos de entrada/salida de la API de Example
    │       ├── example.controller.ts     -- Controlador API REST que publicará todos las rutas relacionadas con la entidad Example
    │       ├── example.service.ts        -- Servicio conectado a una MongoDB, que se encargará de todas las operaciones relacionadas con la collection Example
    │       └── example.shared.ts         -- Todas las interfaces, types, enums, etc. compartidas en el proyecto que sean de la entidad Example
    ├── test                              -- Carpeta para guardar todos nuestros Test Service
    │   └── example                       -- Carpeta de los test relacionados con la entidad Example
    │       └── example-service.test.ts   -- Test service para src/example/example.service.ts
    ├── node_modules/                     -- NPM node_modules
    ├── package.json                      -- NPM package.json, con todas las dependencias y scripts necesarios
    └── tsconfig.json                     -- Archivo de configuración Typescript
```
 
Y ya podremos iniciar el servidor ejecutando simplemente
 
```
npm start
```
 
O si queremos iniciarlo en modo desarrollo, es decir que cada vez que se modifique un archivo se recompilará el proyecto y reiniciará el servidor, podemos ejecutar:
 
```
npm run dev
```
 
Y ya podemos ir a [http://localhost:3000/api/documentation](http://localhost:3000/api/documentation) para ver los servicios que tenemos creados.
 
