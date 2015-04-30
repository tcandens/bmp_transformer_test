'use strict';

var fs = require('fs');

fs.readFile('./lib/land.bmp', function(error, data) {
  if (error) console.log(error);
  var image = {};

  // image.identity = data.readUInt16LE(0);
  image.identity = data.slice(0, 2);
  image.width = data.readInt32LE(18);
  image.start = data.slice(32, 36);
  image.paletteSize = data.slice(46, 50);
  // var headSize;
  var bipSize;
  var width;
  var height;
  var imageSize;
  var paletteSize;
  var palette;
  var imgArray;

  console.log(image['identity']);
  console.log(image['headSize']);
  console.log(data.length);

  image.image = data.slice(image['start'], image.length);

  var slice = Array.prototype.slice;

  var image_array = slice.call(image.image);

  image_array.forEach(function(p, i) {
    console.log(p); // Spits out individual RGBA values
  })

  // console.log(image['image'].toString());

  // fs.writeFile('./lib/new.bmp', data, function(err) {
  //   if (err) console.log(err);
  // });
});
