const ThreeButtonControl = require('../Core/ThreeButtonControl');
const CheckBoxResult = require('./CheckBoxResult');

/**
 * @class CheckBox
 *
 * Constructs a CheckBox control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class CheckBox extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('checkbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.checked = '';
    options.columns = -1;
    options.disabled = '';
    options.items = '';
    options.mixed = '';
    options.rows = -1;
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {CheckBoxResult}
   */
  getResult() {
    return new CheckBoxResult(this);
  }

  /**
   * Sets which items are checked when the control opens.
   *
   * @param {Array} checked
   *   An array of item indices to set as checked.
   *
   * @return {Control.<CheckBox>}
   */
  setChecked(checked = []) {
    return this.setOption('checked', checked);
  }

  /**
   * Sets the number of columns the items should fit into.
   *
   * @param {Number} [columns=0]
   *   The amount of columns to set.
   *
   * @return {Control.<CheckBox>}
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
   * @return {Control.<CheckBox>}
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
   * @return {Control.<CheckBox>}
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
   * @return {Control.<CheckBox>}
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
   * @return {Control.<CheckBox>}
   */
  setRows(rows = 0) {
    return this.setOption('rows', rows ? rows : null);
  }

}

module.exports = CheckBox;
