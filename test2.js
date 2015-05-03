'use strict';

var fs = require('fs');
var util = require('util');
var eventEmitter = require('events').EventEmitter;

var path = './lib/bitmap1.bmp';

var readStream = fs.createReadStream(path);

// readStream.on('readable', function() {
//   var chunk = readStream.read();
//   var identity = chunk.slice(0, 2).toString('ascii');
//   var pixel_start = chunk.slice(10, 14).readInt32LE(0);
//   console.log(pixel_start);
//   // readStream.pipe(writeStream);
// });

readStream.on('open', function() {
  readStream.pipe(writeStream);
})

// readStream.on('error', function(err) {
//   // console.log(err);
// });

var writeStream = fs.createWriteStream('./lib/new_stream.bmp');
writeStream.on('open', function() {
  console.log('File created');
});
