'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var readHeader = require('../lib/_resources/readheader');

describe('readheader.js', function() {
  it('Should return object from buffer', function(done) {
    fs.readFile('./images/src/bitmap1.bmp', function(err, data) {
      var header = readHeader(data);
      expect(header.paletteStart).to.eql(54);
    });
  });
});
