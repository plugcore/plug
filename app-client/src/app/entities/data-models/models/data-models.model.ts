export interface DataModel<T extends PossibleDatamodels = undefined> {
	id?: string;
	name: string;
	desc: string;
	type: 'database' | 'plug' | 'custom';
	meta: T;
	attributes: Record<string, any>;
}

export type DataModelFromDb = Required<DataModel<PossibleDatamodels>>;
export type PossibleDatamodels = DmMetaDatabase | DmMetaPlug | undefined;

export interface DmMetaDatabase {
	databaseName: string;
	databaseType: 'MongoDb' | 'Postgres' | 'MySQL';
	schema: string;
}

export interface DmMetaPlug {
	plug: string;
}
