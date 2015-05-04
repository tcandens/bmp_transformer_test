'use strict';

var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Transform = require('stream').Transform;

var input = './images/src/bitmap1.bmp';

// Use vars to dynamically name/date new image file
var output = './images/new/new.bmp';

var ee = new EventEmitter();

/**
 * Returns object with data info from file header
 * @function
 * @param {buffer} chunk
 * @return {object} info
 */
function readHeader(chunk) {
  var header = {
    pixelDepth: chunk.slice(28, 30).readUInt16LE(0),
    paletteStart: 54, // Byte offset of palette
    paletteSize: chunk.slice(46, 50).readUInt32LE(0),
    paletteEnd: (54 + chunk.slice(46, 50).readUInt32LE(0) )
  };
  return header;
};

function accessPalette(chunk, callback) {
  var header = readHeader(chunk);
  if (header.pixelDepth !== 8) console.log('No palette accessible!');
  var palette = chunk.slice(header['paletteStart'], header['paletteEnd']);
  var freshPalette = new Buffer(palette);
  callback(chunk, freshPalette, header);
};


function invertPalette(chunk, palette, header) {
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

function TransformStream(options) {
  this.options = options;
  this.byteCounter = 0;
  Transform.call(this, options);
};

util.inherits(TransformStream, Transform);
TransformStream.prototype._transform = function(chunk, encoding, callback) {
  this.byteCounter += chunk.length;
  accessPalette(chunk, function(chunk, palette, header){
    invertPalette(chunk, palette, header);
  });
  this.push(chunk, encoding);
  callback();
};

// CREATE STEAMS
var transformStream = new TransformStream();
var readStream = fs.createReadStream(input);
var writeStream = fs.createWriteStream(output);

// LET IT FLOW
readStream
  .pipe(transformStream)
  .pipe(writeStream);
