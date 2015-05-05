'use strict';

var readHeader = require('./readheader.js');

/**
 * Prepares a palette as a slice of file buffer and accepts transform callback
 * @param {buffer} chunk
 * @return {function} callback - Function that works on through data
 */
var accessPalette = exports = module.exports = function(chunk, callback) {
  var header = readHeader(chunk);
  if (header.pixelDepth !== 8) console.log('No palette accessible!');
  var palette = chunk.slice(header['paletteStart'], header['paletteEnd']);
  var freshPalette = new Buffer(palette);
  callback(chunk, freshPalette, header);
};
