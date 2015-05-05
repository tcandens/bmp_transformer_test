'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var accessPalette = require('../lib/_resources/accesspalette');

describe('accesspalette.js', function() {
  it('Create fresh slice of palette buffer', function(done) {
    fs.readFile('./images/src/bitmap1.bmp', function(err, data) {
      accessPalette(data, function(data, palette, header) {
        expect(Buffer.isBuffer(palette)).to.eql(true);
        done();
      });
    });
  });
});
