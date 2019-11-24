const DropDown = require('./DropDown');

/**
 * @class StandardDropDown
 *
 * Constructs a StandardDropDown control.
 *
 * @extends DropDown
 * @extends ThreeButtonControl
 * @extends Control
 */
class StandardDropDown extends DropDown {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'standard-dropdown';
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

module.exports = StandardDropDown;
