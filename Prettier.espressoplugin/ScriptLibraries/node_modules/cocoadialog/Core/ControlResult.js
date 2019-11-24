const chalk = require('./chalk');

const CocoaDialogAbort = require('./CocoaDialogAbort');
const CocoaDialogError = require('./CocoaDialogError');
const CocoaDialogTimeout = require('./CocoaDialogTimeout');

const trimRegExp = new RegExp(`^\n*|\n*$`);

/**
 * @class ControlResult
 *
 * Constructs the base result object for a control.
 */
class ControlResult {

  /**
   * Construct a new instance.
   *
   * @param {Control} control
   *   The control this result belongs to.
   *
   * @constructor
   */
  constructor(control) {
    this.control = control;
    this.currentLine = null;
    this.raw = {stdout: '', stderr: ''};
    this.stderr = [];
    this.stdout = [];
  }

  /**
   * Aborts the result.
   *
   * @param {String} [message='Aborted!']
   *   The message to use for CocoaDialogAbort.
   *
   * @return {ControlResult}
   */
  abort(message = 'Aborted!') {
    return this.setError(new CocoaDialogAbort(message));
  }

  /**
   * Processes the final result.
   */
  process() {
    // Trim new lines from start/end and split into an array.
    let stdout = this.raw.stdout.replace(trimRegExp, '');
    let stderr = this.raw.stderr.replace(trimRegExp, '');

    this.stdout = stdout ? stdout.split('\n') : [];
    this.stderr = stderr ? stderr.split('\n') : [];

    // Check if there's a fatal error.
    if (this.stderr.length) {
      let message = chalk ? chalk.bold.red(this.stderr.join('\n')) : this.stderr.join('\n');
      if (this.stdout.length) {
        message += chalk ? chalk.bold.yellow(this.stdout.join('\n')) : this.stdout.join('\n');
      }
      this.setError(message);
    }

    // Check if the control has timed out.
    if (this.control.options.timeout && this.stdout[0] === 'timeout') {
      this.timeout();
    }
  }

  /**
   * Indicates whether result has been aborted.
   *
   * Note: this can be true if timed out.
   *
   * @return {Boolean}
   */
  hasAborted() {
    return !!(this.error && this.error instanceof CocoaDialogAbort);
  }

  /**
   * Indicates whether result has an error.
   *
   * Note: this can be true if aborted or timed out.
   *
   * @return {Boolean}
   */
  hasError() {
    return !!(this.error && this.error instanceof CocoaDialogError);
  }

  /**
   * Indicates whether result has timed out.
   *
   * @return {Boolean}
   */
  hasTimedOut() {
    return !!(this.error && this.error instanceof CocoaDialogTimeout);
  }

  /**
   * Sets an error on the result.
   *
   * @param {String|CocoaDialogError} [message='Error!']
   *   The message to use for CocoaDialogError.
   *
   * @return {ControlResult}
   */
  setError(message = 'Error!') {
    if (message instanceof CocoaDialogError) {
      this.error = message;
    }
    else {
      this.error = new CocoaDialogError(message);
    }
    return this;
  }

  /**
   * Times out the result.
   *
   * @param {String} [message='Timed out!']
   *   The message to use for CocoaDialogTimeout.
   *
   * @return {ControlResult}
   */
  timeout(message = 'Timed out!') {
    return this.setError(new CocoaDialogTimeout(message));
  }

}

module.exports = ControlResult;
