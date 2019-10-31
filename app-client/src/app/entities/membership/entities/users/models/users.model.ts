export interface User {
	name: string;
	role: number;
	id?: number;
	create_date?: number;
	create_user?: string;
	modify_date?: number;
	modify_user?: string;
}

export type UserFromDb = Required<User>;
