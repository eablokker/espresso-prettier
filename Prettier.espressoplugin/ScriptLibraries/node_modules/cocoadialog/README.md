# cocoadialog

> Node.js wrapper for [cocoaDialog]

**Note:** Issues with the actual cocoaDialog application should be filed in its [issue queue](https://github.com/mstratman/cocoadialog/issues).


## Install

```
$ npm install --save cocoadialog
```


## Basic Usage

```js
const cocoaDialog = require('cocoadialog').setGlobalOption({
  stringOutput: true
});

cocoaDialog.msgBox()
  .setTitle('This is the title')
  .setIcon('caution')
  .setLabel('This is the label')
  .setButtons('Ok', 'Cancel', 'More')
  .open()
  .then(result => {
    if (result.button === 'Ok') {
      console.log('Ok button was clicked.');
    }
    else if (result.button === 'More') {
      console.log('More button was clicked.');
    }
  })
  .catch(result => {
    if (result.hasAborted()) {
      console.log('Cancel button was clicked.');
    }
    else {
      console.error(result.error);
    }
  });
```

## Examples

* [MsgBox](https://unicorn-fail.github.io/node-cocoadialog/?content=msgbox)
* [ProgressBar](https://unicorn-fail.github.io/node-cocoadialog//?content=progressbar)


## API

[API Documentation](https://unicorn-fail.github.io/node-cocoadialog/?api)

## License

MIT © [Mark Carver](https://github.com/markcarver)

[cocoaDialog]: http://mstratman.github.io/cocoadialog/#documentation3.0
