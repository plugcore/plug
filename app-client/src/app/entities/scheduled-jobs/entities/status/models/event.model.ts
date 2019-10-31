export interface Event {
	name: string;
	status: EventStatus;
	id?: number;
	create_date?: number;
	create_user?: string;
}

export type EventFromDb = Required<Event>;

export interface EventDetails {
	id: number;
	message: {};
}

export type EventDetailsFromDb = Required<EventDetails>;

export enum EventStatus {
	SCHEDULED = 'ERROR',
	QUEUED = 'INFO',
	RUNNING = 'RUNNING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED'
}
