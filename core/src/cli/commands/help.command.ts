
export default function help(args: string[], becouseOfError?: boolean) {

	if (becouseOfError) {
		console.log('\n*** Invalid command ***\n');
	}

	console.log('Usage: plug [options]\n');
	console.log('Options:\n');
	console.log('\tstart:	Starts the project');
	console.log('\ttest:	Executes the tests inside this project');
	console.log('\tinit:	Initializes a new project in the current folder');

}
