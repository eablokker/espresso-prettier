const ControlResult = require('./ControlResult');

/**
 * @class ThreeButtonControlResult
 *
 * Constructs a result object for a three button based control.
 *
 * @extends ControlResult
 */
class ThreeButtonControlResult extends ControlResult {

  /**
   * @inheritDoc
   */
  constructor(control) {
    super(control);

    /**
     * The current button.
     *
     * @type {String|Number|null}
     */
    this.button = null;

    /**
     * @name ThreeButtonControlResult~control
     * @type {ThreeButtonControl}
     */
  }

  /**
   * @inheritDoc
   */
  process() {
    // Process parent class and immediately return if there's an error.
    super.process();
    if (this.error) {
      return;
    }

    // Extract the button value.
    this.button = this.stdout.shift();
    if (!this.control.options.stringOutput) {
      this.button = parseInt(this.button);
    }

    let buttons = [this.control.options.button1, this.control.options.button2, this.control.options.button3];

    // Handle cancel button, if any.
    let cancel = this.control.options.cancel;

    // If the cancel option is never defined, cocoaDialog looks for a button
    // with "Cancel" and uses that.
    if (cancel === undefined) {
      cancel = 'Cancel';
    }

    // Find the return value for the cancel button.
    let cancelReturnValue = null;
    buttons.forEach((value, i) => {
      if (cancelReturnValue !== null) {
        return;
      }
      if ((isNaN(parseInt(cancel)) && (value + '') === (cancel + '')) || i === parseInt(cancel)) {
        cancelReturnValue = this.control.options.stringOutput ? value : i + 1;
      }
    });

    // Set aborted state if the button canceled canceled the control.
    if (this.button === cancelReturnValue) {
      this.abort('Canceled!');
    }

  }

}

module.exports = ThreeButtonControlResult;
