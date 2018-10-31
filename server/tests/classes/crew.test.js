import Crew from '../../src/classes/crew';

const getCrew = () => new Crew({
  firstName: 'Beverly',
  lastName: 'Crusher',
  gender: 'f',
  age: 40,
  rank: 'Commander',
  position: 'Chief Medical Officer',
  location: 'Sick bay'
});

const chart0 = {
  bloodPressure: 90,
  heartRate: 70,
  temperature: 98,
  o2levels: 99,
  symptoms: []
};

describe('Crew', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const c = Crew(); }).toThrow(/Cannot call a class as a function/);
  });

  describe('constructor', () => {
    
    test('should set parameters', () => {
      const c = getCrew();
      expect(c.id).toEqual(expect.stringMatching(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/));
      expect(c.class).toBe('Crew');
      expect(c.simulatorId).toBe('test');
      expect(c.firstName).toBe('Beverly');
      expect(c.lastName).toBe('Crusher');
      expect(c.gender).toBe('f');
      expect(c.age).toBe(40);
      expect(c.rank).toBe('Commander');
      expect(c.position).toBe('Chief Medical Officer');
      expect(c.location).toBe('Sick bay');
      expect(c.killed).toBe(false);
      expect(c.workRoom).toBeNull();
      expect(c.restRoom).toBeNull();
      expect(c.charts).toEqual([]);
    });
  });

  describe('fullName', () => {
    test('should get a Crew\'s full name', () => {
      const c = getCrew();
      expect(c.fullName).toBe('Beverly Crusher');
    })
  });

  describe('officialName', () => {
    test('should get a Crew\'s official name', () => {
      const c = getCrew();
      expect(c.officialName).toBe('Crusher, Beverly');
    })
  });

  describe('addChart', () => {
    test('should add a chart to a Crew', () => {
      const c = getCrew();
      c.addChart();
      expect(c.charts.length).toBe(1);
      expect(c.charts[0].constructor.name).toBe('Chart');
    });
  });

  describe('dischargeChart', () => {
    test('should discharge the first chart that has no discharge time', () => {
      const c = getCrew();
      c.addChart();
      expect(c.charts[0].dischargeTime).toBeNull();
      c.dischargeChart();
      expect(c.charts[0].dischargeTime).not.toBeNull();
      c.addChart();
      expect(c.charts[1].dischargeTime).toBeNull();
      c.dischargeChart();
      expect(c.charts[1].dischargeTime).not.toBeNull();
    });
  });

  describe('updateChart', () => {
    test('should update the first chart that has no discharge time', () => {
      const c = getCrew();

      c.addChart();
      c.updateChart(chart0);
      expect(c.charts[0].bloodPressure).toBe(90);
      expect(c.charts[0].heartRate).toBe(70)
      expect(c.charts[0].temperature).toBe(98);
      expect(c.charts[0].o2levels).toBe(99);
      expect(c.charts[0].symptoms).toEqual([]);
      expect(c.charts[0].diagnosis).toEqual(['No Diagnosis.']);
      c.updateChart({ symptoms: [ 'dizziness'] });
      expect(c.charts[0].symptoms).toEqual(['dizziness']);
      expect(c.charts[0].diagnosis).toEqual(['dehydration', 'radiation poisoning', 'acid burn']);
      c.dischargeChart();

      c.addChart();
      c.updateChart(chart0);
      expect(c.charts[1].diagnosis).toEqual(['No Diagnosis.']);
      c.updateChart({ symptoms: ['fever', 'hives'] });
      expect(c.charts[1].diagnosis).toEqual(["common cold", "levoian flu", "acid burn"])
      c.updateChart({ symptoms: ['dementia', 'itching'] });
      expect(c.charts[1].diagnosis).toEqual(['No Diagnosis.']);
      
    });
  });

  describe('update', () => {
    test('should update the crew', () => {
      const c = getCrew();
      c.update({ firstName: 'Bev', lastName: 'Crush', age: '50', rank: 'Captain' });
      expect(c.fullName).toBe('Bev Crush');
      expect(c.age).toBe(50);
      expect(c.rank).toBe('Captain')
    });
  });

});
