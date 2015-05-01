'use strict';

var fs = require('fs');

fs.readFile('./lib/bitmap1.bmp', function(err, data) {
  var identity = new Buffer(4);
  fs.read(data, identity, 0, 2, 0, function(err, bytesRead, identBuffer) {
    console.log(identBuffer.toString());
  });
});
