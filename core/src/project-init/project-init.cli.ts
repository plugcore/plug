#!/usr/bin/env node

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
