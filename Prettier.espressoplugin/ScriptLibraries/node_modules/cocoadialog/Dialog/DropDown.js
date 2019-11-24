const ThreeButtonControl = require('../Core/ThreeButtonControl');
const InputResult = require('./InputResult');

/**
 * @class DropDown
 *
 * Constructs a DropDown control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class DropDown extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(options) {
    super('dropdown', options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.items = '';
    options.selected = -1;
    options.exitOnchange = false;
    options.pulldown = false;
    return options;
  }

  /**
   * Sets whether control will exit when a selection has been made.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<DropDown>}
   */
  exitOnChange(enabled = true) {
    return this.setOption('exitOnchange', enabled);
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {InputResult}
   */
  getResult() {
    return new InputResult(this, true);
  }

  /**
   * Sets whether control will be shown as the "pull down" style.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<DropDown>}
   */
  pullDown(enabled = true) {
    return this.setOption('pulldown', enabled);
  }

  /**
   * Sets the items for the control.
   *
   * @param {Array} items
   *   An array of item labels.
   *
   * @return {Control.<DropDown>}
   */
  setItems(items = []) {
    return this.setOption('items', items);
  }

  /**
   * Sets the selected item for the control.
   *
   * @param {Number} index
   *   The index of the item to display as selected.
   *
   * @return {Control.<DropDown>}
   */
  setSelected(index = 0) {
    return this.setOption('selected', index);
  }

}

module.exports = DropDown;
