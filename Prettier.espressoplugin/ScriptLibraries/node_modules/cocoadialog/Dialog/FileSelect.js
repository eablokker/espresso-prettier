const FileControl = require('../Core/FileControl');
const FileSelectResult = require('./FileSelectResult');

/**
 * @class FileSelect
 *
 * Constructs a FileSelect control.
 *
 * @extends FileControl
 * @extends Control
 */
class FileSelect extends FileControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('fileselect', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.allowedFiles = '';
    options.selectDirectories = false;
    options.selectOnlyDirectories = false;
    options.noSelectDirectories = false;
    options.selectMultiple = false;
    options.noSelectMultiple = false;
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {FileSelectResult}
   */
  getResult() {
    return new FileSelectResult(this);
  }

  /**
   * Sets whether the control can select directories.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   * @param {Boolean} [onlyDirectories=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<FileSelect>}
   */
  selectDirectories(enabled = true, onlyDirectories = false) {
    return this
      .setOption('selectDirectories', enabled)
      .setOption('noSelectDirectories', !enabled)
      .setOption('selectOnlyDirectories', enabled && onlyDirectories);
  }

  /**
   * Sets whether the control can select multiple files.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<FileSelect>}
   */
  selectMultiple(enabled = true) {
    return this
      .setOption('selectMultiple', enabled)
      .setOption('noSelectMultiple', !enabled);
  }

  /**
   * Sets the allowed files.
   *
   * Note: this is primarily only useful when setting the allowed extensions
   * to ".", which allows files the have on extension to be selected.
   *
   * @param {Array} [files]
   *   The files to allow.
   *
   * @return {Control.<FileSelect>}
   */
  setAllowedFiles(files = []) {
    return this.setOption('allowedFiles', files);
  }

}

module.exports = FileSelect;
