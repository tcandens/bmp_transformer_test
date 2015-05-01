'use strict';

var fs = require('fs');

fs.readFile('./lib/bitmap1.bmp', function(error, data) {

  if (error) console.log(error);

  var image = {};
  image.identity = data.slice(0, 2).toString('ascii'); // .toString('ascii') == 'BM'

  image.file_size = data.readUInt32LE(2);

  image.header_size = image.palette_location = data.readUInt32LE(14);

  image.width = data.readInt32LE(18);
  image.height = data.readInt32LE(22);

  image.image_size = data.readInt32LE(34); // should eql file_size - image_address
  image.palette_size = data.readInt32LE(46);
  image.palette_used = data.readInt32LE(50);
  console.log(image['palette_used']);

  image.image_address = data.readInt32LE(10);
  // console.log(image['image_address']);

  image.palette = data.slice( 54, ( 54 + image['palette_size'] ) ); // Eqls 265, means 64 colors 4bytes each
  // console.log(image['palette'].length + " / " + image['palette_size']); // EQUIVALENT!

  image.image = data.slice( image['image_address'], ( image['image_address'] + image['image_size'] ) );

  // console.log("File size (bytes): " + image['file_size']);
  // console.log("Dimensions: " + image['width'] + " x " + image['height']);


  // Building Color Palette Array
  var palette = [];
  for ( var i = 0; i < ( image['palette'].length / 4 ); i++ ) { // Iterate over every 4th byte
    var c = image['palette'].slice(i, (i + 4)); // Slice out 4 byte chunks for each color in palette
    var r = c.readUInt8(0);
    var g = c.readUInt8(1);
    var b = c.readUInt8(2);
    var a = c.readUInt8(3);
    r = 255;
    g = 255;
    b = 255;
    a = 255;
    palette[i] = [];
    palette[i].push( r, g, b, a );
    // console.log( palette[i] );
  };

  for (var i = 0; i < ( image['palette_size'] / 4 ); i++) {
    var cOffset = 54 + ( i * 4 );
    data.writeUInt8(0, (cOffset + 0));
    data.writeUInt8(0, (cOffset + 1));
    data.writeUInt8(0, (cOffset + 2));
    data.writeUInt8(0, (cOffset + 3));
    console.log('Palette color replaced!');
  }

  fs.writeFile('./lib/new.bmp', data, function( err ) {
    if (err) console.log(err);
    console.log('New bitmap!');
  });

});
