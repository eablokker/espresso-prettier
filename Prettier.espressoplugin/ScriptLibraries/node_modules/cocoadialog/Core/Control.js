const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const Promise = require('any-promise');

const CocoaDialogAbort = require('./CocoaDialogAbort');
const CocoaDialogError = require('./CocoaDialogError');
const CocoaDialogTimeout = require('./CocoaDialogTimeout');
const ControlResult = require('./ControlResult');
const emitter = require('./EventEmitter');

// Helper function to determine if control being constructed is a valid test
// control which is used to test the base Control class.
const isTestControl = name => (typeof global.it === 'function' && (name === 'Control' || name === 'FileControl' || name === 'ThreeButtonControl'));

const controls = [
  'checkbox', 'dropdown', 'filesave', 'fileselect', 'inputbox', 'msgbox',
  'notify', 'ok-msgbox', 'progressbar', 'radio', 'secure-inputbox',
  'secure-standard-inputbox', 'slider', 'standard-dropdown',
  'standard-inputbox', 'textbox', 'yesno-msgbox'
];

/**
 * @class Control
 *
 * The base class for all controls.
 */
class Control {

  /**
   * Constructs a new instance.
   *
   * @param {String} name
   *   The name of the control.
   * @param {...Object} [options]
   *   One or more option objects to initialize control with.
   *
   * @constructor
   */
  constructor(name, ...options) {
    if (!isTestControl(name) && (!name || controls.indexOf(name) === -1)) {
      throw new CocoaDialogError('The provided argument is not valid CocoaDialog control:' + name);
    }

    /**
     * @type {Boolean}
     */
    this.aborted = false;

    /**
     * @type {String}
     */
    this.bin = Control.getBin();

    /**
     * @type {String}
     */
    this.name = name;

    /**
     * @type {ChildProcess}
     */
    this.childProcess = null;

    /**
     * @type {Object}
     */
    this.options = {};

    // Set the initial options.
    options.map(this.setOption.bind(this));
  }

  /**
   * A list of all available options.
   *
   * @return {Object}
   */
  availableOptions() {
    return {
      // Global.
      debug: false,
      timeout: -1,
      timeoutFormat: '',
      stringOutput: false,
      noNewline: false,

      // Panel.
      close: false,
      height: -1,
      minimize: false,
      noFloat: false,
      posX: '',
      posY: '',
      resize: false,
      title: '',
      width: -1,

      // Icon.
      icon: '',
      iconBundle: '',
      iconFile: '',
      iconHeight: -1,
      iconSize: -1,
      iconType: '',
      iconWidth: -1
    };
  }

  /**
   * Close the control dialog by terminating the child process.
   *
   * @param {Boolean} [abort=false]
   *   Flag indicating whether or not the process was aborted.
   */
  close(abort = false) {
    if (abort) {
      this.aborted = true;
    }
    if (this.childProcess) {
      this.childProcess.kill();
    }
    return this;
  }

  /**
   * Enables control debugging.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control}
   */
  debug(enabled = true) {
    return this.setOption('debug', enabled);
  }

  /**
   * Makes the control float above all windows.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control}
   */
  float(enabled = true) {
    return this.setOption('noFloat', !enabled);
  }

  /**
   * Retrieves the arguments to use for instantiating the cococaDialog binary.
   *
   * @return {Array}
   *   An array of arguments.
   */
  getArguments() {
    let args = [this.name];
    let multiArgs = {};
    let availableOptions = this.availableOptions();

    // Add arguments based on the order of available options.
    for (let name in availableOptions) {
      // Skip any options that aren't allowed.
      if (!availableOptions.hasOwnProperty(name) || !this.options.hasOwnProperty(name)) {
        continue;
      }

      let value = this.options[name];

      // Convert camelCase properties into dashed CLI argument names.
      name = name.replace(/[A-Z][a-z0-9-]+/g, (match, offset) => (offset ? '-' : '') + match.toLowerCase());

      // Handle multiple values.
      if (Array.isArray(value)) {
        let values = [];

        // Multi-value options can only be strings or numbers.
        for (let i = 0, l = value.length; i < l; i++) {
          if (typeof value[i] !== 'string' && typeof value[i] !== 'number') {
            continue;
          }
          values.push(value);
        }
        multiArgs[name] = value;
        continue;
      }
      // Ignore values that are not scalar.
      else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
        continue;
      }

      // Boolean based options get set without values.
      if (typeof value === 'boolean') {
        if (value === true) {
          args.push(`--${name}`);
        }
      }
      else {
        args.push(`--${name}`, value);
      }
    }

