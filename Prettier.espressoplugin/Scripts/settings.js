#!/usr/bin/env node

var prettier = require('../ScriptLibraries/node_modules/prettier');
var spawn = require('child_process').spawn;

// The absolute path to the file
var editorPath = process.env.EDITOR_PATH;

// Search for custom config recursively up to the home folder:
var config = prettier.resolveConfig.sync(editorPath);
var configFile = prettier.resolveConfigFile.sync(editorPath);

var message = '';

if (config !== null) {
	// Config file found:
	message = 'Config found:';
	message += '\n';
	message += '\n';
	message += 'Location';
	message += '\n';
	message += configFile;
	message += '\n\n';
	message += 'Options';
	message += '\n';
	for (var property in config) {
		if (config.hasOwnProperty(property)) {
			message += '"' + property + '"' + ': ' + config[property] + '\n';
		}
	}
	message += '\n';
} else {
	// Error, no config found:
	message = 'No config found.';
	message += '\n';
	message += '\n';
	message += 'Prettier first looks in the current folder for the following files:\n\nA "prettier" property in package.json\nA ".prettierrc" file\nA "prettier.config.js" file that exports an object\n\nIf no config is found, then it looks for these files in parent folders up to your home folder.\n\n';
}

message += 'See prettier.io for available config options.';

function escapeForShell(message) {
	return message.replace(/"/g, '\\"');
}

var osascript = spawn(
	'osascript',
	['-e', "tell application \"Espresso\" to display dialog \"" + escapeForShell(message) + "\" buttons \"OK\" default button 1 with title \"Prettier\" with icon note"],
	{
		detached: true,
		stdio: 'ignore'
	}
);

osascript.unref();
