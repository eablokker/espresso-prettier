const ControlResult = require('../Core/ControlResult');

/**
 * @class FileSelectResult
 *
 * Constructs a result object for the FileSelect control.
 *
 * @extends ControlResult
 */
class FileSelectResult extends ControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);


    /**
     * @name FileSelectResult~control
     * @type {FileSelect}
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

    // Set the files property.
    this.files = this.stdout.filter(Boolean);
    this.stdout = [];

    // Set aborted state based on if there were any files selected.
    if (!this.files.length) {
      this.abort('No file selected!');
    }
  }

}

module.exports = FileSelectResult;
