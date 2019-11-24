const ThreeButtonControlResult = require('../Core/ThreeButtonControlResult');

/**
 * @class RadioResult
 *
 * Constructs a result object for the Radio control.
 *
 * @extends ThreeButtonControlResult
 */
class RadioResult extends ThreeButtonControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);

    /**
     * Selected item index.
     *
     * @type {Number|String}
     */
    this.selected = null;

    /**
     * @name RadioResult~control
     *
     * @type {Radio}
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

    this.selected = this.stdout.shift();
    if (!this.control.options.stringOutput) {
      this.selected = parseInt(this.selected);
    }
  }

}

module.exports = RadioResult;
