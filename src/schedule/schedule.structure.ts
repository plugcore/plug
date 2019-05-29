
export interface ExecutedJob {
	initialDate: number;
	endDate: number;
	outputLog: any;
	status: CronStatus;
	idJob: string;
	data: any;
	executionCron: string;
}

export interface RegisteredJob {
	idJob: string;
	defaultCron: string;
	lastTimeExecuted: number;
	nextTimeExecuted: number;
	defaultData?: any;
	repetible?: boolean;
}

export enum CronStatus {
	OK,
	WAITING,
	ERROR
}
