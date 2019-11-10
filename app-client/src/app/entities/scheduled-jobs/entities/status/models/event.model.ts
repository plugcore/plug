export interface Event {
	name: string;
	status: EventStatus;
	jobType: string;
	id?: number;
	create_date?: number;
	create_user?: string;
	eventDetails?: {
		input: Record<string, any>;
		errors?: string[];
	};
}

export type EventFromDb = Event & {
	id: number;
	create_date: number;
	create_user: string;
};

export type EventDetails = Event['eventDetails'];

export type EventDetailsFromDb = Required<EventDetails>;

export enum EventStatus {
	SCHEDULED = 'SCHEDULED',
	QUEUED = 'INFO',
	RUNNING = 'RUNNING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED'
}
