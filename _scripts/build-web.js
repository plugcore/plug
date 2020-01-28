const { buildProject, printError } = require('./script-utils');
const { join } = require('path');

async function buildWeb() {

	// Var declarations
	const projectFolder = join(__dirname, '..', 'web');
	await buildProject(projectFolder, 'web');

}

// Execution boilerplate
(async () => {
	try {
		await buildWeb();
	} catch (error) {
		printError('Error on Web build', error);
	}
})();

