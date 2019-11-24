const ThreeButtonControlResult = require('../Core/ThreeButtonControlResult');

/**
 * @class InputResult
 *
 * Constructs a result object for input based controls.
 *
 * @extends ThreeButtonControlResult
 */
class InputResult extends ThreeButtonControlResult {

  /**
   * @inheritDoc
   */
  constructor(control, numeric = false) {
    super(control);

    /**
     * Flag indicating whether result should be numeric.
     *
     * @type {Boolean|String}
     */
    this.numeric = numeric;

    /**
     * The value of the control's input.
     *
     * @type {String}
     */
    this.value = '';
  }

  /**
   * @inheritDoc
   */
  process() {
    this.value = this.stdout.join('\n');
    if (this.numeric && !this.control.options.stringOutput) {
      if (this.numeric === 'float') {
        this.value = parseFloat(this.value);
      }
      else {
        this.value = parseInt(this.value);
      }
    }
  }

}

module.exports = InputResult;
