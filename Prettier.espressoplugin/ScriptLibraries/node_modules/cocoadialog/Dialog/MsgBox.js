const ThreeButtonControl = require('../Core/ThreeButtonControl');

/**
 * @class MsgBox
 *
 * Constructs a MsgBox control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class MsgBox extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('msgbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.alert = '';
    return options;

  }

  /**
   * Sets the alert for the dialog.
   *
   * @param {String} message
   *   The message to set.
   *
   * @return {Control.<MsgBox>}
\   */
  setAlert(message) {
    return this.setOption('alert', message);
  }

}

module.exports = MsgBox;
