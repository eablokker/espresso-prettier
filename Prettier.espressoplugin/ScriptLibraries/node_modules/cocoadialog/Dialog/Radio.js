const ThreeButtonControl = require('../Core/ThreeButtonControl');
const RadioResult = require('./RadioResult');

/**
 * @class Radio
 *
 * Constructs a Radio control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class Radio extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('radio', ...options);
  }

  /**
   * Sets whether control allows mixed values.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<Radio>}
   */
  allowMixed(enabled = true) {
    return this.setOption('allowMixed', enabled);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.allowMixed = false;
    options.columns = -1;
    options.disabled = '';
    options.items = '';
    options.mixed = '';
    options.rows = -1;
    options.selected = -1;
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {RadioResult}
   */
  getResult() {
    return new RadioResult(this);
  }

  /**
   * Sets the number of columns the items should fit into.
   *
   * @param {Number} [columns=0]
   *   The amount of columns to set.
   *
   * @return {Control.<Radio>}
   */
  setColumns(columns = 0) {
    return this.setOption('columns', columns ? columns : null);
  }

  /**
   * Sets which items are disabled when the control opens.
   *
   * @param {Array} disabled
   *   An array of item indices to set as disabled.
   *
   * @return {Control.<Radio>}
   */
  setDisabled(disabled = []) {
    return this.setOption('disabled', disabled);
  }

  /**
   * Sets the items for the control.
   *
   * @param {Array} items
   *   An array of item labels.
   *
   * @return {Control.<Radio>}
   */
  setItems(items = []) {
    return this.setOption('items', items);
  }

  /**
   * Sets which items are in a mixed state when the control opens.
   *
   * @param {Array} mixed
   *   An array of item indices to set as mixed.
   *
   * @return {Control.<Radio>}
   */
  setMixed(mixed = []) {
    return this.setOption('mixed', mixed);
  }

  /**
   * Sets the number of rows the items should fit into.
   *
   * @param {Number} [rows=0]
   *   The amount of rows to set.
   *
   * @return {Control.<Radio>}
   */
  setRows(rows = 0) {
    return this.setOption('rows', rows ? rows : null);
  }

  /**
   * Sets which item is selected.
   *
   * @param {Number} selected
   *   The item index to select.
   *
   * @return {Control.<Radio>}
   */
  setSelected(selected = 0) {
    return this.setOption('selected', selected);
  }

}

module.exports = Radio;
