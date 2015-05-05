'use strict';

var util = require('util');
var Transform = require('stream').Transform;
var readHeader = require('./readheader');
var accessPalette = require('./accesspalette');
var invertPalette = require('./transforms/invertpalette');

var TransformStream = exports = module.exports = function(options) {
  this.options = options;
  this.byteCounter = 0;
  Transform.call(this, options);
};
util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(chunk, encoding, callback) {
  this.byteCounter += chunk.length;
  console.log(chunk.length);
  console.log(this.byteCounter);
  accessPalette(chunk, function(chunk, palette, header){
    invertPalette(chunk, palette, header);
  });
  this.push(chunk, encoding);
  callback();
};
