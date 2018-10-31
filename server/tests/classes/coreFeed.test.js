import CoreFeed from '../../src/classes/coreFeed';

describe('CoreFeed', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const c = CoreFeed(); }).toThrow(/Cannot call a class as a function/);
  });

  describe('constructor', () => {   
    test('should set default parameters', () => {
      const cf = new CoreFeed();
      expect(cf.id).toEqual(expect.stringMatching(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/));
      expect(cf.class).toBe('CoreFeed');
      expect(cf.simulatorId).toBeNull();
      expect(cf.ignored).toBe(false);
      expect(cf.station).toBe('');
      expect(cf.timestamp).toBeInstanceOf(Date);
      expect(cf.title).toBe('New Event');
      expect(cf.body).toBe('');
      expect(cf.color).toBe('info');
    });
  });

  describe('ignore', () => {
    test('should set as ignored', () => {
      const cf = new CoreFeed();
      cf.ignore();
      expect(cf.ignored).toBe(true);
    })
  })
});
