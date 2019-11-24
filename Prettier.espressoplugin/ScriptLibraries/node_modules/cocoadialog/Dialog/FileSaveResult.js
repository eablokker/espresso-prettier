const ControlResult = require('../Core/ControlResult');

/**
 * @class FileSaveResult
 *
 * Constructs a result object for the FileSave control.
 *
 * @extends ControlResult
 */
class FileSaveResult extends ControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);

    /**
     * The filename provided.
     *
     * @type {String}
     */
    this.filename = '';


    /**
     * @name FileSaveResult~control
     * @type {FileSave}
     */
  }

  /**
   * @inheritDoc
   */
  process() {
    // Process parent class and immediately return if there's an error.
    super.process();
    if (this.error) {
      return;
    }

    // Set the filename property.
    this.filename = this.stdout.filter(Boolean).shift();
    this.stdout = [];

    // Set aborted state based on if a filename was provided.
    if (!this.filename) {
      this.abort('No filename provided!');
    }
  }

}

module.exports = FileSaveResult;
