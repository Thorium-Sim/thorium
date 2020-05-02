import React, {Fragment} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  FormGroup,
  Label,
  Input,
} from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import randomWords from "random-words";
import {FormattedMessage} from "react-intl";
import {
  useStartFlightMutation,
  useFlightSetupQuery,
  useFlightTypesQuery,
  SimulatorCapabilities,
  Mission,
} from "generated/graphql";
import "./flightConfig.scss";
import {TrainingContext} from "containers/TrainingContextProvider";
import SearchableList from "helpers/SearchableList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FlightType = () => {
  const query = useQuery();
  const flightTypeId = query.get("flightType");

  const {data} = useFlightTypesQuery();

  const flightType = data?.thorium?.spaceEdventuresCenter?.flightTypes?.find(
    t => t?.id === flightTypeId,
  );

  if (!flightType) return null;
  return (
    <FormGroup className="name-input">
      <Label>
        Flight Type
        <Input type="text" readOnly value={flightType.name || ""} />
      </Label>
    </FormGroup>
  );
};

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <span>
        This is the screen where you configure your flight. A flight in Thorium
        starts with a simulator and, optionally a mission. If you haven't
        imported or created a simulator yet,{" "}
        <Link to="/config/simulator">be sure to do that first</Link>.
      </span>
    ),
  },
  {
    selector: ".name-input",
    content: (
      <span>
        You can choose a name for your flight, or use the three-word default.
      </span>
    ),
  },
  {
    selector: ".simulator-pick",
    content: (
      <span>
        You can see a list of available simulators here. Don't worry - this
        isn't the name of your simulator. These are just template simulators
        which will be stamped out to create the simulator you will use during
        your mission. Click a simulator to add it to the flight before moving
        on.
      </span>
    ),
  },
  {
    selector: ".stationset-pick",
    content: (
      <span>
        If you chose a simulator, you should see the station sets here. Station
        sets allow a simulator to have multiple station configurations. For
        example, if I am running a flight with 7 people on the simulator, I
        would want a different station set configuration than if I were running
        with 14 people. This lets you choose a different station sets for your
        flight. Choose a station set before moving on.
      </span>
    ),
  },
  {
    selector: ".mission-pick",
    content: (
      <span>
        If you chose a station set, you should see a list of missions here here.
        Missions are a pre-defined list of timeline events which happen during
        your flight. You can pick one or click 'Skip' to move on. You can always
        choose a mission for your simulator later. Choose a mission or 'Skip'
        before moving on.
      </span>
    ),
  },
  {
    selector: ".current-config",
    content: (
      <span>
        Your current config will appear here. In most cases, you will start the
        flight now. However, it is possible to add additional simulators for a
        joint flight mission. Joint flights take advantage of Thorium's shared
        database to share information between multiple simulators. Click 'Start
        Flight' to initialize the simulator(s) and move on.
      </span>
    ),
  },
];

function checkMissionRequirements(
  mission: Mission,
  caps: SimulatorCapabilities,
) {
  const requirements: any = {};
  if (mission.requirements?.docking && !caps.docking)
    requirements.docking = true;
  const cardReqs =
    mission.requirements?.cards.reduce((prev: string[], next) => {
      const cardReqs = next.split(" or ");
      if (cardReqs.find(c => caps.cards.includes(c))) return prev;
      return prev.concat(next);
    }, []) || [];
  if (cardReqs.length > 0) requirements.cards = cardReqs;

  const systemReqs =
    mission.requirements?.systems.reduce((prev: string[], next) => {
      if (caps.systems.includes(next)) return prev;
      return prev.concat(next);
    }, []) || [];
  if (systemReqs.length > 0) requirements.systems = systemReqs;
  return requirements;
}

function sortMissions(
  missions: Mission[],
  simulatorCapabilities: SimulatorCapabilities,
) {
  return missions.map(m => {
    const requirements: any = checkMissionRequirements(
      m,
      simulatorCapabilities,
    );
    return {
      id: m.id,
      label: m.name || "",
      category:
        Object.keys(requirements).length === 0
          ? m.category
          : "Missing Requirements",
      requirements,
    };
  });
}

