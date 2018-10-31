import CoreLayout from '../../src/classes/coreLayout';

describe('CoreLayout', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const c = CoreLayout(); }).toThrow(/Cannot call a class as a function/);
  });

  describe('constructor', () => {   
    test('should set default parameters', () => {
      const cl = new CoreLayout();
      expect(cl.id).toEqual(expect.stringMatching(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/));
      expect(cl.class).toBe('CoreLayout');
      expect(cl.name).toBe('default');
    });
  });

});
