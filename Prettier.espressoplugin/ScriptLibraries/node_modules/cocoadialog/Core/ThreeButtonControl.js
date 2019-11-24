const Control = require('./Control');
const ThreeButtonControlResult = require('./ThreeButtonControlResult');

/**
 * @class ThreeButtonControl
 *
 * The base class for all three button controls.
 *
 * @extends Control
 */
class ThreeButtonControl extends Control {

  /**
   * @inheritDoc
   */
  constructor(name, ...options) {
    super(name, ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.label = '';
    options.button1 = '';
    options.button2 = '';
    options.button3 = '';
    options.cancel = '';
    options.valueRequired = false;
    options.emptyText = '';
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {ThreeButtonControlResult}
   */
  getResult() {
    return new ThreeButtonControlResult(this);
  }

  /**
   * Sets the buttons for the control.
   *
   * @param {...String} buttons
   *   The button labels.
   *
   * @return {ThreeButtonControl}
   **/
  setButtons(...buttons) {
    buttons.forEach((button, i) => {
      // cocoaDialog only supports a maximum of 3 buttons.
      if (i < 3) {
        this.setOption(`button${i + 1}`, button);
      }
    });
    return this;
  }

  /**
   * Sets the text to display if a control requires a value.
   *
   * @param {String} [text='']
   *
   * @return {Control.<ThreeButtonControl>}
   */
  setEmptyText(text = '') {
    return this.setOption('emptyText', text);
  }

  /**
   * Sets the label for the dialog.
   *
   * @param {String} [label='']
   *   The label to set.
   *
   * @return {Control.<ThreeButtonControl>}
   */
  setLabel(label = '') {
    return this.setOption('label', label);
  }

  /**
   * Sets whether control requires a value.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<ThreeButtonControl>}
   */
  valueRequired(enabled = true) {
    return this.setOption('valueRequired', enabled);
  }

}

module.exports = ThreeButtonControl;
