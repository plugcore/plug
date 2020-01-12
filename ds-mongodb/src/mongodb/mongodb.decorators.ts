import { IServiceArgs } from '@plugdata/core';

/**
 * Injects a `MongoDbConnection` instance with a connection configured inside
 * your `configuration.json` => `{ data: { connections: MongodbConnection[] } }`
 */
/* export function NamedMongodbConnection(inp: (IServiceArgs & { connName: string }) | string): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {

		const type = Reflect.getMetadata(RmdConstats.objectClass, target, propertyName);

		if (!sId) { sId = type; }
		if (!sId && index !== undefined) {
			const constructorParms = <Function[]>Reflect.getMetadata(RmdConstats.constructorParams, target);
			sId = constructorParms[index];
		}

		if (sId) {

			if (target instanceof Function && index !== undefined) {
				// Constructor inject

				Container.registrerConstructorHandler(
					target.name, sId, index, ctx, true);

			} else if (target instanceof Object) {
				// Property inject

				Container.registerDepLeft(target.constructor.name, sId, ctx, true);
				Container.get(sId, ctx).then(dep => {
					Object.defineProperty(target, propertyName, {
						enumerable: true,
						writable: true,
						configurable: true,
						value: dep
					});

				});

			}
		}

	};

}
 */
