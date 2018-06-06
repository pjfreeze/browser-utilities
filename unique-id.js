/**
 * uniqueId
 * https://github.com/pjfreeze/browser-utilities/blob/master/read-file.js
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global) {
  'use strict';

  const randomString = () => {
    const random = Date.now() * Math.random();
    return random.toString(16).replace('.', '');
  };

  /**
  * Generate a random unique identifier that is 16 characters plus the provided prefix
  * @param {String} [prefix='']
  * @param {String} [length=8] Maximum of ~32 characters long (excluding prefix)
  * @return {String}
  */
  const uniqueId = function (prefix, length = 8) {
    const processedPrefix = prefix == null ? '' : String(prefix);
    const random1 = randomString();
    const random2 = randomString();
    const uniqueToken = (random1 + random2).slice(0, length);
    const id = `${processedPrefix}${uniqueToken}`;
    if (uniqueId.KNOWN_IDS.has(id)) return uniqueId(prefix);
    uniqueId.KNOWN_IDS.add(id);
    return id;
  };

  uniqueId.KNOWN_IDS = new Set();

  // Export logic based on Scott Hamper's Cookies.js project
  // https://github.com/ScottHamper/Cookies/blob/1.2.3/src/cookies.js
  if (typeof define == 'function' && define.amd) {
    // AMD support
    define(function () { return uniqueId; });
  } else if (typeof exports == 'object') {
    // CommonJS/Node.js support
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module == 'object' && typeof module.exports == 'object') {
      exports = module.exports = uniqueId;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.uniqueId = uniqueId;
  } else {
    global.uniqueId = global.uniqueId || uniqueId;
  }
}(typeof window == 'undefined' ? this : window));
