import Client from "../../src/classes/client";

describe("Client", () => {
  test("should throw if called without the 'new' operator", () => {
    expect(() => {
      const c = Client();
    }).toThrow(/Cannot call a class as a function/);
  });

  describe("constructor", () => {
    test("should set default parameters", () => {
      const c = new Client();
      expect(c.id).toEqual(
        expect.stringMatching(
          /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/
        )
      );
      expect(c.flightId).toBeNull();
      expect(c.simulatorId).toBeNull();
      expect(c.station).toBeNull();
      expect(c.loginName).toBeNull();
      expect(c.loginState).toBe("logout");
      expect(c.connected).toBe(false);
      expect(c.offlineState).toBeNull();
      expect(c.movie).toBeNull();
      expect(c.hypercard).toBeNull();
      expect(c.training).toBe(false);
      expect(c.overlay).toBe(false);
      expect(c.caches).toEqual([]);
      expect(c.mobile).toBe(false);
      expect(c.cards).toEqual([]);
    });

    test("should create a Scanner", () => {
      const c = new Client();
      expect(c.scanner.constructor.name).toBe("Scanner");
    });

    test("should create a Keypad", () => {
      const c = new Client();
      expect(c.keypad.constructor.name).toBe("Keypad");
    });
  });

  describe("connect", () => {
    test("should connect a client", () => {
      const c = new Client();
      c.connect({ mobile: true, cards: [1, 2, 3] });
      expect(c.connected).toBe(true);
      expect(c.mobile).toBe(true);
      expect(c.cards).toEqual([1, 2, 3]);
    });
  });

  describe("disconnect", () => {
    test("should disconnect a client", () => {
      const c = new Client({ connected: true });
      expect(c.connected).toBe(true);
      c.disconnect();
      expect(c.connected).toBe(false);
    });
  });

  describe("setFlight", () => {
    test("should set the flight", () => {
      const c = new Client();
      c.setFlight("nonExistingFlightId");
      expect(c.flightId).toBe("nonExistingFlightId");
    });

    test("should reset station and hypercard", () => {
      const c = new Client({
        station: "fakeStation",
        hypercard: "fakeHypercard"
      });
      c.setFlight("nonExistingFlightId");
      expect(c.station).toBe(null);
      expect(c.hypercard).toBe(null);
    });

    test.skip("should set flight if flightId is found in App", () => {
      // TODO: How to add a flight?
    });
  });

  describe("setSimulator", () => {
    test("should set the simulatorId", () => {
      const c = new Client();
      c.setSimulator("test_simulator_id");
      expect(c.simulatorId).toBe("test_simulator_id");
    });

    test("should reset station", () => {
      const c = new Client({ station: "test_station" });
      c.setSimulator("test_simulator_id");
      expect(c.station).toBeNull();
    });
  });

  describe("setStation", () => {
    test("should set the station", () => {
      const c = new Client();
      c.setStation("test_station");
      expect(c.station).toBe("test_station");
    });
  });

  describe("login/logout", () => {
    test("should set loginName and loginState", () => {
      const c = new Client();

      c.login("kermit");
      expect(c.loginName).toBe("kermit");
      expect(c.loginState).toBe("login");

      c.logout();
      expect(c.loginName).toBeNull();
      expect(c.loginState).toBe("logout");
    });
  });

  describe("setTraining", () => {
    test("should set the training", () => {
      const c = new Client();
      expect(c.training).toBe(false);
      c.setTraining(true);
      expect(c.training).toBe(true);
    });
  });

  describe("setHypercard", () => {
    test("should set the hypercard", () => {
      const c = new Client();
      c.setHypercard("test_card");
      expect(c.hypercard).toBe("test_card");
      c.setHypercard();
      expect(c.hypercard).toBeNull();
    });
  });

  describe("setMovie", () => {
    test("should set a movie", () => {
      const c = new Client();
      c.setMovie("not_a_real_movie");
      expect(c.movie).toBe("not_a_real_movie");
      expect(c.offlineState).toBe("movie");
    });
  });

  describe("setOfflineState", () => {
    test("should set the offline state and clear the movie", () => {
      const c = new Client();
      c.setMovie("not_a_real_movie");
      c.setOfflineState("blackout");
      expect(c.movie).toBeNull();
      expect(c.offlineState).toBe("blackout");
    });
  });

  describe("addCache", () => {
    test.skip("should work", () => {
      // TODO: What does this do?
    });
  });

  describe("removeCache", () => {
    test.skip("should work", () => {
      // TODO: What does this do?
    });
  });

  describe("setOverlay", () => {
    test("should set the overlay", () => {
      const c = new Client();
      expect(c.overlay).toBe(false);
      c.setOverlay(true);
      expect(c.overlay).toBe(true);
    });
  });
});

