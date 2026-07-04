import {useState, useEffect, useRef, useCallback} from "react";
import {useMutation} from "react-apollo";
import {useApolloClient} from "@apollo/client";
import {useSimulatorUpdateSubscription} from "generated/graphql";
import {
  START_SANDBOX_FLIGHT,
  DELETE_SANDBOX_FLIGHT,
  SANDBOX_FLIGHT_SIMULATORS,
} from "components/training/queries";

interface UseSandboxFlightParams {
  isOpen: boolean;
  simulatorId: string;
  stationSetId: string;
}

// Manages the throwaway "sandbox" flight that backs the Record Actions card
// preview: starts a flight when the modal opens, resolves its simulator id,
// subscribes to that simulator's data, and tears the flight down again on
// close/unmount. Returns everything the modal needs to render the live preview.
export function useSandboxFlight({
  isOpen,
  simulatorId,
  stationSetId,
}: UseSandboxFlightParams) {
  const client = useApolloClient();
  const [sandboxFlightId, setSandboxFlightId] = useState<string | null>(null);
  const [sandboxSimulatorId, setSandboxSimulatorId] = useState<string | null>(
    null,
  );
  const [sandboxReady, setSandboxReady] = useState(false);
  const sandboxFlightIdRef = useRef<string | null>(null);

  const [startFlightMutation] = useMutation(START_SANDBOX_FLIGHT);
  const [deleteFlightMutation] = useMutation(DELETE_SANDBOX_FLIGHT);

  // Subscribe to the sandbox simulator's data for the card preview
  const {data: simData} = useSimulatorUpdateSubscription({
    variables: {simulatorId: sandboxSimulatorId || ""},
    skip: !sandboxSimulatorId,
  });
  const simulator = simData?.simulatorsUpdate?.[0];

  // Create sandbox flight when the modal opens
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSandboxReady(false);

    let cancelled = false;

    startFlightMutation({
      variables: {
        name: `__sandbox_${Date.now()}`,
        simulators: [{simulatorId, stationSet: stationSetId}],
      },
    })
      .then(({data}: any) => {
        if (cancelled) {
          // Modal closed before flight was created — clean up
          if (data?.startFlight) {
            deleteFlightMutation({variables: {flightId: data.startFlight}});
          }
          return;
        }
        const flightId = data?.startFlight;
        if (!flightId) {
          return;
        }
        setSandboxFlightId(flightId);
        sandboxFlightIdRef.current = flightId;

        // Query for the sandbox simulator ID
        return client.query({
          query: SANDBOX_FLIGHT_SIMULATORS,
          variables: {flightId},
          fetchPolicy: "network-only",
        });
      })
      .then((result: any) => {
        if (cancelled || !result) {
          return;
        }
        const simId = result.data?.flights?.[0]?.simulators?.[0]?.id;
        if (simId) {
          setSandboxSimulatorId(simId);
          setSandboxReady(true);
        }
      })
      .catch((err: any) => {
        console.error("Failed to create sandbox flight:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup sandbox on unmount (handles unexpected navigation)
  useEffect(() => {
    return () => {
      const flightId = sandboxFlightIdRef.current;
      if (flightId) {
        deleteFlightMutation({variables: {flightId}}).catch(() => {});
        sandboxFlightIdRef.current = null;
      }
    };
  }, [deleteFlightMutation]);

  const cleanupSandbox = useCallback(() => {
    const flightId = sandboxFlightIdRef.current;
    if (flightId) {
      deleteFlightMutation({variables: {flightId}}).catch(err =>
        console.error("Failed to delete sandbox flight:", err),
      );
      sandboxFlightIdRef.current = null;
      setSandboxFlightId(null);
      setSandboxSimulatorId(null);
      setSandboxReady(false);
    }
  }, [deleteFlightMutation]);

  return {
    sandboxFlightId,
    sandboxSimulatorId,
    sandboxReady,
    simulator,
    cleanupSandbox,
  };
}
