// TODO: Figure out why we need import { Engine } what to do about it
import { Engine } from "../../src/classes/engine";
import { System } from "../../src/classes/generic";
import JumpDrive from "../../src/classes/jumpDrive";

describe("JumpDrive", () => {
  test("should throw if called without the 'new' operator", () => {
    expect(() => {
      const j = JumpDrive();
    }).toThrow(/Cannot call a class as a function/);
  });

  test("should extend System", () => {
    expect(new JumpDrive()).toBeInstanceOf(System);
  });

  describe("constructor", () => {
    test("should set default parameters", () => {
      const j = new JumpDrive();
      expect(j.name).toBe("Jump Drive");
      expect(j.class).toBe("JumpDrive");
      expect(j.type).toBe("JumpDrive");
      expect(j.displayName).toBe("Jump Drive");
      expect(j.simulatorId).toBeNull();
      expect(j.power).toEqual({
        power: 5,
        powerLevels: [10, 16, 22, 28, 34, 40],
        defaultLevel: -1
      });
      expect(j.env).toBe(0);
      expect(j.activated).toBe(false);
    });
  });

  describe("stealth factor", () => {
    test.skip("should calculate the stealth factor", () => {
      const j = new JumpDrive();
      expect(j.stress).toBe(0);
      j.setSectorOffset("fore", 0.3);
      j.setSectorOffset("aft", 0.4);
      j.setSectorOffset("starboard", 0.5);
      j.setSectorOffset("port", 0.6);
      expect(j.stealthFactor).toBe(0);
      j.setActivated(true);
      expect(j.stealthFactor).toBe(0.45);
    });
  });

  describe("stress", () => {
    test("should calculate the stress", () => {
      const j = new JumpDrive();
      expect(j.stress).toBe(0);
      j.addSectorOffset("fore", 0.3);
      j.addSectorOffset("aft", 0.4);
      j.addSectorOffset("starboard", 0.5);
      j.addSectorOffset("port", 0.6);
      expect(j.stress).toBeCloseTo(0.45, 6);
    });
  });

  describe("break", () => {
    test("should deactivate jump drive", () => {
      const j = new JumpDrive({ activated: true });
      expect(j.activated).toBe(true);
      j.break();
      expect(j.activated).toBe(false);
    });

    test("should call super", () => {
      const j = new JumpDrive();
      expect(j.damage.damaged).toBe(false);
      j.break();
      expect(j.damage.damaged).toBe(true);
    });
  });

  describe("setPower", () => {
    test("should decrease env to the level indicated by the power", () => {
      const j = new JumpDrive();

      j.setEnv(5);
      j.setPower(30);
      expect(j.env).toBe(4);

      j.setEnv(5);
      j.setPower(20);
      expect(j.env).toBe(2);

      j.setPower(30);
      expect(j.env).toBe(2);

      j.setEnv(10);
      j.setPower(60);
      expect(j.env).toBe(6);

      j.setPower(0);
      expect(j.env).toBe(1);
    });

    test("should call super", () => {
      const j = new JumpDrive();
      j.setPower(30);
      expect(j.power.power).toBe(30);
    });
  });
});