expect.extend({
  toBeKeypadCode(received, length = 0) {
    const pass =
      Array.isArray(received) &&
      received.every(d => d >= 0 && d <= 9) &&
      (length === 0 || received.length === length);

    if (pass) {
      return {
        message: () =>
          `expected ${received} to be a valid keycode of length ${length} (0 = any)`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be a valid keycode of length ${length} (0 = any)`,
        pass: false
      };
    }
  }
});

describe("Keypad", () => {
  describe("constructor", () => {
    test("should set default parameters", () => {
      const c = new Client();
      const k = c.keypad;
      expect(k.id).toBe(c.id);
      expect(k.code).toBeKeypadCode(4);
      expect(k.enteredCode).toEqual([]);
      expect(k.codeLength).toBe(4);
      expect(k.giveHints).toBe(true);
      expect(k.allowedAttempts).toBe(0);
      expect(k.attempts).toBe(0);
      expect(k.locked).toBe(false);
    });

    test("should set random code of length codeLength", () => {
      const c = new Client({ keypad: { codeLength: 6 } });
      expect(c.keypad.codeLength).toBe(6);
      expect(c.keypad.code).toBeKeypadCode(6);
    });

    test("should set codeLength to match code.length", () => {
      const c = new Client({ keypad: { code: [1, 2], codeLength: 7 } });
      expect(c.keypad.codeLength).toBe(2);
      expect(c.keypad.code).toBeKeypadCode(2);
    });

    test("should restrict code length to 8 digits", () => {
      const c = new Client({ keypad: { codeLength: 24 } });
      expect(c.keypad.codeLength).toBe(8);
      expect(c.keypad.code).toBeKeypadCode(8);

      const c2 = new Client({ keypad: { code: [1, 2, 3, 4, 5, 6, 7, 8, 9] } });
      expect(c.keypad.codeLength).toBe(8);
      expect(c.keypad.code).toBeKeypadCode(8);
    });
  });

  describe("setCode", () => {
    test("should set a specified code", () => {
      const c = new Client();
      c.keypad.setCode([1, 2, 3, 4, 5, 6]);
      expect(c.keypad.code).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("should generate a random code", () => {
      const c = new Client();
      c.keypad.setCodeLength(7);
      c.keypad.setCode();
      expect(c.keypad.code).toBeKeypadCode(7);
    });

    test("should set codeLength", () => {
      const c = new Client();
      c.keypad.setCode([1, 2, 3, 4, 5, 6]);
      expect(c.keypad.codeLength).toBe(6);
    });
  });

  describe("setEnteredCode", () => {
    test("should enter a code, increment attempts, and lock keypad if exceeds maximum attempts", () => {
      const c = new Client({ keypad: { allowedAttempts: 2 } });
      c.keypad.setEnteredCode([1, 2, 3, 4]);
      expect(c.keypad.enteredCode).toEqual([1, 2, 3, 4]);
      expect(c.keypad.locked).toBe(false);
      expect(c.keypad.attempts).toBe(1);
      c.keypad.setEnteredCode([1, 2, 3, 4]);
      expect(c.keypad.locked).toBe(true);
      expect(c.keypad.attempts).toBe(2);
    });
  });

  describe("reset", () => {
    test("should reset the keypad", () => {
      const c = new Client({ keypad: { allowedAttempts: 2 } });
      c.keypad.setEnteredCode([1, 2, 3, 4]);
      c.keypad.setEnteredCode([1, 2, 3, 4]);
      expect(c.keypad.enteredCode).toEqual([1, 2, 3, 4]);
      expect(c.keypad.locked).toBe(true);
      expect(c.keypad.attempts).toBe(2);
      c.keypad.reset();
      expect(c.keypad.enteredCode).toEqual([]);
      expect(c.keypad.locked).toBe(false);
      expect(c.keypad.attempts).toBe(0);
    });
  });

  describe("setCodeLength", () => {
    test("should set the code length between 1 and 8 digits", () => {
      const c = new Client();
      c.keypad.setCodeLength(5);
      expect(c.keypad.codeLength).toBe(5);
    });
  });
});

describe("Scanner", () => {
  describe("constructor", () => {
    test("should set default params", () => {
      const c = new Client();
      expect(c.scanner.id).toBe(c.id);
      expect(c.scanner.scanRequest).toBe("");
      expect(c.scanner.scanResults).toBe("");
      expect(c.scanner.scanning).toBe(false);
    });
  });

  describe("scan", () => {
    test("should scan", () => {
      const c = new Client();
      c.scanner.scan("asteroid field");
      expect(c.scanner.scanRequest).toBe("asteroid field");
      expect(c.scanner.scanning).toBe(true);
    });
  });

  describe("cancelScan", () => {
    test("should cancel the scan", () => {
      const c = new Client();
      c.scanner.scan("asteroid field");
      c.scanner.cancelScan();
      expect(c.scanner.scanning).toBe(false);
    });
  });

  describe("scanResponse", () => {
    test("should set the scan response", () => {
      const c = new Client();
      c.scanner.scan("asteroid field");
      c.scanner.scanResponse("there are asteroids here");
      expect(c.scanner.scanning).toBe(false);
      expect(c.scanner.scanResults).toBe("there are asteroids here");
    });
  });
});
