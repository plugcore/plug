import { spawn } from 'child_process';
import { createInterface } from 'readline';


export class CliUtils {
	/**
     * Execute a terminal  command
     * @param commandName
     * @param opts
     */
	public static async executeCommand(commandName: string, opts: string[]) {
		return new Promise<void>((resolve, reject) => {
			let hasError = false;
			try {
				// TODO: Remove any
				const child: any = spawn(
					commandName, opts, { stdio: [process.stdin, process.stdout, process.stderr] });
				if (child.stdout !== null) {
					child.stdout.on('data', (data: any) => {
						console.log(data);
					});
				}
				if (child.stderr) {
					child.stderr.on('data', (data: any) => {
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

	public static async promt(question: string): Promise<string> {

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
