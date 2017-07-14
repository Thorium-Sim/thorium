var chai = require('chai');
var expect = chai.expect;

describe('Core Layout', function() {
  beforeAll(function() {
    this.System = require('../../../server/classes/coreLayout').default;
  });
  it('should construct without params', function() {
    const layout = new this.System();
    expect(layout.class).to.equal('CoreLayout');
  });
});