    // Add arguments that multiple values at the end (helps ensure consistency).
    for (let name in multiArgs) {
      if (!multiArgs.hasOwnProperty(name)) {
        continue;
      }
      args.push(`--${name}`, ...multiArgs[name]);
    }

    return args;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {ControlResult}
   */
  getResult() {
    return new ControlResult(this);
  }

  /**
   * Iterates over an array and ensures each Promise has finished.
   *
   * @param {Array} array
   *   The array.
   * @param {Function} iterator
   *   The iterator function.
   * @param {*} [thisArg]
   *   The "this" context.
   *
   * @return {Promise}
   */
  mapSeries(array, iterator, thisArg) {
    let current = Promise.resolve();
    let results = new Array(array.length);
    for (let i = 0, l = array.length; i < l; ++i) {
      if (this.aborted) {
        break;
      }
      current = results[i] = current.then(function (i) {
        return iterator.call(thisArg, array[i], i, array);
      }.bind(undefined, i));
    }
    return Promise.all(results);
  }

  off() {
    emitter.removeListener.apply(emitter, arguments);
    return this;
  }

  /**
   * @inheritDoc
   *
   * @return {Control}
   */
  on() {
    emitter.on.apply(emitter, arguments);
    return this;
  }

  /**
   * @return {Control}
   */
  openSync() {
    // Ensure this option is always enabled.
    this.options.noNewline = true;

    let args = this.getArguments();

    // Show the command that was executed if debugging.
    if (this.options.debug) {
      console.log(this.bin + ' ' + args.join(' '));
    }

    // Create a new result object for the control.
    let result = this.getResult();

    // Create the child process.
    this.childProcess = spawn(this.bin, args);

    this.childProcess.stderr.on('data', buffer => {
      result.currentLine = buffer.toString();
      emitter.emit('stderr', result);
      result.raw.stderr += result.currentLine;
    });

    this.childProcess.stdout.on('data', buffer => {
      result.currentLine = buffer.toString();
      emitter.emit('stdout', result);
      result.raw.stdout += result.currentLine;
    });

    this.childProcess.on('error', err => {
      result.error = err;
      emitter.emit('error', result);
    });

    // Note: cocoaDialog incorrectly and arbitrarily sets the exit code to
    // various values based on the user input rather than a true CLI/command
    // exit status; it cannot be relied upon in any fashion.
    this.childProcess.on('close', () => {
      result.currentLine = null;

      result.process();

      if (result.hasTimedOut()) {
        emitter.emit('timeout', result);
      }
      else if (result.hasAborted()) {
        emitter.emit('abort', result);
      }

      if (result.hasError()) {
        emitter.emit('error', result);
      }
      else {
        emitter.emit('result', result);
      }

      emitter.emit('close', result);
    });

    return this;
  }

  /**
   * @return {Promise}
   */
  open() {
    return new Promise((resolve, reject) => {
      this.on('result', resolve).on('error', reject).openSync();
    });
  }

  /**
   * Sets the control height.
   *
   * @param {Number} height
   *   The height to set.
   *
   * @return {Control}
   */
  setHeight(height) {
    return this.setOption('height', height);
  }

  /**
   * Sets an icon by name.
   *
   * @param {String} name
   *   The name of the icon to set.
   * @param {Number|{width: Number, height: Number}} [size]
   *   The size of the icon. This can be an arbitrary number or an object
   *   containing specific width and height properties.
   *
   * @return {Control}
   */
  setIcon(name, size) {
    this.setOption('icon', name);
    if (size) {
      this.setIconSize(size);
    }
    return this;
  }

  /**
   * Sets the icon from a bundle.
   *
   * @param {String} bundle
   *   The application bundle name to use.
   * @param {Number|{width: Number, height: Number}} [size]
   *   The size of the icon. This can be an arbitrary number or an object
   *   containing specific width and height properties.
   *
   * @return {Control}
   */
  setIconFromBundle(bundle, size) {
    this.setOption('iconBundle', bundle);
    if (size) {
      this.setIconSize(size);
    }
    return this;
  }

  /**
   * Sets the icon from a file.
   *
   * @param {String} file
   *   The icon file to use.
   * @param {Number|{width: Number, height: Number}} [size]
   *   The size of the icon. This can be an arbitrary number or an object
   *   containing specific width and height properties.
   *
   * @return {Control}
   */
  setIconFromFile(file, size) {
    this.setOption('iconFile', file);
    if (size) {
      this.setIconSize(size);
    }
    return this;
  }

