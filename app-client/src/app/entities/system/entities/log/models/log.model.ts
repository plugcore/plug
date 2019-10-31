export interface Log {
	name: string;
	level: LogLevel;
	id?: number;
	create_date?: number;
	create_user?: string;
}

export type LogFromDb = Required<Log>;

export interface LogDetails {
	id: number;
	message: {};
}

export type LogDetailsFromDb = Required<LogDetails>;

export enum LogLevel {
	ERROR = 'ERROR',
	INFO = 'INFO'
}
