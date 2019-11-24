const InputBox = require('./InputBox');

/**
 * @class SecureInputBox
 *
 * Constructs a SecureInputBox control.
 *
 * @extends InputBox
 * @extends ThreeButtonControl
 * @extends Control
 */
class SecureInputBox extends InputBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'secure-inputbox';
  }

}

module.exports = SecureInputBox;
