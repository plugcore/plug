export interface Plug {
	name: string;
	type: 'holiday-hotels' | 'my-rentacar' | 'world-airlines' | 'best-tours';
	desc: string;
	id?: number;
	create_date?: number;
	create_user?: string;
	modify_date?: number;
	modify_user?: string;
}

export type PlugFromDb = Required<Plug>;
