const ThreeButtonControl = require('../Core/ThreeButtonControl');
const InputResult = require('./InputResult');

/**
 * @class InputBox
 *
 * Constructs a InputBox control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class InputBox extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('inputbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.noShow = false;
    options.notSelected = false;
    options.value = '';
    return options;
  }

  /**
   * Sets whether the input on the control will be focused.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<InputBox>}
   */
  blur(enabled = true) {
    return this.setOption('notSelected', enabled);
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {InputResult}
   */
  getResult() {
    return new InputResult(this);
  }

  /**
   * Sets whether the input on the control hides the value of typed characters.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<InputBox>}
   */
  password(enabled = true) {
    return this.setOption('noShow', enabled);
  }

  /**
   * Sets the initial value of the control.
   *
   * @param {String} [value='']
   *   The value to set.
   *
   * @return {Control.<InputBox>}
   */
  setValue(value = '') {
    return this.setOption('value', value);
  }

}

module.exports = InputBox;
