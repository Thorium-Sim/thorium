var chai = require('chai');
var expect = chai.expect;

describe('getAsset', function(){
  before(function() {
    this.getAsset = require('../../../server/helpers/getAsset').default;
  });
  it.skip('should get an asset key if the simulator ID is not set');
  it.skip('should get an asset key if the simulator ID is set');
  
})