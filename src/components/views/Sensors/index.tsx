import React, {MouseEvent} from "react";
import {Button, Row, Col, Card, CardBody} from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import {Typing} from "react-typing";
import "./style.scss";
import Grid from "./GridDom";
import DamageOverlay from "../helpers/DamageOverlay";
import SensorScans from "./SensorScans";
import {
  useSensorsSubscription,
  TargetingRangeDocument,
  useSensorsSetPingModeMutation,
  useSensorsSendPingMutation,
  useSetCalculatedTargetMutation,
  Simulator,
  SensorContact,
  Station,
  Ping_Modes,
  Sensors as SensorsI,
  useSensorsRemoveProcessedDataMutation,
  SensorsPingSubDocument,
} from "generated/graphql";
import {useApolloClient} from "@apollo/client";
import useDimensions from "helpers/hooks/useDimensions";
import {Duration} from "luxon";
import {capitalCase} from "change-case";
import useInterval from "helpers/hooks/useInterval";
import {FaBan} from "react-icons/fa";

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Sensors allow you to get information about what is going on around your ship.",
  },
  {
    selector: "#sensorGrid",
    content:
      "This is your sensor grid. Your ship is located at the center of the grid, where the lines converge. The top segment is directly in front of your ship, as if you were looking down on your ship from above it. You can see the relative location of objects around your ship on this grid.",
  },
  /*{
    selector: ".ping-controls",
    content:
      "Some sensor systems allow you to control how often the sensor grid 'pings', or detects objects around the ship. You can control the rate of pings with these controls. Whenever your sensors pings, it sends out a faint signal which can be detected by other ships. Turning down the rate of sensor pings can keep your ship's position masked."
  },*/
  {
    selector: ".contact-info",
    content:
      "When you move your mouse over a contact, the contact's identification will show up in this box.",
  },
  {
    selector: ".processedData",
    content:
      "Text will sometimes appear in this box. Your sensors will passively scan and when it finds useful information it will inform you here. Whenever it does, you want to read it out loud so the Captain can know about what is going on around your ship.",
  },
  {
    selector: ".scanEntry",
    content:
      "If you want to know specific information about a contact around your ship, you can scan it directly. Just type what you want to know, such as the weapons on a ship, the population, size, distance, or anything else you want to know about. Click the scan button to initiate your scan. The results will appear in the box below.",
  },
];

export function usePing(sensorsId?: string) {
  const [pinging, setPinging] = React.useState({});
  const [pinged, setPinged] = React.useState(false);
  const mountedRef = React.useRef(false);

  const client = useApolloClient();
  React.useEffect(() => {
    function doPing() {
      setPinged(false);
      setPinging({});
    }
    if (!sensorsId) return;
    const subscription = client
      .subscribe({
        query: SensorsPingSubDocument,
        variables: {
          sensorsId,
        },
      })
      .subscribe({
        next() {
          doPing();
        },
        error(err) {
          console.error("err", err);
        },
      });

    return () => subscription.unsubscribe();
  }, [sensorsId, client]);
  React.useEffect(() => {
    if (mountedRef.current) {
      setPinged(true);
      const timeout = setTimeout(() => {
        setPinged(false);
      }, 1000 * 6.5);
      return () => clearTimeout(timeout);
    }
    mountedRef.current = true;
  }, [pinging]);

  return pinged;
}

function calculateTime(milliseconds: number) {
  if (milliseconds < 1000) return "Just now";
  return (
    Object.entries(
      Duration.fromObject({
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds,
      })
        .normalize()
        .toObject(),
    )
      .filter(t => t[1] !== 0)
      .map(t => `${t[1]} ${capitalCase(t[0])}`)[0] + " ago"
  );
}

const TimeCounter: React.FC<{time: Date}> = ({time}) => {
  const milliseconds = Date.now() - Number(time);
  return <>{calculateTime(milliseconds)}</>;
};

