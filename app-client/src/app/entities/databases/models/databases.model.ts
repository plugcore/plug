export interface Database {
	name: string;
	id?: number;
	create_date?: number;
	create_user?: string;
	modify_date?: number;
	modify_user?: string;
}

export type DatabaseFromDb = Required<Database>;
