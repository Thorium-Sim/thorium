import { System } from "../../src/classes/generic";
import DockingPort from "../../src/classes/docking";

describe("DockingPort", () => {
  test("should throw if called without the 'new' operator", () => {
    expect(() => {
      const d = DockingPort();
    }).toThrow(/Cannot call a class as a function/);
  });

  test("should extend System", () => {
    expect(new DockingPort()).toBeInstanceOf(System);
  });

  describe("constructor", () => {
    test("should set default parameters", () => {
      const dock = new DockingPort();
      expect(dock.class).toBe("DockingPort");
      expect(dock.type).toBe("shuttlebay");
      expect(dock.clamps).toBe(true);
      expect(dock.compress).toBe(true);
      expect(dock.doors).toBe(true);
      expect(dock.image).toBe("/Docking Images/Default.png");
      expect(dock.docked).toBe(true);
      expect(dock.direction).toBe("unspecified");

      const dock2 = new DockingPort({ type: "not_a_shuttlebay" });
      expect(dock2.type).toBe("not_a_shuttlebay");
      expect(dock2.clamps).toBe(false);
      expect(dock2.compress).toBe(false);
      expect(dock2.doors).toBe(false);
      expect(dock2.image).toBe("/Docking Images/Default.png");
      expect(dock2.docked).toBe(false);
      expect(dock2.direction).toBe("unspecified");
    });
  });

  describe("updateDockingPort", () => {
    test("should update a docking port", () => {
      const dock = new DockingPort();
      dock.updateDockingPort({
        name: "Emergency Exit",
        type: "screen_door",
        clamps: false,
        compress: false,
        doors: false,
        docked: false,
        image: "404_NOT_FOUND",
        direction: "arriving"
      });
      expect(dock.name).toBe("Emergency Exit");
      expect(dock.type).toBe("screen_door");
      expect(dock.clamps).toBe(false);
      expect(dock.compress).toBe(false);
      expect(dock.doors).toBe(false);
      expect(dock.image).toBe("404_NOT_FOUND");
      expect(dock.docked).toBe(false);
      expect(dock.direction).toBe("arriving");
    });
  });
});