export const ProcessedData: React.FC<{sensors: SensorsI; core?: boolean}> = ({
  sensors,
  core,
}) => {
  const [key, setKey] = React.useState(0);
  const [removeProcessedData] = useSensorsRemoveProcessedDataMutation();

  useInterval(() => {
    setKey(Math.random());
  }, 1000);
  return (
    <>
      <Col className="col-sm-12">
        <label>Processed Data</label>
      </Col>
      <Col className="col-sm-12">
        <Card className="processedData">
          <CardBody>
            {sensors.processedData
              ?.concat()
              .sort((a, b) => {
                const dateA = new Date(a.time);
                const dateB = new Date(b.time);
                if (dateA > dateB) return -1;
                if (dateB > dateA) return 1;
                return 0;
              })
              .map((p, i, arr) => (
                <React.Fragment key={p.time}>
                  <pre>
                    {core && (
                      <FaBan
                        className="text-danger"
                        onClick={() =>
                          removeProcessedData({
                            variables: {id: sensors.id, time: p.time},
                          })
                        }
                      />
                    )}
                    <Typing keyDelay={20} key={p.time}>
                      {p.value}
                    </Typing>
                    <div>
                      <small>
                        <TimeCounter key={key} time={new Date(p.time)} />
                      </small>
                    </div>
                  </pre>
                  {i < arr.length - 1 && <hr />}
                </React.Fragment>
              ))}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

interface HoverContact {
  name: string;
  picture: string;
}
interface SensorsProps {
  simulator: Simulator;
  station: Station;
  widget: boolean;
  viewscreen: boolean;
}

const Sensors: React.FC<SensorsProps> = ({
  simulator,
  widget,
  station,
  viewscreen,
}) => {
  const [hoverContact, setHoverContact] = React.useState<HoverContact>({
    name: "",
    picture: "",
  });
  const [weaponsRange, setWeaponsRange] = React.useState<number | null>(null);

  const [measureRef, dimensions] = useDimensions();

  const client = useApolloClient();
  const [setCalculatedTarget] = useSetCalculatedTargetMutation();

  const {loading, data} = useSensorsSubscription({
    variables: {simulatorId: simulator.id, domain: "external"},
  });

  const pinged = usePing(data?.sensorsUpdate?.[0].id);

  const gridMouseDown = React.useCallback(() => {
    // setCalculatedTarget
    setCalculatedTarget({
      variables: {
        simulatorId: simulator.id,
        coordinates: {x: 0, y: 0, z: 0},
        contactId: null,
      },
    });
  }, [setCalculatedTarget, simulator.id]);
  const includeTypes = React.useMemo(
    () => ["contact", "planet", "border", "ping", "projectile"],
    [],
  );

  const clickContact = React.useCallback(
    (
      e: MouseEvent,
      contact: SensorContact,
      selectContact: (contact: SensorContact | string) => void,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      selectContact(contact);
      if (!contact.location) return;
      const {x, y, z} = contact.location;
      setCalculatedTarget({
        variables: {
          simulatorId: simulator.id,
          coordinates: {
            x: Math.abs(x || 0),
            y: Math.abs(y || 0),
            z: Math.abs(z || 0),
          },
          contactId: contact.id,
        },
      });
    },
    [setCalculatedTarget, simulator.id],
  );

  if (loading || !data) return <p>Loading...</p>;

  const sensors = data.sensorsUpdate?.[0];
  if (!sensors) return <p>No sensors system.</p>;

  const showWeaponsRange = async () => {
    const {data} = await client.query({
      query: TargetingRangeDocument,
      variables: {id: simulator.id},
    });

    const target = data?.targeting[0];
    if (!target) return;
    setWeaponsRange(target.range);
    setTimeout(() => {
      setWeaponsRange(null);
    }, 1000);
  };

  const needScans =
    !widget && !station?.cards?.find(c => c?.component === "SensorScans");
  const {pingMode, pings} = sensors;
  return (
    <div className="cardSensors">
      <div>
        <Row>
          {needScans && (
            <Col sm={3}>
              {!viewscreen && (
                <>
                  <DamageOverlay
                    message="External Sensors Offline"
                    system={sensors}
                  />
                  <SensorScans sensors={sensors} client={client} />

                  <Button onClick={showWeaponsRange} block>
                    Show Weapons Range
                  </Button>
                  {/*<Row>
                  <Col className="col-sm-12">
                  <h4>Contact Coordinates</h4>
                  </Col>
                  <Col className="col-sm-12">
                  <Card>
                  <p>X:</p>
                  <p>Y:</p>
                  <p>Z:</p>
                  </Card>
                  </Col>
                  </Row>
                */}
                </>
              )}
            </Col>
          )}
          <Col
            sm={{size: 6, offset: !needScans ? 1 : 0}}
            className="arrayContainer"
          >
            <div className="spacer" />
            <div id="threeSensors" className="array" ref={measureRef}>
              {dimensions?.width && (
                <Grid
                  dimensions={dimensions}
                  sensor={sensors.id}
                  damaged={sensors.damage?.damaged}
                  hoverContact={setHoverContact}
                  movement={sensors.movement}
                  ping={pinged}
                  pings={pings}
                  simulatorId={simulator.id}
                  segments={sensors.segments}
                  interference={sensors.interference}
                  mouseDown={clickContact}
                  gridMouseDown={gridMouseDown}
                  includeTypes={includeTypes}
                  range={
                    weaponsRange && {
                      size: weaponsRange,
                      color: "rgba(255, 0, 0, 0.5)",
                    }
                  }
                />
              )}
            </div>
            <DamageOverlay
              message="External Sensors Offline"
              system={sensors}
            />
          </Col>
          <Col sm={{size: 3, offset: !needScans ? 1 : 0}} className="data">
            {!viewscreen && (
              <RightSensorsSidebar
                needScans={needScans}
                pingMode={pingMode || undefined}
                ping={pinged}
                pings={Boolean(pings)}
                sensors={sensors}
                hoverContact={hoverContact}
                showWeaponsRange={showWeaponsRange}
              />
            )}
          </Col>
        </Row>
      </div>
      <Tour steps={trainingSteps} />
    </div>
  );
};

const RightSensorsSidebar: React.FC<{
  needScans: boolean;
  pingMode?: Ping_Modes;
  ping: boolean;
  pings?: boolean;
  sensors: SensorsI;
  hoverContact: HoverContact;
  showWeaponsRange: () => void;
}> = ({
  pings,
  needScans,
  pingMode,
  ping,
  sensors,
  hoverContact,
  showWeaponsRange,
}) => {
  const [whichControl, setWhichControl] = React.useState<"info" | "options">(
    "info",
  );
  return (
    <>
      {pings && (
        <div className="sensor-control-buttons">
          <Button
            active={whichControl === "info"}
            onClick={() => setWhichControl("info")}
          >
            Contacts
          </Button>
          <Button
            active={whichControl === "options"}
            onClick={() => setWhichControl("options")}
          >
            Options
          </Button>
        </div>
      )}

      {whichControl === "options" && pings && pingMode && (
        <PingControl sensorsId={sensors.id} pingMode={pingMode} ping={ping} />
      )}
      {(whichControl === "info" || !pings) && (
        <Row className="contact-info">
          <Col className="col-sm-12">
            <label>Contact Information</label>
          </Col>
          <Col className="col-sm-12">
            <div className="card contactPictureContainer">
              {hoverContact.picture && (
                <div
                  className="contactPicture"
                  style={{
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                    backgroundImage: `url('/assets${hoverContact.picture}')`,
                  }}
                />
              )}
            </div>
          </Col>
          <Col className="col-sm-12 contactNameContainer">
            <div className="card contactName">{hoverContact.name}</div>
          </Col>
        </Row>
      )}

      <Row>
        <ProcessedData sensors={sensors} />
      </Row>
      {!needScans && (
        <Button onClick={showWeaponsRange} block>
          Show Weapons Range
        </Button>
      )}
    </>
  );
};

const PingControl: React.FC<{
  pingMode: Ping_Modes;
  ping: boolean;
  sensorsId: string;
}> = ({sensorsId, pingMode, ping}) => {
  const [setPingMode] = useSensorsSetPingModeMutation();
  const selectPing = (which: Ping_Modes) => {
    setPingMode({
      variables: {
        id: sensorsId,
        mode: which,
      },
    });
  };
  const [sendPing] = useSensorsSendPingMutation();

  const triggerPing = () => {
    sendPing({variables: {id: sensorsId}});
  };
  return (
    <Row className="ping-control">
      <Col sm="12">
        <label>Sensor Options:</label>
      </Col>
      <Col sm={12} className="ping-controls">
        <Card>
          <li
            onClick={() => selectPing(Ping_Modes.Active)}
            className={`list-group-item ${
              pingMode === Ping_Modes.Active ? "selected" : ""
            }`}
          >
            Active Scan
          </li>
          <li
            onClick={() => selectPing(Ping_Modes.Passive)}
            className={`list-group-item ${
              pingMode === Ping_Modes.Passive ? "selected" : ""
            }`}
          >
            Passive Scan
          </li>
          <li
            onClick={() => selectPing(Ping_Modes.Manual)}
            className={`list-group-item ${
              pingMode === Ping_Modes.Manual ? "selected" : ""
            }`}
          >
            Manual Scan
          </li>
        </Card>
        <Button
          block
          disabled={ping}
          className="pingButton"
          style={{
            opacity: pingMode === "manual" ? 1 : 0,
            pointerEvents: pingMode === "manual" ? "auto" : "none",
          }}
          onClick={triggerPing}
        >
          Ping
        </Button>
      </Col>
    </Row>
  );
};

export default Sensors;
