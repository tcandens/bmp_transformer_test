'use strict';

var readHeader = require('./readheader.js');

/**
 * Prepares pixels as a slice of file buffer and accepts transform callback
 * @param {buffer} chunk
 * @return {function} callback - Function that works on through data
 */
var accessPixels = exports = module.exports = function(chunk, callback) {
  var header = readHeader(chunk);
  if (header.pixelDepth < 24) console.log('Bitmap is color indexed!');
  var pixels = chunk.slice(header['pixelStart'], header['pixelEnd']);
  var freshPixels = new Buffer(pixels);
  callback(chunk, freshPixels, header);
};
