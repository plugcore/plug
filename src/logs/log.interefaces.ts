import { LogLevels } from './log.enums';

export interface LogEntry {

	level: LogLevels;
	message: string;
	timestamp: number;
	clazz: string;
	ext: string;
}
