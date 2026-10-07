import {describe, expect, it} from "vitest";
import {
  addClockSample,
  computeClockSample,
  estimateClock,
  ClockSample,
  MAX_CLOCK_SAMPLES,
} from "./clockSync";

describe("computeClockSample", () => {
  it("removes half the round trip from the offset", () => {
    // Server is 30s ahead; 100ms each way.
    const sent = 1_000_000;
    const server = sent + 30_000 + 100;
    const received = sent + 200;
    expect(computeClockSample(sent, server, received)).toEqual({
      offset: 30_000,
      roundTrip: 200,
    });
  });
  it("handles a server clock that is behind the client", () => {
    const sent = 1_000_000;
    expect(computeClockSample(sent, sent - 5_000 + 10, sent + 20)).toEqual({
      offset: -5_000,
      roundTrip: 20,
    });
  });
});

describe("addClockSample", () => {
  it("keeps only the most recent samples", () => {
    let samples: ClockSample[] = [];
    for (let i = 0; i < MAX_CLOCK_SAMPLES + 3; i++) {
      samples = addClockSample(samples, {offset: i, roundTrip: i});
    }
    expect(samples).toHaveLength(MAX_CLOCK_SAMPLES);
    expect(samples[0].offset).toBe(3);
  });
});

describe("estimateClock", () => {
  it("returns zero with no samples", () => {
    expect(estimateClock([])).toEqual({offset: 0, roundTrip: 0});
  });
  it("ignores a single outlier", () => {
    const samples = [
      {offset: 30_000, roundTrip: 10},
      {offset: 30_002, roundTrip: 12},
      {offset: 34_000, roundTrip: 8_000},
      {offset: 29_999, roundTrip: 11},
      {offset: 30_001, roundTrip: 10},
    ];
    expect(estimateClock(samples)).toEqual({offset: 30_001, roundTrip: 11});
  });
});
