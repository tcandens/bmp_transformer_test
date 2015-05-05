'use strict';

var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var input = './images/src/land.bmp';
// TODO: Use vars to dynamically name/date new image file
var output = './images/new/new.bmp';

var ee = new EventEmitter();

// REQUIRE DIFFERENT TRANSFORM STREAM CONSTRUCTORS
var InvertPalette = require('./lib/transforms/invertcolors');

// TRANSFORM STREAMS
var invertPaletteStream = new InvertPalette();

// READ & WRITE STEAMS
var readStream = fs.createReadStream(input);
var writeStream = fs.createWriteStream(output);

// LET IT FLOW
readStream
  .pipe(invertPaletteStream)
  .pipe(writeStream);
