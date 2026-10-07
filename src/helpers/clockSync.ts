// Number of recent samples used to estimate the clock offset. The median of
// these is used so a single slow round trip doesn't shift every client-side
// animation that depends on server timestamps.
export const MAX_CLOCK_SAMPLES = 5;

export interface ClockSample {
  offset: number;
  roundTrip: number;
}

/**
 * Estimates the offset between the server clock and the local clock, assuming
 * the request and response legs of the round trip took equal time.
 * Add the offset to Date.now() to get the server's time.
 */
export function computeClockSample(
  sentTime: number,
  serverTime: number,
  receivedTime: number,
): ClockSample {
  const roundTrip = receivedTime - sentTime;
  return {offset: serverTime - (sentTime + roundTrip / 2), roundTrip};
}

export function addClockSample(
  samples: ClockSample[],
  sample: ClockSample,
  max = MAX_CLOCK_SAMPLES,
): ClockSample[] {
  return samples.concat(sample).slice(-max);
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function estimateClock(samples: ClockSample[]): ClockSample {
  if (samples.length === 0) return {offset: 0, roundTrip: 0};
  return {
    offset: Math.round(median(samples.map(s => s.offset))),
    roundTrip: Math.round(median(samples.map(s => s.roundTrip))),
  };
}
