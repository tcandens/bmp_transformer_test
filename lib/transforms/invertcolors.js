'use strict';

var util = require('util');
var Transform = require('stream').Transform;
var readHeader = require('../_resources/readheader');
var accessPalette = require('../_resources/accesspalette');
var invertPalette = require('../_resources/invertpalette');
var accessPixels = require('../_resources/accesspixels');
var invertPixels = require('../_resources/invertpixels');

var InvertColorsStream = exports = module.exports = function(options) {
  this.options = options;
  this.byteCounter = 0;
  Transform.call(this, options);
};
util.inherits(InvertColorsStream, Transform);

InvertColorsStream.prototype._transform = function(chunk, encoding, callback) {
  this.byteCounter += chunk.length;
  this.header = readHeader(chunk);
  if (this.header['pixelDepth'] === 8 ) {
    if (this.byteCounter >= this.header['paletteEnd']) {
      accessPalette(chunk, function(chunk, palette, header){
        invertPalette(chunk, palette, header);
      });
    };
  } else if (this.header['pixelDepth'] === 24 ) {
    if (this.byteCounter >= this.header['pixelStart']) {
      accessPixels(chunk, function(chunk, pixels, header) {
        invertPalette(chunk, pixels, header);
      });
    };
  };
  console.log(this.byteCounter);
  this.push(chunk, encoding);
  callback();
};
