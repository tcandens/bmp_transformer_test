'use strict';

/**
 * Used within @function:accessPalette() to transform buffer
 * @param {buffer} chunk
 * @param {buffer} palette
 * @param {object} header
 */
exports = module.exports = function(chunk, palette, header) {
  var newBuffer = new Buffer(palette.length);
  for ( var i = 0; i < ( palette.length / 4 ); i++) {
    var colorOffset = ( i * 4 );
    var b = palette.readUInt8(colorOffset + 0);
    var g = palette.readUInt8(colorOffset + 1);
    var r = palette.readUInt8(colorOffset + 2);
    var a = palette.readUInt8(colorOffset + 3);
    newBuffer.writeUInt8(( 255 - b ), (colorOffset + 0));
    newBuffer.writeUInt8(( 255 - g ), (colorOffset + 1));
    newBuffer.writeUInt8(( 255 - r ), (colorOffset + 2));
    newBuffer.writeUInt8(( 255 - a ), (colorOffset + 3));
  };
  chunk.write(newBuffer.toString('hex'), header['paletteStart'], header['paletteSize'], 'hex');
};