interface FlightConfigItem {
  simulatorId: string;
  stationSet: string;
  missionId?: string | null;
}
const FlightConfig: React.FC = () => {
  const [name, setName] = React.useState(randomWords(3).join("-"));
  const [selectedSimulator, setSelectedSimulator] = React.useState<
    string | null
  >(null);
  const [selectedStation, setSelectedStation] = React.useState<string | null>(
    null,
  );
  const [selectedMission, setSelectedMission] = React.useState<string | null>(
    null,
  );
  const [flightConfig, setFlightConfig] = React.useState<FlightConfigItem[]>(
    [],
  );
  const query = useQuery();
  const navigate = useNavigate();

  const flightType = query.get("flightType");
  const {data, loading} = useFlightSetupQuery();
  const [startFlightMutation] = useStartFlightMutation({
    variables: {name, simulators: flightConfig, flightType},
  });

  const {training, stopTraining} = React.useContext(TrainingContext);
  const addToFlight = () => {
    if (!selectedSimulator || !selectedStation) return;
    setFlightConfig(f =>
      f.concat({
        simulatorId: selectedSimulator,
        stationSet: selectedStation,
        missionId: selectedMission,
      }),
    );
    setSelectedSimulator(null);
    setSelectedStation(null);
    setSelectedMission(null);
  };
  const startFlight = () => {
    startFlightMutation().then(({data}) => {
      navigate(`/flight/${data?.startFlight}`);
    });
  };
  if (loading) return null;
  const simulators = data?.simulators;
  const missions = data?.missions;
  if (!simulators || !missions) return null;
  const selectedSimObj = simulators.find(s => s.id === selectedSimulator);

  function isString(str: unknown): str is string {
    return typeof str === "string";
  }
  const simulatorCapabilities = {
    ...selectedSimObj?.capabilities,
    cards: selectedSimObj?.stationSets
      ?.find(s => s?.id === selectedStation)
      ?.stations?.flatMap(s => {
        const widgetCapabilities =
          s?.widgets
            ?.map(w => {
              if (w === "messages") return "Messages";
              if (w === "damageReport") return "DamageControl";
              if (w === "engineeringReport") return "EngineeringReports";
              if (w === "rndReport") return "RnDReports";
              if (w === "officerLog") return "OfficerLog";
              if (w === "commandLine") return "CommandLine";
              return w;
            })
            .filter(isString) || [];

        return (s?.cards?.flatMap(c => c?.component) || []).concat(
          widgetCapabilities,
        );
      }),
    spaceEdventures: Boolean(flightType),
  } as SimulatorCapabilities;

  return (
    <Container className="flight-config">
      <h4>
        <FormattedMessage id="flight-config" defaultMessage="Flight Config" />{" "}
        <small>
          <Link to="/">
            <FormattedMessage
              id="return-to-main"
              defaultMessage="Return to Main"
            />
          </Link>
        </small>
      </h4>
      <div style={{display: "flex"}}>
        <FormGroup className="name-input">
          <Label>
            Name
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FlightType />
      </div>
      <Row>
        <Col sm={3} className="simulator-pick">
          <h5>Pick a simulator</h5>
          <Card style={{overflowY: "auto", maxHeight: "50vh"}}>
            {simulators.map(s => (
              <li
                key={s.id}
                onClick={() => {
                  setSelectedSimulator(s.id);
                  setSelectedStation(null);
                }}
                className={`list-group-item ${
                  s.id === selectedSimulator ? "selected" : ""
                } ${flightType && !s.spaceEdventuresId ? "text-danger" : ""}`}
              >
                {s.name}
                {flightType && !s.spaceEdventuresId && (
                  <Fragment>
                    <br />
                    <small>
                      This simulator will not be recorded with Space EdVentures.
                      Please add a Simulator ID from SpaceEdventures.org to the
                      simulator config.
                    </small>
                  </Fragment>
                )}
              </li>
            ))}
          </Card>
        </Col>
        <Col sm={3} className="stationset-pick">
          {selectedSimulator && (
            <div>
              <h5>Pick a station set</h5>
              <Card style={{overflowY: "auto", maxHeight: "50vh"}}>
                {selectedSimObj?.stationSets?.map(
                  s =>
                    s && (
                      <TooltipList
                        onClick={() => setSelectedStation(s.id || null)}
                        selected={s.id === selectedStation}
                        key={s.id || ""}
                        id={s.id || ""}
                        content={s.name || ""}
                      />
                    ),
                )}
              </Card>
            </div>
          )}
        </Col>
        <Col sm={3} className="mission-pick">
          {selectedStation && (
            <>
              <h5>Pick a mission</h5>
              <SearchableList
                items={sortMissions(
                  missions as Mission[],
                  simulatorCapabilities,
                )}
                selectedItem={selectedMission}
                setSelectedItem={setSelectedMission}
                renderItem={item => {
                  return (
                    <>
                      <div>{item.label}</div>
                      {Object.keys(item.requirements).length > 0 ? (
                        <>
                          <p>
                            <strong>Missing Items</strong>
                          </p>
                          <ul>
                            {item.requirements.spaceEdventures ? (
                              <li>Space EdVentures</li>
                            ) : null}
                            {item.requirements.docking ? (
                              <li>Docking Ports/Shuttles</li>
                            ) : null}
                            {item.requirements.cards ? (
                              <li>
                                Cards:{" "}
                                <ul>
                                  {item.requirements.cards.map((c: string) => (
                                    <li key={c}>{c}</li>
                                  ))}
                                </ul>
                              </li>
                            ) : null}
                            {item.requirements.systems ? (
                              <li>
                                Systems:{" "}
                                <ul>
                                  {item.requirements.systems.map(
                                    (c: string) => (
                                      <li key={c}>{c}</li>
                                    ),
                                  )}
                                </ul>
                              </li>
                            ) : null}
                          </ul>
                        </>
                      ) : null}
                    </>
                  );
                }}
              />
              {selectedMission ? (
                <Button size="sm" block color="info" onClick={addToFlight}>
                  Continue
                </Button>
              ) : (
                <Button size="sm" block color="primary" onClick={addToFlight}>
                  Skip
                </Button>
              )}
            </>
          )}
        </Col>
        <Col sm={3} className="current-config">
          {flightConfig.length > 0 && (
            <Fragment>
              <h5>Current Config</h5>
              <Card>
                {flightConfig.map((f, i) => (
                  <ul key={`flight-config-${i}`}>
                    <li>
                      <strong>Simulator</strong>:{" "}
                      {simulators?.find(s => s.id === f.simulatorId)?.name}
                    </li>
                    <li>
                      <strong>Stations</strong>:{" "}
                      {
                        simulators
                          ?.find(s => s.id === f.simulatorId)
                          ?.stationSets?.find(s => s?.id === f.stationSet)?.name
                      }
                    </li>
                    {f.missionId && (
                      <li>
                        <strong>Mission</strong>:{" "}
                        {missions.find(m => m?.id === f.missionId)?.name}
                      </li>
                    )}
                  </ul>
                ))}
              </Card>
              <Button size="lg" block color="success" onClick={startFlight}>
                Start Flight
              </Button>
            </Fragment>
          )}
        </Col>
      </Row>
      <Tour
        steps={trainingSteps}
        training={training}
        onRequestClose={stopTraining}
      />
    </Container>
  );
};

interface TooltipListInterface {
  id: string;
  content: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}
const TooltipList: React.FC<TooltipListInterface> = ({
  content,
  id,
  selected,
  onClick,
}) => {
  return (
    <li
      id={id}
      onClick={onClick}
      className={`list-group-item ${selected ? "selected" : ""}`}
    >
      <span>{content}</span>
    </li>
  );
};

export default FlightConfig;
