import React, {useState, useCallback, Suspense, useEffect, useRef} from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "helpers/reactstrap";
import Views from "components/views";
import {
  getActionsForCard,
  getActionLabel,
} from "components/training/actionRegistry";
import {
  START_SANDBOX_FLIGHT,
  DELETE_SANDBOX_FLIGHT,
  SANDBOX_FLIGHT_SIMULATORS,
} from "components/training/queries";
import {useSimulatorUpdateSubscription} from "generated/graphql";
import {useMutation} from "react-apollo";
import {useApolloClient} from "@apollo/client";
import {subscribe} from "helpers/pubsub";

interface RecordActionsModalProps {
  isOpen: boolean;
  chapter: any;
  existingActions: any[];
  simulatorId: string;
  stationSetId: string;
  stationName: string;
  onSave: (actions: any[]) => void;
  onCancel: () => void;
}

// Error boundary that shows the actual error for debugging
class CardPreviewErrorBoundary extends React.Component<
  {children: React.ReactNode; cardName: string},
  {error: Error | null}
> {
  state = {error: null as Error | null};

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#f44336",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p>Unable to render card preview for "{this.props.cardName}".</p>
          <p style={{fontSize: "12px", color: "#888", marginTop: "8px"}}>
            {this.state.error.message}
          </p>
          <p style={{fontSize: "12px", color: "#666", marginTop: "4px"}}>
            You can still select actions from the list on the right.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const RecordActionsModal: React.FC<RecordActionsModalProps> = ({
  isOpen,
  chapter,
  existingActions,
  simulatorId,
  stationSetId,
  stationName,
  onSave,
  onCancel,
}) => {
  const [recordedActions, setRecordedActions] = useState<any[]>(existingActions);
  const [lastCaptured, setLastCaptured] = useState<string | null>(null);
  const lastCapturedTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Sandbox flight state
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

  // Create sandbox flight when modal opens
  useEffect(() => {
    if (!isOpen) return;

    setRecordedActions(existingActions);
    setLastCaptured(null);
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
            deleteFlightMutation({
              variables: {flightId: data.startFlight},
            });
          }
          return;
        }
        const flightId = data?.startFlight;
        if (!flightId) return;
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
        if (cancelled || !result) return;
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
        deleteFlightMutation({
          variables: {flightId},
        }).catch(() => {});
        sandboxFlightIdRef.current = null;
      }
    };
  }, [deleteFlightMutation]);

  const cleanupSandbox = useCallback(() => {
    const flightId = sandboxFlightIdRef.current;
    if (flightId) {
      deleteFlightMutation({
        variables: {flightId},
      }).catch(err =>
        console.error("Failed to delete sandbox flight:", err),
      );
      sandboxFlightIdRef.current = null;
      setSandboxFlightId(null);
      setSandboxSimulatorId(null);
      setSandboxReady(false);
    }
  }, [deleteFlightMutation]);

  const handleSave = useCallback(() => {
    cleanupSandbox();
    onSave(recordedActions);
  }, [cleanupSandbox, onSave, recordedActions]);

  const handleCancel = useCallback(() => {
    cleanupSandbox();
    onCancel();
  }, [cleanupSandbox, onCancel]);

  const cardComponentName = chapter?.cardComponent;
  const availableActions = cardComponentName
    ? getActionsForCard(cardComponentName)
    : [];

  // Subscribe to ALL mutation-events to capture card interactions
  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = subscribe(
      "mutation-event",
      ({event, args}: {event: string; args: any}) => {
        if (event === "clockSync" || event === "startFlight" || event === "deleteFlight") return;
        setRecordedActions(prev => {
          if (prev.find((a: any) => a.eventName === event)) return prev;
          return [
            ...prev,
            {id: `ra-${Date.now()}`, eventName: event, args: args || null},
          ];
        });

        // Flash indicator
        setLastCaptured(event);
        if (lastCapturedTimeout.current) {
          clearTimeout(lastCapturedTimeout.current);
        }
        lastCapturedTimeout.current = setTimeout(
          () => setLastCaptured(null),
          1500,
        );
      },
    );

    return () => {
      unsubscribe();
      if (lastCapturedTimeout.current) {
        clearTimeout(lastCapturedTimeout.current);
      }
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Click handler — captures click events as recordable actions
  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Walk up to find the closest interactive element
    const interactive = target.closest(
      "button, a, [role='button'], input, select, .btn",
    ) as HTMLElement | null;
    const el = interactive || target;

    const tag = el.tagName.toLowerCase();
    // Ignore clicks on generic containers
    if (["div", "span", "col", "row", "container", "section"].includes(tag) && !interactive) {
      return;
    }

    const text =
      el.textContent?.trim().replace(/\s+/g, " ").substring(0, 60) ||
      el.getAttribute("aria-label") ||
      el.getAttribute("title") ||
      "";

    if (!text) return;

    // Build a stable identifier and args for this click target
    const clickEventName = `click:${text}`;
    const clickArgs = {
      text,
      tag,
      className: el.className
        ? String(el.className).split(" ").filter(Boolean).slice(0, 3).join(" ")
        : null,
    };

    // Add to recorded actions (skip duplicates)
    setRecordedActions(prev => {
      if (prev.find((a: any) => a.eventName === clickEventName)) return prev;
      return [
        ...prev,
        {id: `ra-${Date.now()}`, eventName: clickEventName, args: clickArgs},
      ];
    });

    // Flash indicator
    setLastCaptured(clickEventName);
    if (lastCapturedTimeout.current) clearTimeout(lastCapturedTimeout.current);
    lastCapturedTimeout.current = setTimeout(
      () => setLastCaptured(null),
      1500,
    );
  };

  const CardComponent = cardComponentName
    ? (Views as any)[cardComponentName]
    : null;

  const addAction = (eventName: string) => {
    if (recordedActions.find((a: any) => a.eventName === eventName)) return;
    setRecordedActions(prev => [
      ...prev,
      {id: `ra-${Date.now()}`, eventName, args: null},
    ]);
  };

  const removeAction = (actionId: string) => {
    setRecordedActions(prev => prev.filter((a: any) => a.id !== actionId));
  };

  // Build preview props using the sandbox simulator
  const effectiveSimId = sandboxSimulatorId || simulatorId;
  const previewProps = {
    simulator: simulator || {id: effectiveSimId, name: "Preview", alertlevel: "5"},
    station: {name: stationName, cards: []},
    flight: {id: sandboxFlightId || "preview"},
    clientObj: {
      id: "preview-client",
      simulatorId: effectiveSimId,
      station: stationName,
      training: false,
      offlineState: null,
    },
    cardName: cardComponentName,
    changeCard: () => {},
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleCancel}
      size="xl"
      style={{maxWidth: "90vw"}}
    >
      <ModalHeader toggle={handleCancel}>
        <span
          style={{
            color: "#f44336",
            marginRight: "8px",
            animation: "pulse 1.5s infinite",
          }}
        >
          &#x25CF; REC
        </span>
        Record Required Actions
        {chapter && (
          <small
            style={{display: "block", fontWeight: "normal", color: "#888"}}
          >
            Card: {cardComponentName}
          </small>
        )}
      </ModalHeader>
      <ModalBody>
        <div style={{display: "flex", gap: "16px", minHeight: "500px"}}>
          {/* Left: Card Preview — interactive for recording */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="record-card-preview"
            onClick={handlePreviewClick}
            style={{
              flex: 2,
              border: "2px solid #f44336",
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
              background: "#1a1a2e",
            }}
          >
            {/* Recording flash overlay */}
            {lastCaptured && (
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  right: "8px",
                  zIndex: 1000,
                  padding: "6px 12px",
                  background: "rgba(0,188,212,0.9)",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "13px",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                Captured: {getActionLabel(lastCaptured, cardComponentName)}
              </div>
            )}

            {!sandboxReady ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#888",
                }}
              >
                Initializing sandbox environment...
              </div>
            ) : CardComponent ? (
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "#888",
                    }}
                  >
                    Loading card preview...
                  </div>
                }
              >
                <CardPreviewErrorBoundary cardName={cardComponentName}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "500px",
                      position: "relative",
                    }}
                  >
                    <CardComponent {...previewProps} />
                  </div>
                </CardPreviewErrorBoundary>
              </Suspense>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#888",
                }}
              >
                No card component selected for this chapter.
              </div>
            )}
          </div>

          {/* Right: Action Picker */}
          <div style={{flex: 1, minWidth: "280px"}}>
            <p style={{fontSize: "13px", color: "#aaa", marginBottom: "8px"}}>
              Interact with the card on the left to automatically record
              actions, or manually select them below.
            </p>

            <div style={{marginBottom: "16px"}}>
              <Label style={{fontWeight: 600}}>Available Actions</Label>
              <div
                style={{display: "flex", flexDirection: "column", gap: "4px"}}
              >
                {availableActions.length === 0 && (
                  <span style={{color: "#888", fontSize: "13px"}}>
                    No actions registered for this card component.
                  </span>
                )}
                {availableActions.map(action => {
                  const isSelected = recordedActions.some(
                    (ra: any) => ra.eventName === action.eventName,
                  );
                  return (
                    <Button
                      key={action.eventName}
                      size="sm"
                      color={isSelected ? "info" : "secondary"}
                      outline={!isSelected}
                      style={{textAlign: "left"}}
                      onClick={() => {
                        if (isSelected) {
                          const existing = recordedActions.find(
                            (ra: any) => ra.eventName === action.eventName,
                          );
                          if (existing) removeAction(existing.id);
                        } else {
                          addAction(action.eventName);
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label style={{fontWeight: 600}}>
                Required Actions ({recordedActions.length})
              </Label>
              {recordedActions.length === 0 && (
                <p style={{color: "#888", fontSize: "13px"}}>
                  No actions recorded yet. Click buttons on the card or select
                  actions above.
                </p>
              )}
              {recordedActions.map((action: any) => (
                <div
                  key={action.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 8px",
                    marginBottom: "4px",
                    background: "rgba(0,188,212,0.1)",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{flex: 1}}>
                    {getActionLabel(action.eventName, cardComponentName)}
                  </span>
                  <Button
                    size="sm"
                    color="danger"
                    outline
                    onClick={() => removeAction(action.id)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save Actions
        </Button>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
      <style>{`
        .record-card-preview * {
          pointer-events: auto !important;
        }
      `}</style>
    </Modal>
  );
};

export default RecordActionsModal;
