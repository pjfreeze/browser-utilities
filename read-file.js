/**
 * readFile
 * https://github.com/pjfreeze/browser-utilities/blob/master/read-file.js
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global) {
  'use strict';

  /**
   * Read the contents of a file. Attempt to parse as JSON, gracefully passing if not JSON.
   * @param {File} file
   * @returns {Promise}
   */
  const readFile = function (file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.addEventListener('error', reject);
      reader.addEventListener('load', (event) => {
        let contents = event.target.result;
        try {
          contents = JSON.parse(event.target.result);
        } catch (error) {
          const isSyntaxError = error instanceof SyntaxError
          if (!isSyntaxError) return reject(error);
        }
        resolve(contents);
      });
      reader.readAsText(file);
    });
  };

  // Export logic based on Scott Hamper's Cookies.js project
  // https://github.com/ScottHamper/Cookies/blob/1.2.3/src/cookies.js
  if (typeof define == 'function' && define.amd) {
    // AMD support
    define(function () { return readFile; });
  } else if (typeof exports == 'object') {
    // CommonJS/Node.js support
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module == 'object' && typeof module.exports == 'object') {
      exports = module.exports = readFile;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.readFile = readFile;
  } else {
    global.readFile = global.readFile || readFile;
  }
}(typeof window == 'undefined' ? this : window));