  /**
   * Sets the icon size.
   *
   * @param {Number|{width: Number, height: Number}} size
   *   The size of the icon. This can be an arbitrary number or an object
   *   containing specific width and height properties.
   *
   * @return {Control}
   */
  setIconSize(size) {
    if (typeof size !== 'object') {
      size = parseInt(size);
      size = {width: size, height: size};
    }
    if (size.height !== undefined && size.width !== undefined) {
      this.setOption('iconHeight', size.height);
      this.setOption('iconWidth', size.width);
    }
    return this;
  }

  /**
   * Sets the icon type.
   *
   * @param {String} type
   *   The file type of the icon being loaded. By default, cocoaDialog sets
   *   this to "icns", the macOS icon file type.
   *
   * @return {Control}
   */
  setIconType(type) {
    return this.setOption('iconType', type);
  }

  /**
   * Sets an option for the control.
   *
   * @param {String|Object} name
   *   The name of the option to set or an object containing key/value pairs
   *   of options to set.
   * @param {*} [value]
   *   The value of the option to set.
   *
   * @return {Control}
   */
  setOption(name, value) {
    let availableOptions = this.availableOptions();
    let options = {};
    if (typeof name === 'object') {
      options = name;
    }
    else if (typeof name === 'string') {
      options[name] = value;
    }
    for (let name in options) {
      // Skip unknown options.
      if (!availableOptions.hasOwnProperty(name)) {
        continue;
      }

      let value = options[name];
      if (value === undefined || value === false) {
        value = null;
      }

      let validateValue = value => {
        if (typeof availableOptions[name] === 'string') {
          value = '' + value;
        }
        else if (typeof availableOptions[name] === 'number') {
          value = parseInt(value);
        }
        else if (typeof availableOptions[name] === 'boolean') {
          value = !!value;
        }
        return value;
      };

      if (value !== null) {
        if (Array.isArray(value)) {
          this.options[name] = [];
          value.forEach(value => {
            this.options[name].push(validateValue(value));
          })
        }
        else {
          this.options[name] = validateValue(value);
        }
      }
      else {
        delete this.options[name];
      }
    }
    return this;
  }

  /**
   * Sets the position of the control.
   *
   * @param {Number|'left'|'center'|'right'} x
   *   The horizontal position.
   * @param {Number|'top'|'center'|'bottom'} y
   *   The vertical position.
   *
   * @return {Control}
   */
  setPosition(x = 0, y = 0) {
    return this.setOption('posX', x).setOption('posY', y);
  }


  /**
   * Sets the size of the control.
   *
   * @param {Number} width
   *   The width.
   * @param {Number} height
   *   The height.
   *
   * @return {Control}
   */
  setSize(width = 0, height = 0) {
    return this.setWidth(width).setHeight(height);
  }

  /**
   * Sets the control title.
   *
   * @param {String} title
   *   The title to set.
   *
   * @return {Control}
   */
  setTitle(title) {
    return this.setOption('title', title);
  }

  /**
   * Sets a timeout for the control.
   *
   * @param {Number} seconds
   *   The number of seconds to wait before the control times out.
   * @param {String} [format='Time remaining: %r...']
   *   The format for the timeout label. By default, cocoaDialog sets this
   *   to "Time remaining: %r..." internally. If overridden, you can specify
   *   the following placeholders to be replaced with the actual value:
   *   - %s: seconds
   *   - %m: minutes
   *   - %h: hours
   *   - %d: days
   *   - %r: relative
   *
   * @return {Control}
   */
  setTimeout(seconds, format) {
    this.setOption('timeout', seconds);
    if (format) {
      this.setOption('timeoutFormat', format);
    }
    return this;
  }

  setWidth(width) {
    return this.setOption('width', width);
  }

  /**
   * Sets whether control should return string values instead of integers.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control}
   */
  stringOutput(enabled = true) {
    return this.setOption('stringOutput', enabled);
  }

}

Control.getBin = () => {
  let bin = null;
  let paths = [
    process.env.COCOADIALOG_BIN,
    path.resolve(__dirname, '..', 'CocoaDialog.app/Contents/MacOS/cocoaDialog'),
    path.join(__dirname, 'CocoaDialog.app/Contents/MacOS/cocoaDialog'),
    '/Applications/cocoaDialog.app/Contents/MacOS/cocoaDialog'
  ];
  paths.forEach(path => {
    if (!bin && path && fs.existsSync(path)) {
      bin = path;
    }
  });
  if (!bin) {
    throw new CocoaDialogError('Unable to find cocoaDialog binary.');
  }
  return bin;
};

Control.noop = () => {
};

module.exports = Control;
