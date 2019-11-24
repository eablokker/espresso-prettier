const MsgBox = require('./MsgBox');

/**
 * @class YesNoMsgBox
 *
 * Constructs a YesNoMsgBox control.
 *
 * @extends MsgBox
 * @extends ThreeButtonControl
 * @extends Control
 */
class YesNoMsgBox extends MsgBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'yesno-msgbox';
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

module.exports = YesNoMsgBox;
