const { buildProject, printError } = require('./script-utils');
const { join } = require('path');

async function buildData() {

	// Var declarations
	const projectFolder = join(__dirname, '..', 'data');
	await buildProject(projectFolder);

}

// Execution boilerplate
(async () => {
	try {
		await buildData();
	} catch (error) {
		printError('Error on Data build', error);
	}
})();

