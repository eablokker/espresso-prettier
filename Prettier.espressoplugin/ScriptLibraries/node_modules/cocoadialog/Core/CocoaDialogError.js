/**
 * @class CocoaDialogAbort
 *
 * Constructs a cocoaDialog based error message.
 *
 * @extends Error
 */
class CocoaDialogError extends Error {

  /**
   * Constructs a new instance.
   *
   * @param {String} message
   *   The message to display.
   * @param {...*} [args]
   *   Additional arguments to pass onto Error.
   */
  constructor(message, ...args) {
    if (typeof message === 'string') {
      message = message.replace('cocoaDialog Error: ', '');
    }
    super(message, ...args);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    else {
      this.stack = (new Error(message)).stack;
    }
  }

}

module.exports = CocoaDialogError;
