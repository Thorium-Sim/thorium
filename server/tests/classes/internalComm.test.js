import { Engine } from '../../src/classes/engine';
import { System } from "../../src/classes/generic";
import InternalComm from "../../src/classes/internalComm";

describe('InternalComm', () => {

  test('should throw if called without the \'new\' operator', () => {
    expect(() => { const i = InternalComm(); }).toThrow(/Cannot call a class as a function/);
  });

  test('should extend System', () => {
    expect(new InternalComm()).toBeInstanceOf(System);
  })

  describe('constructor', () => {   
    test('should set default parameters', () => {
      const i = new InternalComm();
      expect(i.class).toBe('InternalComm');
      expect(i.type).toBe('InternalComm');
      expect(i.name).toBe('Internal Communications');
      expect(i.displayName).toBe('Internal Comm');
      expect(i.state).toBe('idle');
      expect(i.outgoing).toBeNull();
      expect(i.incoming).toBeNull();
    });
  });

  describe('break', () => {
    test('should set state to idle', () => {
      const i = new InternalComm({ state: 'connected' });
      expect(i.state).toBe('connected');
      i.break();
      expect(i.state).toBe('idle');
    });

    test('should call super', () => {
      const i = new InternalComm();
      i.break();
      expect(i.damage.damaged).toBe(true);
    });
  });

  describe('callIncoming', () => {
    test('should accept incoming comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callIncoming(comm_partner);
      expect(i.state).toBe('idle');
      expect(i.incoming).toBe(comm_partner);
      expect(i.outgoing).toBeNull();
    });
  });

  describe('connectIncoming', () => {
    test('should connect to incoming comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callIncoming(comm_partner);
      i.connectIncoming();
      expect(i.state).toBe('connected');
      expect(i.incoming).toBe(comm_partner);
      expect(i.outgoing).toBe(comm_partner);
    });
  });

  describe('cancelIncoming', () => {
    test('should connect to incoming comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callIncoming(comm_partner);
      i.connectIncoming();
      i.cancelIncomingCall();
      expect(i.state).toBe('idle');
      expect(i.incoming).toBeNull();
      expect(i.outgoing).toBeNull();
    });
  });


  describe('callOutgoing', () => {
    test('should accept outgoing comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callOutgoing(comm_partner);
      expect(i.state).toBe('idle');
      expect(i.outgoing).toBe(comm_partner);
      expect(i.incoming).toBeNull();
    });
  });

  describe('connectOutgoing', () => {
    test('should connect to outgoing comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callOutgoing(comm_partner);
      i.connectOutgoing();
      expect(i.state).toBe('connected');
      expect(i.outgoing).toBe(comm_partner);
      expect(i.incoming).toBe(comm_partner);
    });
  });

  describe('cancelOutgoing', () => {
    test('should connect to outgoing comm', () => {
      const i  = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callOutgoing(comm_partner);
      i.connectOutgoing();
      i.cancelOutgoingCall();
      expect(i.state).toBe('idle');
      expect(i.outgoing).toBeNull();
      expect(i.incoming).toBeNull();
    });
  });

  describe('setPower', () => {
    test('should set comm to idle if power level below minimum', () => {
      const i = new InternalComm();
      const comm_partner = 'comm_partner';
      i.callIncoming(comm_partner);
      i.connectIncoming();
      expect(i.state).toBe('connected');
      
      i.setPower(1);
      expect(i.state).toBe('idle');
    });

    test('should call super', () => {
      const i = new InternalComm();
      i.setPower(3.14);
      expect(i.power.power).toBe(3.14);
    });
  });
});

