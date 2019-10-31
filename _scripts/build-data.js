/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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

