/*!
 * relative-dest <https://github.com/jonschlinkert/relative-dest>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var relative = require('relative');

module.exports = function relativeDest(fp, dest, slash) {
  if (typeof dest !== 'string') {
    return fp;
  }

  if (typeof fp !== 'string') {
    throw new TypeError('relative-dest expects at least one string.');
  }

  slash = arguments[arguments.length - 1];
  var last = fp[fp.length - 1];

  var res = relative(fp, dest);
  var len = res.length;
  if (len === 0) {
    if (last === '/') {
      return './';
    }
    return '.';
  }

  // add or remove trailing slash, based on the orig path
  if (slash === true) {
    if (last === '/') {
      res += '/';
    } else if (last !== '/' && res[len - 1] === '/') {
      res.substring(0, len - 1);
    }
  }

  // we need to normalize since it's used in URLs
  return res.replace(/[\\\/]/g, '/');
};