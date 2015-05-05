'use strict';

/**
 * Used within @function:accessPixels() to transform buffer
 * @param {buffer} chunk
 * @param {buffer} palette
 * @param {object} header
 */
exports = module.exports = function(chunk, pixels, header) {
  var newBuffer = new Buffer(pixels.length);
  for ( var i = 0; i < ( pixels.length / 3 ); i++) {
    var colorOffset = ( i * 3 );
    var b = pixels.readUInt8(colorOffset + 0);
    var g = pixels.readUInt8(colorOffset + 1);
    var r = pixels.readUInt8(colorOffset + 2);
    newBuffer.writeUInt8(( 255 - b ), (colorOffset + 0));
    newBuffer.writeUInt8(( 255 - g ), (colorOffset + 1));
    newBuffer.writeUInt8(( 255 - r ), (colorOffset + 2));
  };
  chunk.write(newBuffer.toString('hex'), header['pixelStart'], header['pixelEnd'], 'hex');
};
