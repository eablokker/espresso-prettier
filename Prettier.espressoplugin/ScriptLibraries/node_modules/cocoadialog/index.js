const CocoaDialogError = require('./Core/CocoaDialogError');
if (process.platform !== 'darwin') {
  throw new CocoaDialogError('cocoaDialog only works on macOS.');
}

const CheckBox = require('./Dialog/CheckBox');
const DropDown = require('./Dialog/DropDown');
const FileSave = require('./Dialog/FileSave');
const FileSelect = require('./Dialog/FileSelect');
const InputBox = require('./Dialog/InputBox');
const MsgBox = require('./Dialog/MsgBox');
const Notify = require('./Dialog/Notify');
const OkMsgBox = require('./Dialog/OkMsgBox');
const ProgressBar = require('./Dialog/ProgressBar');
const Radio = require('./Dialog/Radio');
const SecureInputBox = require('./Dialog/SecureInputBox');
const SecureStandardInputBox = require('./Dialog/SecureStandardInputBox');
const Slider = require('./Dialog/Slider');
const StandardDropDown = require('./Dialog/StandardDropDown');
const StandardInputBox = require('./Dialog/StandardInputBox');
const TextBox = require('./Dialog/TextBox');
const YesNoMsgBox = require('./Dialog/YesNoMsgBox');

let globalOptions = {};

class CocoaDialog {

  /**
   * Creates a new CheckBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {CheckBox}
   */
  checkBox(...options) {
    return new CheckBox(globalOptions, ...options);
  }

  /**
   * Creates a new DropDown instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {DropDown}
   */
  dropDown(...options) {
    return new DropDown(globalOptions, ...options);
  }

  /**
   * Creates a new FileSave instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {FileSave}
   */
  fileSave(...options) {
    return new FileSave(globalOptions, ...options);
  }

  /**
   * Creates a new FileSelect instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {FileSelect}
   */
  fileSelect(...options) {
    return new FileSelect(globalOptions, ...options);
  }

  /**
   * Creates a new InputBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {InputBox}
   */
  inputBox(...options) {
    return new InputBox(globalOptions, ...options);
  }

  /**
   * Creates a new MsgBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {MsgBox}
   */
  msgBox(...options) {
    return new MsgBox(globalOptions, ...options);
  }

  /**
   * Creates a new Notify instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {Notify}
   */
  notify(...options) {
    return new Notify(globalOptions, ...options);
  }

  /**
   * Creates a new OkMsgBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {OkMsgBox}
   */
  okMsgBox(...options) {
    return new OkMsgBox(globalOptions, ...options);
  }

  /**
   * Creates a new ProgressBar instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {ProgressBar}
   */
  progressBar(...options) {
    return new ProgressBar(globalOptions, ...options);
  }

  /**
   * Creates a new Radio instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {Radio}
   */
  radio(...options) {
    return new Radio(globalOptions, ...options);
  }

  /**
   * Creates a new SecureInputBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {SecureInputBox}
   */
  secureInputBox(...options) {
    return new SecureInputBox(globalOptions, ...options);
  }

  /**
   * Creates a new SecureStandardInputBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {SecureStandardInputBox}
   */
  secureStandardInputBox(...options) {
    return new SecureStandardInputBox(globalOptions, ...options);
  }

  /**
   *
   * @param name
   * @param value
   *
   * @return {CocoaDialog}
   */
  setGlobalOption(name, value = null) {
    let options = {};
    if (typeof name === 'object') {
      options = name;
    }
    else if (typeof name === 'string') {
      options[name] = value;
    }
    for (let name in options) {
      let value = options[name];
      if (value === undefined || value === false) {
        value = null;
      }
      if (value !== null) {
        globalOptions[name] = value;
      }
      else {
        delete globalOptions[name];
      }
    }
    return this;
  }

  /**
   * Creates a new Slider instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {Slider}
   */
  slider(...options) {
    return new Slider(globalOptions, ...options);
  }

  /**
   * Creates a new StandardDropDown instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {StandardDropDown}
   */
  standardDropdown(...options) {
    return new StandardDropDown(globalOptions, ...options);
  }

  /**
   * Creates a new StandardInputBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {StandardInputBox}
   */
  standardInputBox(...options) {
    return new StandardInputBox(globalOptions, ...options);
  }

  /**
   * Creates a new TextBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {TextBox}
   */
  textBox(...options) {
    return new TextBox(globalOptions, ...options);
  }

  /**
   * Creates a new YesNoMsgBox instance.
   *
   * @param {...Object} [options]
   *   Options to initialize with.
   *
   * @return {YesNoMsgBox}
   */
  yesNoMsgBox(...options) {
    return new YesNoMsgBox(globalOptions, ...options);
  }

}

/**
 * @type {CocoaDialog}
 */
module.exports = new CocoaDialog();
