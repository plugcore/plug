export interface ScheduledJob {
	name: string;
	cron: string;
	nextExecution: number;
	desc: string;
	inputModel?: Record<string, any>;
	id?: number;
}

export type ScheduledJobFromDb = ScheduledJob & { id: number };
