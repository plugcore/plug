export interface Database {
	name: string;
	desc: string;
	type: 'MongoDb' | 'Postgres' | 'MySQL';
	url: string;
	credentials: Record<string, any>;
	extraSettings?: Record<string, any>;
	schemas: {
		url: string;
		name: string;
	}[];
}

export type DatabaseFromDb = Required<Database>;
