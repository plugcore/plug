#!/usr/bin/env node

import start from './commands/start.command';
import help from './commands/help.command';
import init from './commands/init.command';
import test from './commands/test.command';

const commands: any = {
	start,
	help,
	init,
	test,
};
const base = process.cwd();

if (process.argv.length >= 3) {

	const command = process.argv[2];
	const args = (process.argv.length >= 3) ? process.argv.slice(3) : [];

	if (commands[command]) {
		commands[command](args, base);
	} else {
		help([], true);
	}

} else {
	help([], true);
}
