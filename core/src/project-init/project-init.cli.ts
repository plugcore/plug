#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isAbsolute, join } from 'path';
import { PorjectInitialization } from './project-init.util';
const commandArguments = process.argv;

try {
	const args = commandArguments.slice(2);
	// Test folder
	const distFolderArg = args[0] || join('dist', 'src');
	const configurationFolderArg = args[1];
	const distFolder = isAbsolute(distFolderArg) ? distFolderArg : join(process.cwd(), distFolderArg);

	PorjectInitialization.start(distFolder, configurationFolderArg);
} catch (error) {
	console.log('Error on project start', error);
}
