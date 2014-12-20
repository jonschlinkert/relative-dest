/*!
 * relative-dest <https://github.com/jonschlinkert/relative-dest>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var relative = require('./');

it('should return the filepath when one arg is passed:', function () {
  assert.equal(relative('dist/a/b/c.md'), 'dist/a/b/c.md');
  assert.equal(relative('/dist/a/b/c.md'), '/dist/a/b/c.md');
  assert.equal(relative('/dist/a/b/'), '/dist/a/b/');
});

it('should calculate the relative path to the given directory', function () {
  assert.equal(relative('dist/a/b/c.md', 'dist/public'), '../../public');
  assert.equal(relative('dist/a/b/c.md', 'assets'), '../../../assets');
  assert.equal(relative('a.md', 'dist/public/css'), 'dist/public/css');
});

it('should detect when source and result path are the same', function () {
  assert.equal(relative('a/b/c/', 'a/b/c/'), './');
  assert.equal(relative('a/b/c/', 'a/b/c'), './');
  assert.equal(relative('a/b/c', 'a/b/c'), '.');
});

it('should determine trailing slash based on source paths:', function () {
  assert.equal(relative('a.md', 'dist/public/css', true), 'dist/public/css');
  assert.equal(relative('a/b', 'dist/public/css', true), '../../dist/public/css');
  assert.equal(relative('a/b/', 'dist/public/css', true), '../../dist/public/css/');
  assert.equal(relative('a/b/a.md', 'dist/public/css', true), '../../dist/public/css');
  assert.equal(relative('dist/a/', 'assets', true), '../../assets/');
  assert.equal(relative('dist/a', 'assets/', true), '../../assets');
  assert.equal(relative('dist/a/b/c/', 'dist/assets', true), '../../../assets/');
  assert.equal(relative('dist/a/b/c/', 'dist/assets/', true), '../../../assets/');
});

