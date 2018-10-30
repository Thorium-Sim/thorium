import Isochip from '../../src/classes/isochips';

// TODO: Would be nice to import this little gem instead
expect.extend({
  toBeUuid(received) {
    return {
      message: () => `expected '${received}' to be a UUID`,
      pass: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/.test(received)
    }
  },
});

describe('Isochip', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const i = Isochip(); }).toThrow(/Cannot call a class as a function/);
  });
  
  describe('constructor', () => {   
    test('should set default parameters', () => {
      const i = new Isochip();
      expect(i.id).toBeUuid();
      expect(i.class).toBe('Isochip');
      expect(i.system).toBeNull();
      expect(i.simulatorId).toBeNull();
      expect(i.slot).toBe(-1);
      expect(i.requiredChip).toBe(-1);
      expect(i.chip).toBe(0);
      expect(i.label).toBeUndefined();
    });
  });

  describe('state', () => {
    test('should get isochip state', () => {
      const c1 = new Isochip();
      expect(c1.state).toBe('empty');
      const c2 = new Isochip({ chip: 31 });
      expect(c2.state).toBe('diagnostic');
      const c3 = new Isochip({ chip: 14, requiredChip: 14 });
      expect(c3.state).toBe('nominal');
      const c4 = new Isochip({ chip: 13, requiredChip: 14 });
      expect(c4.state).toBe('invalid');
    });
  });

  describe('insertChip', () => {
    test('should set chip', () => {
      const c1 = new Isochip();
      c1.insertChip(20);
      expect(c1.chip).toBe(20);
    });
  });

  describe('updateIsochip', () => {
    test('should update an isochip', () => {
      const c1 = new Isochip();
      c1.updateIsochip({ slot: 2, requiredChip: 10, chip: 12, label: 'fake_label' });
      expect(c1.slot).toBe(2);
      expect(c1.requiredChip).toBe(10);
      expect(c1.chip).toBe(12);
      expect(c1.label).toBe('fake_label');
    });
  });
  
});

