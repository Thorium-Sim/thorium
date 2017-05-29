var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

describe('json-format', function(){
  before(function() {
    this.writeFile = require('../../../server/helpers/json-format').writeFile
    this.jsonString = {
      "string test": "string",
      "number test": 123.43,
      "bool test": true,
      arrayTest: [1,2,3,"four","five",false],
      objectTest: {some: "key",another:"key"}
    } 
  });
  it('should write a file with JSON', function(done) {
    this.writeFile('./temp/testFile.json', this.jsonString, {}, function(){
      const file = fs.readFileSync('./temp/testFile.json');
      expect(file.length > 0).to.be.true;
      done();
    });
  });
  it('should create a file that can be parsed with JSON Parse', function(done) {
    this.writeFile('./temp/testFile.json', this.jsonString, {}, function(){
      const file = JSON.parse(fs.readFileSync('./temp/testFile.json'));
      expect(file).to.be.instanceOf(Object);
      expect(file.arrayTest.length).to.equal(6);
      expect(file.objectTest.some).to.equal("key");
      done();
    });
  });
  after(function() {
    fs.unlink('./temp/testFile.json');
  });
})