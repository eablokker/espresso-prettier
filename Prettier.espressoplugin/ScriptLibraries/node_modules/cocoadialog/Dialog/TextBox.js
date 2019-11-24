const ThreeButtonControl = require('../Core/ThreeButtonControl');
const InputResult = require('./InputResult');

/**
 * @class TextBox
 *
 * Constructs a TextBox control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class TextBox extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('textbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.editable = false;
    options.text = '';
    options.textFromFile = '';
    options.noEditable = false;
    options.selected = false;
    options.focusTextbox = false;
    options.scrollTo = '';
    return options;
  }

  /**
   * Sets whether control is editable.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<TextBox>}
   */
  editable(enabled = true) {
    return this.setOption('editable', enabled).setOption('noEditable', !enabled);
  }

  /**
   * Sets whether control focuses the text box instead of the button.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<TextBox>}
   */
  focus(enabled = true) {
    return this.setOption('focusTextbox', enabled);
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
   * Sets whether control scrolls to the bottom of the provided text.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<TextBox>}
   */
  scrollToBottom(enabled = true) {
    return this.setOption('scrollTo', enabled ? 'bottom' : false);
  }

  /**
   * Sets whether control selects all the provided text.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<TextBox>}
   */
  selectAll(enabled = true) {
    return this.setOption('selected', enabled);
  }

  /**
   * Sets the text of the control to the contents of a file.
   *
   * Note: if the "text" option is provided, this will be ignored.
   *
   * @param {String} [filename='']
   *
   * @return {Control.<TextBox>}
   */
  setFile(filename = '') {
    return this.setOption('textFromFile', !this.options.text ? filename : false);
  }

  /**
   * Sets the text of the control.
   *
   * @param {String} [text='']
   *
   * @return {Control.<TextBox>}
   */
  setText(text = '') {
    return this.setOption('text', text);
  }

}

module.exports = TextBox;
