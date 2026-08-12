/**
 * Unpacks the stringified-JSON fields on the AdvancedNavigationAndAstrometrics systems
 * returned by the query/subscription.
 *
 * The list is deliberately null-tolerant. `currentLocation` is a non-null GraphQL field, so
 * any bad server-side coordinate nulls out the whole system object and the list arrives as
 * `[null]`. Mapping over that directly throws during render, which drops the station on the
 * "Perform Diagnostic" error boundary - including the flight director's core screen, leaving
 * no way to repair the simulator from the UI.
 */
export type ParsedAdvancedNav<T> = Omit<
  T,
  "flightSetPathMap" | "probeAssignments"
> & {
  flightSetPathMap: any;
  probeAssignments: Record<string, any>;
};

export default function parseAdvancedNavData<
  T extends {flightSetPathMap: string; probeAssignments: string},
>(list?: (T | null | undefined)[] | null): ParsedAdvancedNav<T>[] {
  if (!list) return [];
  return list.reduce<ParsedAdvancedNav<T>[]>((acc, d) => {
    if (!d) return acc;
    try {
      acc.push({
        ...d,
        flightSetPathMap: JSON.parse(d.flightSetPathMap),
        probeAssignments: JSON.parse(d.probeAssignments),
      });
    } catch (err) {
      console.error("Unable to parse advanced navigation data", err);
    }
    return acc;
  }, []);
}
