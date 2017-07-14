var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

const writeFile = require('../../../server/helpers/json-format').writeFile;
const jsonString = {
  'string test': 'string',
  'number test': 123.43,
  'bool test': true,
  arrayTest: [1, 2, 3, 'four', 'five', false],
  objectTest: { some: 'key', another: 'key' }
};

describe('json-format', function() {
  beforeAll(function() {});
  it('should write a file with JSON', function(done) {
    writeFile('./temp/testFile.json', jsonString, {}, function() {
      const file = fs.readFileSync('./temp/testFile.json');
      expect(file.length > 0).to.be.true;
      done();
    });
  });
  it('should create a file that can be parsed with JSON Parse', function(done) {
    writeFile('./temp/testFile.json', jsonString, {}, function() {
      const file = JSON.parse(fs.readFileSync('./temp/testFile.json'));
      expect(file).to.be.instanceOf(Object);
      expect(file.arrayTest.length).to.equal(6);
      expect(file.objectTest.some).to.equal('key');
      done();
    });
  });
  afterAll(function() {
    fs.unlink('./temp/testFile.json');
  });
});
