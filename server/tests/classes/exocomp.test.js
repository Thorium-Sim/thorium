import Exocomp from '../../src/classes/exocomp';

describe('Exocomp', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const e = Exocomp(); }).toThrow(/Cannot call a class as a function/);
  });
  
  describe('constructor', () => {   
    test('should set default parameters', () => {
      const e = new Exocomp();
      expect(e.id).toEqual(expect.stringMatching(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/));
      expect(e.class).toBe('Exocomp');
      expect(e.simulatorId).toBeUndefined();
      expect(e.state).toBe('idle');
      expect(e.completion).toBe(0);
      expect(e.parts).toEqual([]);
      expect(e.destination).toBeNull();
      expect(e.logs).toEqual([]);
      expect(e.difficulty).toBe(0.05);
    });
  });

  describe('updateState', () => {
    test('should update the state', () => {
      const e = new Exocomp();
      e.updateState('deploying');
      expect(e.state).toBe('deploying');
    });

    test('should add a log entry', () => {
      const e = new Exocomp();
      e.updateState('deploying')
      expect(e.logs[0].message).toBe('Deployed to repair undefined.');
    });
  });

  describe('updateDifficulty', () => {
    test('should update difficulty, limiting between 0 and 1', () => {
      const e = new Exocomp();
      e.updateDifficulty(2);
      expect(e.difficulty).toBe(1);
      e.updateDifficulty(-2);
      expect(e.difficulty).toBe(0);
      e.updateDifficulty(0.5);
      expect(e.difficulty).toBe(0.5);
    });
  });

  describe('deploy', () => {
    test('should deploy the exocomp', () => {
      const e = new Exocomp();
      e.deploy({ destination: 'Hogwarts', parts: ['Mandrake root'] });
      expect(e.completion).toBe(0);
      expect(e.destination).toBe('Hogwarts');
      expect(e.parts).toEqual(['Mandrake root']);
      expect(e.state).toBe('deploying');
    });
  });

  describe('recall', () => {
    test('should recall the exocomp', () => {
      const e = new Exocomp();
      e.deploy({ destination: 'Hogwarts', parts: ['Mandrake root'] });
      e.recall();
      expect(e.completion).toBe(0);
      expect(e.destination).toBeNull();
      expect(e.parts).toEqual([]);
      expect(e.state).toBe('returning');
    });

    test('should not recall if already returning', () => {
      const e = new Exocomp();
      e.deploy({ destination: 'Hogwarts', parts: ['Mandrake root'] });
      e.recall();
      expect(e.logs.length).toBe(2);
      e.recall();
      expect(e.logs.length).toBe(2);
    });
  });
});

