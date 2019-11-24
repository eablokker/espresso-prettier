const Promise = require('any-promise');
const Control = require('../Core/Control');
const CocoaDialogAbort = require('../Core/CocoaDialogAbort');
const ProgressBarResult = require('./ProgressBarResult');
const emitter = require('../Core/EventEmitter');

/**
 * @class ProgressBar
 *
 * Constructs a ProgressBar control.
 *
 * @extends Control
 */
class ProgressBar extends Control {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('progressbar', ...options);

    /**
     * The items to be processed.
     *
     * @type {Array}
     */
    this.items = [];

    /**
     * @type {ProgressBar~itemIterator}
     */
    this.itemIterator = Control.noop;
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.indeterminate = false;
    options.percent = -1;
    options.stoppable = false;
    options.text = '';
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {ProgressBarResult}
   */
  getResult() {
    return new ProgressBarResult(this);
  }

  /**
   * Sets whether the control has indeterminate progress.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<ProgressBar>}
   */
  indeterminate(enabled = true) {
    return this.setOption('indeterminate', enabled);
  }

  /**
   * @inheritDoc
   */
  openSync() {
    // Intercept the "Stop" button.
    if (this.options.stoppable) {
      this.on('stdout', result => {
        if (result.currentLine.match(/^stopped/)) {
          result.abort();
          this.aborted = true;
        }
      });
    }
    return super.openSync();
  }

  /**
   * @inheritDoc
   */
  open() {
    return new Promise((resolve, reject) => {
      this.on('result', resolve).on('error', reject).openSync();
      let total = this.items.length;
      return this.mapSeries(this.items, (item, i) => {
        if (this.aborted) {
          return Promise.reject(new CocoaDialogAbort('Stopped!'));
        }
        this.setText(`Processing (${i}/${total})...`);
        return Promise.resolve().then(() => {
          if (this.aborted) {
            return Promise.reject(new CocoaDialogAbort('Stopped!'));
          }
          return this.itemIterator(item, i, total, this);
        }).then(() => {
          this.setText(this.options.text + ' done!').setPercent(i + 1, total);
          return item;
        });
      }).then(items => {
        this.setPercent(100).close();
        return items;
      });
    });
  }

  /**
   * Sets the items to process once control has opened.
   *
   * @param {Array} items
   *   An array of items to process.
   * @param {ProgressBar~itemIterator} iterator
   *   The iterator that will be called to process each item.
   *
   * @return {ProgressBar}
   */
  processItems(items, iterator) {
    this.items = Array.from(items);
    this.itemIterator = iterator;
    return this;
  }

  /**
   * Sets the current percentage.
   *
   * @param {Number} percent
   *   The percent to set or the "current" value if, total is provided.
   * @param {Number} [total]
   *   The total used to determine percentage.
   *
   * @return {ProgressBar}
   */
  setPercent(percent, total) {
    if (total) {
      percent = 100 / total * percent;
    }
    return this.setOption('percent', Math.round(percent)).update();
  }

  /**
   * Sets the current text and, if open, updating the display.
   *
   * @param {String} [text='']
   *   The text to set.
   *
   * @return {ProgressBar}
   */
  setText(text = '') {
    return this.setOption('text', text).update();
  }

  /**
   * Sets whether the control can be stopped.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<ProgressBar>}
   */
  stoppable(enabled = true) {
    return this.setOption('stoppable', enabled);
  }

  /**
   * Updates the control's display of the current options.
   *
   * @return {ProgressBar}
   */
  update() {
    // Immediately return if aborted or there is no child process.
    if (this.aborted || !this.childProcess) {
      return this;
    }

    emitter.emit('beforeUpdate', this);
    this.write(this.options.percent + ' ' + this.options.text);
    emitter.emit('update', this);
    return this;
  }

  /**
   * Writes to the child process of the control.
   *
   * @param {String} string
   *   The string to send.
   *
   * @return {ProgressBar}
   */
  write(string) {
    // Immediately return if aborted or there is no child process.
    if (this.aborted || !this.childProcess) {
      return this;
    }

    this.childProcess.stdin.write(`${string}\n`);
    return this;
  }

}

module.exports = ProgressBar;

/**
 * @callback ProgressBar~itemIterator
 *
 * @param {*} item
 *   The item being processed.
 * @param {Number} i
 *   The current index of the array item being processed.
 * @param {Number} total
 *   The total number of items.
 * @param {ProgressBar} progressBar
 *   The current ProgressBar instance.
 */
