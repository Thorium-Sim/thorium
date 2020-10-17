import React from "react";
import {
  Simulator,
  useComputerCoreHackingSubscription,
  useHackingAllowHackingMutation,
} from "generated/graphql";
import "./style.scss";
import {Button, Card} from "reactstrap";
import useMeasure from "helpers/hooks/useMeasure";
import Arrow from "../CommShortRange/arrow";
import FrequencySignals from "../CommShortRange/frequency";
import {Doodad} from "components/viewscreens";

interface TemplateProps {
  children: React.ReactNode;
  simulator: Simulator;
}

type HackingI = NonNullable<
  NonNullable<
    NonNullable<
      ReturnType<typeof useComputerCoreHackingSubscription>["data"]
    >["computerCoreUpdate"]
  >[0]
>;
const Hacking: React.FC<TemplateProps> = props => {
  const {simulator} = props;
  const {loading, data} = useComputerCoreHackingSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [allowHacking] = useHackingAllowHackingMutation();

  if (loading || !data) return null;
  const {computerCoreUpdate: computerCores} = data;
  const hacking = computerCores?.[0];
  if (!hacking) return <div>No Computer Core</div>;
  return (
    <div className="card-hacking">
      {hacking.hackingState === "scanning" && <Scanning hacking={hacking} />}
      {hacking.hackingState === "idle" && <FrequencyScan hacking={hacking} />}
    </div>
  );
};

const Scanning: React.FC<{hacking: HackingI}> = ({hacking}) => {
  return (
    <div className="port-scanning">
      <Doodad />
      <h1 className="port-scan-text">Scanning Ports...</h1>
      <div className="btn-container">
        <Button size="lg" color="warning" block>
          Cancel Scan
        </Button>
      </div>
    </div>
  );
};
const FrequencyScan: React.FC<{hacking: HackingI}> = ({hacking}) => {
  const [measureRef, dimensions] = useMeasure<HTMLDivElement>();
  const [measureRef2, dimensions2] = useMeasure<HTMLDivElement>();
  const [freq, setFreq] = React.useState(
    hacking.hackingPortScanFrequency || 0.5,
  );
  const mouseDown = () => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchmove", mouseMove);
    document.addEventListener("touchend", mouseUp);
  };
  const mouseMove = (e: MouseEvent | TouchEvent) => {
    const {height, top} = dimensions;
    let y = 0;
    if ("pageY" in e) {
      y = e.pageY ? e.pageY : 0;
    } else {
      y = e.touches ? e.touches[0].pageY : 0;
    }
    const value = Math.max(Math.min((y - top) / height, 1), 0);
    setFreq(value);
  };
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("touchmove", mouseMove);
    document.removeEventListener("touchend", mouseUp);
  };

  return (
    <>
      <div className="frequency-section">
        <Card style={{padding: "1rem 3rem"}}>
          <h1>Frequency</h1>
          <h3>{Math.round(freq * 37700 + 37700) / 100} MHz</h3>
        </Card>
        <Button size="lg" color="success">
          Scan Vulnerable Ports
        </Button>
      </div>
      <Card className="frequencyContainer">
        <div className="bar frequencyBar" />
        <div ref={measureRef} className="arrowHolder-right">
          {dimensions && (
            <Arrow level={freq} mouseDown={mouseDown} dimensions={dimensions} />
          )}
        </div>
      </Card>
      <Card className="signalCanvas">
        <div ref={measureRef2} className="signal-right">
          {dimensions2 && (
            <FrequencySignals
              dimensions={dimensions2}
              frequency={freq}
              amplitude={0.5}
            />
          )}
        </div>
      </Card>
    </>
  );
};
export default Hacking;
