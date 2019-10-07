const { buildProject, printError } = require('./script-utils');
const { join } = require('path');

async function buildCore() {

	// Var declarations
	const projectFolder = join(__dirname, '..', 'app-shared');
	await buildProject(projectFolder);

}

// Execution boilerplate
(async () => {
	try {
		await buildCore();
	} catch (error) {
		printError('Error on Core build', error);
	}
})();

