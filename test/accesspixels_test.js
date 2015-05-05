'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var accessPixels = require('../lib/_resources/accesspixels');

describe('accesspixels.js', function() {
  it('Create fresh slice of palette buffer', function(done) {
    fs.readFile('./images/src/bitmap1.bmp', function(err, data) {
      accessPixels(data, function(data, pixels, header) {
        expect(Buffer.isBuffer(pixels)).to.eql(true);
        done();
      });
    });
  });
});
