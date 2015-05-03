'use strict';

var fs = require('fs');

// var path = './lib/non-palette-bitmap.bmp';
var path = './lib/non-palette-bitmap.bmp';

fs.readFile(path, function(error, data) {

  if (error) console.log(error);

  var image = {};
  image.identity = data.slice(0, 2).toString('ascii'); // .toString('ascii') == 'BM'

  image.file_size = data.readUInt32LE(2);

  image.header_size = data.readUInt32LE(14);

  image.width = data.readInt32LE(18);
  image.height = data.readInt32LE(22);

  image.pixel_depth = data.readUInt16LE(28);
  // console.log(image['pixel_depth']);
  image.compression = data.readInt32LE(30);
  // console.log(image['compression']);

  image.image_size = data.readInt32LE(34); // should eql file_size - image_address
  image.palette_size = data.readInt32LE(46);
  image.palette_used = data.readInt32LE(50);
  // console.log(image['palette_used']);

  image.image_address = data.readInt32LE(10);
  // console.log(image['image_address']);

  // image.palette = data.slice( 54, ( 54 + image['palette_size'] ) ); // Eqls 265, means 64 colors 4bytes each
  // console.log(image['palette'].length + " / " + image['palette_size']); // EQUIVALENT!
  // image.image = data.slice( image['image_address'], ( image['image_address'] + image['image_size'] ) );

  function accessPixels(buffer) {
    var newBuffer = new Buffer(buffer.length);
    // console.log(buffer.length);
    buffer.copy(newBuffer);
    // console.log(newBuffer.length);
    var offset = image['image_address'];
    var size = image['image_size'];
    var pixel_array = [];
    for (var i = 0; i < ( size / 3 ); i++) {
      var cOffset = offset + ( i * 3 )
      var b = newBuffer.readUInt8(cOffset);
      var g = newBuffer.readUInt8(cOffset + 1);
      var r = newBuffer.readUInt8(cOffset + 2);
      // var a = newBuffer.readUInt8(cOffset + 3);
      newBuffer.writeUInt8( ( 255 - b ), ( cOffset ) );
      newBuffer.writeUInt8( ( 255 - g ), ( cOffset + 1) );
      newBuffer.writeUInt8( ( 255 - r), ( cOffset + 2) );
      // buffer.writeUInt8( ( 255 ), cOffset + 3);
      var pixel = [];
      pixel.push(r, g, b);
      pixel_array.push(pixel);
    }
    // console.log(pixel_array);
    return newBuffer;
  };

  // console.log("File size (bytes): " + image['file_size']);
  // console.log("Dimensions: " + image['width'] + " x " + image['height']);

  function invertBuffer(buffer) {
    // Inverts Colors in Color Palette
    for (var i = 0; i < ( image['palette_size'] / 4 ); i++) {
      var cOffset = 54 + ( i * 4 );
      var b = buffer.readUInt8(cOffset + 0);
      var g = buffer.readUInt8(cOffset + 1);
      var r = buffer.readUInt8(cOffset + 2);
      var a = buffer.readUInt8(cOffset + 3);
      buffer.writeUInt8(( 255 - b ), (cOffset + 0));
      buffer.writeUInt8(( 255 - g ), (cOffset + 1));
      buffer.writeUInt8(( 255 - r ), (cOffset + 2));
      buffer.writeUInt8(( 255 - a ), (cOffset + 3));
      console.log('Palette color replaced!');
    };
    return newBuffer;
  };

  var newThing = accessPixels(data);
  // var newThing = invertBuffer(data);

  fs.writeFile('./lib/new.bmp', newThing, function( err ) {
    if (err) console.log(err);
    console.log('New bitmap!');
  });

});
