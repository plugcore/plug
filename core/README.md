![Plugdata.io](../_docs/logo.png?raw=true "Plugdata.io")

# @plugdata/core

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

# Otros módulos de Plugdata.io
Ver más en [este link](https://github.com/plugdata/plugdata).
