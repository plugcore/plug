import { ChildProcess } from 'child_process';
import { spawn } from 'child_process';
import { createInterface } from 'readline';


export class CliUtils {
	/**
     * Execute a terminal  command
     * @param commandName
     * @param opts
     */
	public static async executeCommand(commandName: string, opts: string[]) {
		return new Promise((resolve, reject) => {
			let hasError = false;
			try {
				const child = spawn(commandName, opts, { stdio: [process.stdin, process.stdout, process.stderr] });
				if (child.stdout) {
					child.stdout.on('data', (data) => {
						console.log(data);
					});
				}
				if (child.stderr) {
					child.stderr.on('data', (data) => {
						hasError = true;
						console.error(data);
					});
				}

				child.on('close', () => {
					if (hasError) {
						reject(new Error('Error while esecuting command ' + commandName + opts.join(' ')));
					} else {
						resolve();
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	public static async promt(question: string) {

		const rl = createInterface({
			input: process.stdin,
			output: process.stdout
		});

		return new Promise((resolve, reject) => {
			try {
				rl.question(question, (answer) => {
					rl.close();
					resolve(answer);
				});
			} catch (error) {
				reject(error);
			}

		});

	}

}
