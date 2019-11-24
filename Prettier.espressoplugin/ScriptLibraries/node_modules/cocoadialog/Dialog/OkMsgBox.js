const MsgBox = require('./MsgBox');

/**
 * @class OkMsgBox
 *
 * Constructs a OkMsgBox control.
 *
 * @extends MsgBox
 * @extends ThreeButtonControl
 * @extends Control
 */
class OkMsgBox extends MsgBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('ok-msgbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.noCancel = false;
    return options;
  }

  /**
   * Sets whether control will show the "Cancel" button.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<OkMsgBox>}
   */
  noCancel(enabled = true) {
    return this.setOption('noCancel', enabled);
  }

}

module.exports = OkMsgBox;
