const ThreeButtonControl = require('../Core/ThreeButtonControl');
const InputResult = require('./InputResult');

/**
 * @class Slider
 *
 * Constructs a Slider control.
 *
 * @extends ThreeButtonControl
 * @extends Control
 */
class Slider extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(options) {
    super('slider', options);
  }

  /**
   * Sets whether control will always show the current value.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<Slider>}
   */
  alwaysShowValue(enabled = true) {
    this.setOption('alwaysShowValue', enabled);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.alwaysShowValue = false;
    options.emptyValue = -1;
    options.max = -1;
    options.min = -1;
    options.returnFloat = false;
    options.sliderLabel = '';
    options.sticky = false;
    options.ticks = -1;
    options.value = -1;
    return options;
  }

  /**
   * Creates a new result object for the control.
   *
   * @return {InputResult}
   */
  getResult() {
    return new InputResult(this, 'float');
  }

  /**
   * Sets whether control will return the value as a float instead of integer.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<Slider>}
   */
  returnFloat(enabled = true) {
    this.setOption('returnFloat', enabled);
  }

  /**
   * Sets the value used to determine if the control result value is "empty".
   *
   * @param {Number} [value=0]
   *   The value to set.
   *
   * @return {Control.<Slider>}
   */
  setEmptyValue(value = 0) {
    return this.setOption('emptyValue', value);
  }

  /**
   * Sets the maximum value in the control.
   *
   * @param {Number} [value=0]
   *   The value to set.
   *
   * @return {Control.<Slider>}
   */
  setMax(value = 0) {
    return this.setOption('max', value);
  }

  /**
   * Sets the minimum value in the control.
   *
   * @param {Number} [value=0]
   *   The value to set.
   *
   * @return {Control.<Slider>}
   */
  setMin(value = 0) {
    return this.setOption('min', value);
  }

  /**
   * Sets the label directly above the slider.
   *
   * @param {String} [label='']
   *   The label to set.
   *
   * @return {Control.<Slider>}
   */
  setSliderLabel(label = '') {
    return this.setOption('sliderLabel', label);
  }

  /**
   * Sets the amount of ticks the slider should have.
   *
   * @param {Number} [count=0]
   *   The value to set.
   *
   * @return {Control.<Slider>}
   */
  setTicks(count = 0) {
    return this.setOption('ticks', count);
  }

  /**
   * Sets the initial value of the control.
   *
   * @param {String} [value='']
   *   The value to set.
   *
   * @return {Control.<InputBox>}
   */
  setValue(value = '') {
    return this.setOption('value', value);
  }

  /**
   * Sets whether control will snap to the ticks to provide a "sticky" value.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<Slider>}
   */
  sticky(enabled = true) {
    this.setOption('sticky', enabled);
  }

}

module.exports = Slider;
