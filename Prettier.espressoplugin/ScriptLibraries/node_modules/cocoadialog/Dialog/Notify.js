const Control = require('../Core/Control');

/**
 * @class Notify
 *
 * Constructs a Notify control.
 *
 * @extends Control
 */
class Notify extends Control {

  /**
   * @inheritDoc
   *
   * @todo Add methods and testing (big task).
   */
  constructor(...options) {
    super('notify', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    return {
      alpha: -1,
      backgroundBottom: '',
      backgroundBottoms: '',
      backgroundTop: '',
      backgroundTops: '',
      borderColor: '',
      borderColors: '',
      clickPath: '',
      clickArg: '',
      clickPaths: '',
      clickArgs: '',
      debug: false,
      description: '',
      descriptions: '',
      fh: '',
      icon: '',
      iconBundle: '',
      iconType: '',
      iconFile: '',
      icons: '',
      iconFiles: '',
      independent: false,
      noGrowl: false,
      posX: -1,
      posY: -1,
      sticky: false,
      stringOutput: false,
      textColor: '',
      textColors: '',
      timeout: -1,
      title: '',
      titles: ''
    };
  }

}

module.exports = Notify;
