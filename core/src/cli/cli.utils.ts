import { ChildProcess } from 'child_process';
import { spawn } from 'child_process';


export class CliUtils {
	/**
     * Execute a terminal  command
     * @param commandName
     * @param opts
     */
	public static executeCommand(commandName: string, opts: string[]): ChildProcess {
		const child = spawn(commandName, opts, { stdio: [process.stdin, process.stdout, process.stderr] });
		return child;
	}
}
