const ThreeButtonControlResult = require('../Core/ThreeButtonControlResult');

/**
 * @class CheckBoxResult
 *
 * Constructs a result object for the CheckBox control.
 *
 * @extends ThreeButtonControlResult
 */
class CheckBoxResult extends ThreeButtonControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);

    /**
     * Checked item keys.
     *
     * @type {Array}
     */
    this.checked = [];

    /**
     * Mixed item keys.
     *
     * @type {Array}
     */
    this.mixed = [];

    /**
     * Items.
     *
     * @type {Array}
     */
    this.items = [];

    /**
     * Unchecked item keys.
     *
     * @type {Array}
     */
    this.unchecked = [];

    /**
     * @name CheckBoxResult~control
     *
     * @type {CheckBox}
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

    this.items = this.control.options.items;


    let values = this.stdout.shift();

    if (!values) {
      return;
    }

    values.toLowerCase().split(' ').filter(Boolean).forEach((item, i) => {
      if (item === 'on' || item === '1') {
        this.checked.push(i);
      }
      else if (item === 'off' || item === '0') {
        this.unchecked.push(i);
      }
      else if (item === 'mixed' || item === '-1') {
        this.mixed.push(i);
      }
    });

  }

}

module.exports = CheckBoxResult;
