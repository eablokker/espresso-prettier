const EventEmitter = require('events');
const emitter = new EventEmitter();

// If an EventEmitter does not have at least one listener registered for the
// 'error' event, and an 'error' event is emitted, the error is thrown, a stack
// trace is printed, and the Node.js process exits.
// @see https://nodejs.org/api/events.html#events_error_events
emitter.on('error', () => {
});

/**
 * @type {EventEmitter}
 */
module.exports = emitter;
