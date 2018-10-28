// TODO: Figure out why we need import { Engine } what to do about it
import { Engine } from '../../src/classes/engine';
import { System } from "../../src/classes/generic";
import Coolant from '../../src/classes/coolant';

describe('Coolant', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const c = Coolant(); }).toThrow(/Cannot call a class as a function/);
  });

  test('should extend System', () => {
    expect(new Coolant()).toBeInstanceOf(System);
  })

  describe('constructor', () => {   
    test('should set default parameters', () => {
      const cool = new Coolant();
      expect(cool.name).toBe('Coolant');
      expect(cool.class).toBe('Coolant');
      expect(cool.type).toBe('Coolant');
      expect(cool.coolant).toBe(1);
      expect(cool.coolantRate).toBe(0.2);
      expect(cool.transfer).toBeNull();
    });
  });

  describe('power', () => {
    test.skip('should get/set', () => {
      // TODO: The getter and setter don't seem to do very much yet
    });
  });

  describe('setCoolant', () => {
    test('should limit coolant to 0..1', () => {
      const cool = new Coolant();
      cool.setCoolant(0.5);
      expect(cool.coolant).toBe(0.5);
      cool.setCoolant(3);
      expect(cool.coolant).toBe(1);
      cool.setCoolant(-3);
      expect(cool.coolant).toBe(0); 
    });
  });

  describe('transferCoolant and cancelTransfer', () => {
    test('should set or cancel a coolant transfer', () => {
      const cool = new Coolant();
      cool.transferCoolant('fake_sysid');
      expect(cool.transfer).toEqual({ sysId: 'fake_sysid', sign: 1 });
      cool.transferCoolant('another_sysid', 'tank');
      expect(cool.transfer).toEqual({ sysId: 'another_sysid', sign: -1 });
      cool.cancelTransfer();
      expect(cool.transfer).toBeNull();      
    });
  });
});
