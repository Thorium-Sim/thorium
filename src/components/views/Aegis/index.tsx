import React from "react";
import {
  Simulator,
  useAegisSubscription,
  useAegisPingSubscription,
  useAegisSetModeMutation,
  useAegisDeployMutation,
  useAegisRecallMutation,
  useAegisStartFabricationMutation,
  useAegisStopFabricationMutation,
  useAegisSetScreenFocusMutation,
  useAegisSetEcmIntensityMutation,
  useAegisSetRelayTargetMutation,
  useAegisSetRepairEffortMutation,
} from "generated/graphql";
import {Container, Row, Col, Button, Progress} from "helpers/reactstrap";
import TourHelper from "helpers/tourHelper";
import DamageOverlay from "../helpers/DamageOverlay";
import AegisCanvas, {AegisCanvasHandle} from "./AegisCanvas";
import SecondaryControls from "./SecondaryControls";
import ActivityLog from "./ActivityLog";
import {modeInfo} from "./modeInfo";
import {trainingSteps} from "./trainingSteps";
import "./style.scss";

interface AegisProps {
  children: React.ReactNode;
  simulator: Simulator;
}

// Crew station for the Aegis drone swarm: a live canvas + activity log on the
// left, and the touch-first control column (fabrication, deploy, mode, and the
// active mode's fine control) on the right.
const Aegis: React.FC<AegisProps> = props => {
  const {simulator} = props;
  const {loading, data} = useAegisSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: pingData} = useAegisPingSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [setMode] = useAegisSetModeMutation();
  const [deploy] = useAegisDeployMutation();
  const [recall] = useAegisRecallMutation();
  const [startFabrication] = useAegisStartFabricationMutation();
  const [stopFabrication] = useAegisStopFabricationMutation();
  const [setScreenFocus] = useAegisSetScreenFocusMutation();
  const [setEcmIntensity] = useAegisSetEcmIntensityMutation();
  const [setRelayTarget] = useAegisSetRelayTargetMutation();
  const [setRepairEffort] = useAegisSetRepairEffortMutation();
  const canvasRef = React.useRef<AegisCanvasHandle>(null);

  // Forward transient ship-action pings from the subscription to the canvas
  React.useEffect(() => {
    const ping = pingData?.aegisPing;
    if (ping) {
      canvasRef.current?.addPing({
        pingType: ping.pingType,
        strength: ping.strength,
        bearing: ping.bearing ?? null,
      });
    }
  }, [pingData]);

  if (loading || !data) {
    return <div>No Aegis System</div>;
  }
  const {aegisUpdate: aegis} = data;
  if (!aegis) {
    return <div>No Aegis System</div>;
  }

  const fabricationBlocked =
    aegis.fabricationPaused || aegis.droneCount >= aegis.maxDrones;
  const activeMode = modeInfo.find(m => m.mode === aegis.mode);
  return (
    <Container fluid className="card-aegis">
      <DamageOverlay
        system={aegis}
        message={`${aegis.displayName || aegis.name} Offline`}
      />
      <Row className="aegis-content">
        <Col sm={8} className="aegis-main">
          <div className="aegis-canvas">
            <AegisCanvas
              ref={canvasRef}
              mode={aegis.mode}
              droneCount={aegis.droneCount}
              maxDrones={aegis.maxDrones}
              deployed={aegis.deployed}
              assetPath={`/assets${simulator.assets?.top}`}
              screenFocusX={aegis.screenFocusX}
              screenFocusY={aegis.screenFocusY}
              ecmIntensity={aegis.ecmIntensity}
              relayTarget={aegis.relayTarget}
              repairEffort={aegis.repairEffort}
              structuralIntegrity={aegis.structuralIntegrity}
            />
            <div className="aegis-status">
              {aegis.deployed ? activeMode?.label : "Swarm Docked"}
            </div>
          </div>
          <ActivityLog entries={aegis.log} />
        </Col>
        <Col sm={4} className="aegis-controls">
          <div className="aegis-count">
            <h1>
              {aegis.droneCount} / {aegis.maxDrones}
            </h1>
            <h4>Drones Ready</h4>
          </div>
          <div className="aegis-fabrication">
            <Progress value={aegis.fabricationProgress * 100}>
              {aegis.fabricating && !aegis.fabricationPaused
                ? `${Math.round(aegis.fabricationProgress * 100)}%`
                : ""}
            </Progress>
            {aegis.fabricationPaused && (
              <p className="text-warning">Fabrication halted by engineering</p>
            )}
          </div>
          <div className="aegis-actions">
            {aegis.fabricating ? (
              <Button
                color="warning"
                onClick={() => stopFabrication({variables: {id: aegis.id}})}
              >
                Stop Fabrication
              </Button>
            ) : (
              <Button
                color="primary"
                disabled={fabricationBlocked}
                onClick={() => startFabrication({variables: {id: aegis.id}})}
              >
                Fabricate Drones
              </Button>
            )}
            <span className="aegis-deploy">
              {aegis.deployed ? (
                <Button
                  block
                  color="danger"
                  onClick={() => recall({variables: {id: aegis.id}})}
                >
                  Recall Swarm
                </Button>
              ) : (
                <Button
                  block
                  color="success"
                  disabled={aegis.droneCount === 0}
                  onClick={() => deploy({variables: {id: aegis.id}})}
                >
                  Launch Swarm
                </Button>
              )}
            </span>
          </div>
          <div className="aegis-modes">
            <h4>Swarm Mode</h4>
            <div className="aegis-mode-grid">
              {modeInfo.map(({mode, label}) => (
                <Button
                  key={mode}
                  color="info"
                  active={aegis.mode === mode}
                  onClick={() => setMode({variables: {id: aegis.id, mode}})}
                >
                  {label}
                </Button>
              ))}
            </div>
            <p className="aegis-mode-description">{activeMode?.description}</p>
          </div>
          <SecondaryControls
            mode={aegis.mode}
            screenFocusX={aegis.screenFocusX}
            screenFocusY={aegis.screenFocusY}
            ecmIntensity={aegis.ecmIntensity}
            relayTarget={aegis.relayTarget}
            repairEffort={aegis.repairEffort}
            onScreenFocus={(x, y) =>
              setScreenFocus({variables: {id: aegis.id, x, y}})
            }
            onEcmIntensity={intensity =>
              setEcmIntensity({variables: {id: aegis.id, intensity}})
            }
            onRelayTarget={target =>
              setRelayTarget({variables: {id: aegis.id, target}})
            }
            onRepairEffort={effort =>
              setRepairEffort({variables: {id: aegis.id, effort}})
            }
          />
        </Col>
      </Row>
      <TourHelper steps={trainingSteps} />
    </Container>
  );
};

export default Aegis;
