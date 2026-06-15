import React, {useCallback, Suspense} from "react";
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
  getGlobalActions,
  getActionLabel,
} from "components/training/actionRegistry";
import CardPreviewErrorBoundary from "./CardPreviewErrorBoundary";
import {useSandboxFlight} from "./useSandboxFlight";
import {useActionRecorder} from "./useActionRecorder";

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

// Shared style for the centered status messages inside the preview pane.
const previewMessageStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "#888",
};

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
  const {
    sandboxFlightId,
    sandboxSimulatorId,
    sandboxReady,
    simulator,
    cleanupSandbox,
  } = useSandboxFlight({isOpen, simulatorId, stationSetId});

  const {recordedActions, lastCaptured, captureClick, addAction, removeAction} =
    useActionRecorder({isOpen, existingActions});

  const handleSave = useCallback(() => {
    cleanupSandbox();
    onSave(recordedActions);
  }, [cleanupSandbox, onSave, recordedActions]);

  const handleCancel = useCallback(() => {
    cleanupSandbox();
    onCancel();
  }, [cleanupSandbox, onCancel]);

  const cardComponentName = chapter?.cardComponent;
  const availableActions = [
    ...getGlobalActions(),
    ...(cardComponentName ? getActionsForCard(cardComponentName) : []),
  ];

  const CardComponent = cardComponentName
    ? (Views as any)[cardComponentName]
    : null;

  // Build preview props using the sandbox simulator
  const effectiveSimId = sandboxSimulatorId || simulatorId;
  const previewProps = {
    simulator: simulator || {
      id: effectiveSimId,
      name: "Preview",
      alertlevel: "5",
    },
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
            onClick={captureClick}
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

            {!sandboxReady || !simulator ? (
              <div style={previewMessageStyle}>
                Initializing sandbox environment...
              </div>
            ) : CardComponent ? (
              <Suspense
                fallback={
                  <div style={previewMessageStyle}>Loading card preview...</div>
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
              <div style={previewMessageStyle}>
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
                  const existing = recordedActions.find(
                    (ra: any) => ra.eventName === action.eventName,
                  );
                  const isSelected = !!existing;
                  return (
                    <Button
                      key={action.eventName}
                      size="sm"
                      color={isSelected ? "info" : "secondary"}
                      outline={!isSelected}
                      style={{textAlign: "left"}}
                      onClick={() =>
                        isSelected
                          ? removeAction(existing.id)
                          : addAction(action.eventName)
                      }
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
