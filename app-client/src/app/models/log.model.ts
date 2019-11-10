
export interface LogFromDb<T = Record<string, any>> {
	name: string;
	level: string |number;
	time: number;
	pid: number;
	hostname: string;
	v: string;
	id: string;
	msg?: string;
	additionalProperties?: T;
}

export type TPartialLog<T = Record<string, any>> = Pick<LogFromDb<T>, 'level' | 'msg' | 'additionalProperties'>;

export const LEVELS = {
	default: 'USERLVL',
	60: 'FATAL',
	50: 'ERROR',
	40: 'WARN ',
	30: 'INFO ',
	20: 'DEBUG',
	10: 'TRACE'
};
