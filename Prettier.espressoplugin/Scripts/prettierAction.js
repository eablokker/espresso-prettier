action.performWithContext = function(context, outError) {

	var snippetOptions = CETextOptionNormalizeIndentationLevel | CETextOptionNormalizeLineEndingCharacters | CETextOptionNormalizeIndentationCharacters;

	var selections = context.selectedRanges;
	var selection = context.selectedRanges[0];

	var pluginsPath = '~/Library/Application\\ Support/Espresso/Plug-Ins';
	var scriptPath = '~/Library/Application\\ Support/Espresso/Plug-Ins/Prettier.espressoplugin/Scripts/prettier.js';

	var nodeMissingMessage = 'Prettier was not able to find Node.js\n\nPlease install Node on your system and make sure the Node command is available in Terminal\n\nhttps://nodejs.org/en/download/';

	var scriptMissingMessage = 'Prettier was not able to find your Plug-Ins folder\n\nPrettier.espressoplugin must be installed in\n~/Library/Application Support/Espresso/Plug-Ins/';

	var scriptErrorMessage = 'Prettier Node script failed';

	var firstSnippet = new CETextSnippet('`if ! node -v > /dev/null; then echo "$EDITOR_SELECTION"; '+dialog(nodeMissingMessage)+'; elif ! test -d '+pluginsPath+'; then echo "$EDITOR_SELECTION"; '+dialog(scriptMissingMessage, 'caution')+'; else node '+scriptPath+' || { '+dialog(scriptErrorMessage, 'caution')+'; echo "$EDITOR_SELECTION"; }; fi`');

	var snippet = new CETextSnippet('`node '+scriptPath+' || { '+dialog(scriptErrorMessage, 'caution')+'; echo "$EDITOR_SELECTION"; };`');

	function dialog(message, icon) {
		return '{ nohup osascript -e \'tell application "Espresso" to display dialog "' + message + '" buttons "OK" default button 1 with title "Prettier" with icon ' + ( icon ? icon : 'note' ) + '\' &> /dev/null& }';
	}

	var newSelections = [];
	function insertSnippets(selections, args) {
		
		var insertedOffset = 0;
		var insertSnippets = selections.every(function(sel, index, array) {
			var offsetLocation = sel.location + insertedOffset;
			context.selectedRanges = [new Range(offsetLocation, sel.length)];

			if (index === 0) {
				if (!context.insertTextSnippet(firstSnippet, snippetOptions)) return false;
			} else {
				if (!context.insertTextSnippet(snippet, snippetOptions)) return false;
			}

			var insertedSnippetEnd = context.selectedRanges[0].location;
			var newLineRange = context.lineStorage.lineRangeForIndex(insertedSnippetEnd);

			// Remove newline added by Prettier
			if (args.removeNewlines === true) {
				var removeNewLineRecipe = new CETextRecipe();
				removeNewLineRecipe.deleteRange(newLineRange);
				if (!context.applyTextRecipe(removeNewLineRecipe)) return false;
			}

			insertedSnippetEnd = insertedSnippetEnd - newLineRange.length;

			insertedOffset = insertedSnippetEnd - (sel.location + sel.length);
			newSelections[index] = new Range(offsetLocation, insertedSnippetEnd - offsetLocation);
			return true;
		});

		return insertSnippets;
	}

	// Comb entire file if no selection
	if (selections.length <= 1 && selection.length === 0) {
		var documentRange = new Range(0, context.string.length);
		context.selectedRanges = [documentRange];

		if (!insertSnippets(context.selectedRanges, { removeNewlines: false })) return false;
		context.selectedRanges = [selection];
		return true;
	} else {
		if (!insertSnippets(context.selectedRanges, { removeNewlines: true })) return false;
		context.selectedRanges = newSelections;
		return true;
	}
};
