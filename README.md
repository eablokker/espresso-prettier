# Prettier plugin for Espresso 5
This is a plugin for MacRabbit's [Espresso](https://espressoapp.com/) code editor with support for the [Prettier](https://github.com/prettier/prettier) plugin.

## Requirements
- [Espresso v3+](https://espressoapp.com/)
- [Node.js v6+](http://nodejs.org/)

## Features
This Espresso plugin uses [Prettier](https://github.com/prettier/prettier), an opinionated code formatter with support for JavaScript, ES2017, JSX, TypeScript, CSS, Less, SCSS, JSON, GraphQL, and Markdown. It removes all original styling and ensures that all outputted code conforms to a consistent style.

## Usage
Select *Text > Prettier > Format Code* or choose from the *Actions* dropdown to format your code using Prettier. If you don't want to affect the entire document, you can make one or multiple text selections before performing the action.

## Custom configuration
This plugin uses Prettier's default configuration and honors your Espresso settings regarding tabs and line endings.

If your project has an `.editorconfig` file, Prettier will use those settings instead of your Espresso settings. You can override the .editorconfig settings by using a custom configuration file.

To use your own custom configuration, you can configure Prettier via:

* A `.prettierrc` file, written in YAML or JSON, with optional extensions: `.yaml/.yml/.json/.js`.
* A `prettier.config.js` file that exports an object.
* A `"prettier"` key in your `package.json` file.

The configuration file will be resolved starting from the location of the file being formatted,
and searching up the file tree until a config file is found.

Some examples of how to make [configuration files](https://prettier.io/docs/en/configuration.html) and a list of [configuration options](https://prettier.io/docs/en/options.html) can be found on [prettier.io](https://prettier.io/docs/en/index.html)

## Installation

1. Download and extract the zip
2. Double-click the Prettier.espressoplugin file to install
