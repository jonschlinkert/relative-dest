/*!
 * relative-dest <https://github.com/jonschlinkert/relative-dest>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var relative = require('relative');

module.exports = function relativeDest(fp, dest, slash) {
  if (typeof dest !== 'string') {
    return fp;
  }

  if (typeof fp !== 'string') {
    throw new TypeError('relative-dest expects at least one string.');
  }

  slash = arguments[arguments.length - 1];
  var orig = fp;
  var last = fp[fp.length - 1];

  var res = relative(fp, dest);
  var len = res.length;
  res = len > 0 ? res : '.';

  // add or remove trailing slash, based on the orig path
  if (slash === true) {
    if (last === '/') {
      res += '/';
    } else if (last !== '/' && res[len - 1] === '/') {
      res.substring(0, len - 1);
    }
  }

  if (path.normalize(orig) === path.normalize(res) || res === '.') {
    if (last === '/') {
      return './';
    } else {
      return '';
    }
  }
  // we need to normalize since it's used in URLs
  return res.replace(/[\\\/]/g, '/');
};