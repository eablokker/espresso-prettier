const Control = require('./Control');

/**
 * @class FileControl
 *
 * Constructs a file based control.
 *
 * @extends Control
 */
class FileControl extends Control {

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.createDirectories = false;
    options.label = '';
    options.packagesAsDirectories = false;
    options.withExtensions = '';
    options.withDirectory = '';
    options.withFile = '';
    return options;
  }

  /**
   * Sets whether control will allow the creation of directories.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<FileControl>}
   */
  createDirectories(enabled = true) {
    return this.setOption('createDirectories', enabled);
  }

  /**
   * Sets whether control will allow the travers of packages as directories.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<FileControl>}
   */
  packagesAsDirectories(enabled = true) {
    return this.setOption('packagesAsDirectories', enabled);
  }

  /**
   * Sets the directory that the control will show upon opening.
   *
   * @param {String} [path='']
   *   A file system path.
   *
   * @return {Control.<FileControl>}
   */
  setDirectory(path = '') {
    return this.setOption('withDirectory', path);
  }

  /**
   * Sets the allowed extensions types.
   *
   * @param {String|Array} extensions
   *   A string or array of strings that indicate which extensions are allowed.
   *
   * @return {Control.<FileControl>}
   */
  setExtensions(extensions) {
    return this.setOption('withExtensions', Array.isArray(extensions) ? extensions : Array.from(arguments));
  }

  /**
   * Sets the file that the control will show upon opening.
   *
   * @param {String} [path='']
   *   A file system path.
   *
   * @return {Control.<FileControl>}
   */
  setFile(path = '') {
    return this.setOption('withFile', path);
  }

  /**
   * Sets the label for the dialog.
   *
   * @param {String} [label='']
   *   The label to set.
   *
   * @return {Control.<FileControl>}
   */
  setLabel(label = '') {
    return this.setOption('label', label);
  }

}

module.exports = FileControl;
