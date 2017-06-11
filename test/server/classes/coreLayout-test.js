var chai = require('chai');
var expect = chai.expect;

describe('Core Layout', function() {
  before(function() {
    this.System = require('../../../server/classes/coreLayout').default;
  });
  it('should construct without params', function() {
    const layout = new this.System();
    expect(layout.class).to.equal('CoreLayout');
    expect(layout.x).to.equal(0);
    expect(layout.objectId).to.equal(null);
  });
});