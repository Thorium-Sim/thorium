var chai = require('chai');
var expect = chai.expect;
const Navigation = require('../../../server/classes/navigation').default;

let nav;
describe('Navigation', function() {
  beforeAll(function() {});
  it('should construct without params', function() {
    nav = new Navigation();
    expect(nav.class).to.equal('Navigation');
    expect(nav.destination).to.equal(null);
    expect(nav.scanning).to.be.false;
    expect(nav.calculatedCourse.x).to.equal(null);
    expect(nav.calculatedCourse.y).to.equal(null);
    expect(nav.calculatedCourse.z).to.equal(null);
  });
  it('should have a method toggleCalculate', function() {
    expect(nav.calculate).to.be.true;
    nav.toggleCalculate(false);
    expect(nav.calculate).to.be.false;
  });
  it('should have a method calculateCourse', function() {
    nav.calculateCourse('Testing');
    expect(nav.scanning).to.be.true;
    expect(nav.destination).to.equal('Testing');
  });
  it('should have a method cancelCalculation', function() {
    nav.cancelCalculation();
    expect(nav.scanning).to.be.false;
  });
  it('should have a method courseResponse', function() {
    nav.calculateCourse('Testing');
    expect(nav.calculatedCourse.x).to.equal(null);
    expect(nav.calculatedCourse.y).to.equal(null);
    expect(nav.calculatedCourse.z).to.equal(null);
    expect(nav.scanning).to.be.true;
    nav.courseResponse(1, 2, 3);
    expect(nav.scanning).to.be.false;
    expect(nav.calculatedCourse.x).to.equal(1);
    expect(nav.calculatedCourse.y).to.equal(2);
    expect(nav.calculatedCourse.z).to.equal(3);
  });
  it('should have a method courseEntry', function() {
    nav.courseEntry(3, 2, 1);
    expect(nav.currentCourse.x).to.equal(3);
    expect(nav.currentCourse.y).to.equal(2);
    expect(nav.currentCourse.z).to.equal(1);
  });
});
