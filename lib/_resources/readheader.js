'use strict';

/**
 * Returns object with data info from file header
 * @function
 * @param {buffer} chunk
 * @return {object} info
 */
var readHeader = module.exports = exports = function(chunk) {
  var header = {
    pixelDepth: chunk.slice(28, 30).readUInt16LE(0),
    paletteStart: 54, // Byte offset of palette
    paletteSize: chunk.slice(46, 50).readUInt32LE(0),
    paletteEnd: (54 + chunk.slice(46, 50).readUInt32LE(0) ),
    pixelStart: chunk.slice(10, 14).readUInt32LE(0),
    pixelSize: chunk.slice(2, 6).readUInt32LE(0),
    pixelEnd: (chunk.slice(10, 14).readUInt32LE(0) + chunk.slice(2, 6).readUInt32LE(0) ),
  };
  return header;
};
