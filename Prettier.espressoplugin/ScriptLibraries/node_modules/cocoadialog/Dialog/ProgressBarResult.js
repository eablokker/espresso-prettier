const ControlResult = require('../Core/ControlResult');

/**
 * @class ProgressBarResult
 *
 * Constructs a result object for the ProgressBar control.
 *
 * @extends ControlResult
 */
class ProgressBarResult extends ControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);

    this.items = [];

    /**
     * @name ProgressBarResult~control
     * @type {ProgressBar}
     */
  }

  /**
   * @inheritDoc
   */
  process() {
    this.items = this.control.items;
  }

}

module.exports = ProgressBarResult;
