var chai = require('chai');
var expect = chai.expect;

describe('Truth', function() {
  it('should equal true', function() {
    expect(1 + 1 === 2).to.be.true;
  });
  it('should work with arrays', function() {
    expect([]).to.be.instanceOf(Array);
  })
});