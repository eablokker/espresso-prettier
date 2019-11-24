const StandardInputBox = require('./StandardInputBox');

/**
 * @class SecureStandardInputBox
 *
 * Constructs a SecureStandardInputBox control.
 *
 * @extends StandardInputBox
 * @extends InputBox
 * @extends ThreeButtonControl
 * @extends Control
 */
class SecureStandardInputBox extends StandardInputBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'secure-standard-inputbox';
  }

}

module.exports = SecureStandardInputBox;
