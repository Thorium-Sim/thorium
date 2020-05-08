import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  UncontrolledDropdown,
} from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import AnimatedNumber from "react-animated-number";
import useMeasure from "helpers/hooks/useMeasure";

import HeatBar from "../EngineControl/heatbar";
import ReactorModel from "./model";
import "./style.scss";
import {
  Simulator,
  useReactorsSubscription,
  useReactorPowerSubscription,
  useReactorDockingSubscription,
  useReactorSetEfficiencyMutation,
  useReactorCoolMutation,
} from "generated/graphql";
import {DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

const trainingSteps = (battery: boolean) =>
  [
    {
      selector: ".powerlevel-containers",
      content:
        "Your main reactor provides power to your ship. In certain circumstances, you will need to change the output of the main reactor, which you can do from this screen.",
    },
    {
      selector: ".reactor-info",
      content:
        "This shows you the current efficiency of the reactor, the reactor output, and the current power being used. Make sure your reactor output matches the current power.",
    },
    {
      selector: ".reactor-buttons",
      content:
        "Use these buttons to change the power output of the main reactor. Silent running mode is useful for masking the energy signature put off by your reactor. External power is used when your ship is connected to an external power source, like a starbase. Just make sure you have enough power to run the systems on your ship.",
    },
    battery && {
      selector: ".battery-container",
      content:
        "These are the ship’s batteries. They show how much power is remaining in the batteries. If you use more power than is being outputted by your reactor, power will draw from the batteries. If they run out of power, you will have to balance your power, and the batteries will need to be recharged. You can recharge batteries from your reactor by using less power than the current reactor output. Don’t let these run out in the middle of space. That would be...problematic.",
    },
  ].filter(Boolean);

const ReactorControl: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const {data} = useReactorsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: systems} = useReactorPowerSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: docking} = useReactorDockingSubscription({
    variables: {simulatorId: simulator.id},
  });

  const [cool] = useReactorCoolMutation();
  const [setEfficiencyMutation] = useReactorSetEfficiencyMutation();

  const [measureRef, dimensions] = useMeasure<HTMLDivElement>();
  const reactor = data?.reactorUpdate.find(r => r.model === "reactor");
  const battery = data?.reactorUpdate.find(r => r.model === "battery");
  const charge = battery?.batteryChargeLevel ?? 0;

  if (!reactor) return <p>No Reactor</p>;
  const powerTotal =
    systems?.systemsUpdate?.reduce((prev, next) => {
      return prev + (next?.power?.power || 0);
    }, 0) || 0;
  const efficiencies =
    reactor?.efficiencies?.concat().sort((a, b) => {
      if (a.efficiency > b.efficiency) return -1;
      if (a.efficiency < b.efficiency) return 1;
      return 0;
    }) || [];
  const ship = docking?.simulatorsUpdate?.[0]?.ship || {};

  const setEfficiency = (e: number) => {
    setEfficiencyMutation({variables: {id: reactor.id, e}});
  };

  const applyCoolant = () => {
    cool({variables: {id: reactor.id, state: true}});
    document.addEventListener("touchend", stopCoolant);
    document.addEventListener("mouseup", stopCoolant);
  };
  const stopCoolant = () => {
    document.removeEventListener("touchend", stopCoolant);
    document.removeEventListener("mouseup", stopCoolant);
    cool({variables: {id: reactor.id, state: false}});
  };
  return (
    <Container fluid className="reactor-control flex-column">
      <Row>
        <Col sm={5} style={{height: "100%"}}>
          <div ref={measureRef} style={{height: "100%", minHeight: "45vh"}}>
            {dimensions?.width && <ReactorModel dimensions={dimensions} />}
          </div>
        </Col>
        <Col sm={2} className="flex-column" style={{minHeight: "45vh"}}>
          <Row className="flex-max">
            <Col sm={6}>
              <HeatBar
                label="Heat"
                level={reactor.heat}
                background={
                  "linear-gradient(to bottom, #440000 0%,#aa0000 50%,#440000 100%)"
                }
              />
            </Col>
            <Col sm={6}>
              <HeatBar
                label="Coolant"
                level={reactor.coolant}
                background={
                  "linear-gradient(to bottom, #004488 0%,#0088aa 50%,#004488 100%)"
                }
              />
            </Col>
          </Row>
          <Button
            color="info"
            block
            onMouseDown={applyCoolant}
            onTouchStart={applyCoolant}
          >
            Coolant
          </Button>
        </Col>
        <Col sm={5}>
          {battery && (
            <Card className="batteries">
              <div className="battery-container">
                <Battery
                  level={Math.min(1, Math.max(0, (charge - 0.75) * 4))}
                />
                <Battery level={Math.min(1, Math.max(0, (charge - 0.5) * 4))} />
                <Battery
                  level={Math.min(1, Math.max(0, (charge - 0.25) * 4))}
                />
                <Battery level={Math.min(1, Math.max(0, charge * 4))} />
              </div>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="flex-max">
        <Col sm={7}>
          <div className="reactor-info">
            <h1>
              Reactor Setting:{" "}
              {
                efficiencies?.find(e => e.efficiency === reactor.efficiency)
                  ?.label
              }
            </h1>
            <h2>
              Reactor Efficiency:{" "}
              <AnimatedNumber
                stepPrecision={3}
                value={reactor?.efficiency || 0}
                duration={800}
                formatValue={n => `${Math.round(n * 100)}%`}
              />
            </h2>
            <h3>
              Reactor Output:{" "}
              <AnimatedNumber
                stepPrecision={3}
                value={(reactor?.efficiency || 0) * (reactor?.powerOutput || 0)}
                duration={800}
                formatValue={n => `${Math.round(n)}`}
              />
            </h3>
            <h3
              className={
                (reactor?.efficiency || 0) * (reactor?.powerOutput || 0) <
                powerTotal
                  ? "text-danger"
                  : ""
              }
            >
              Power Used: {powerTotal}
            </h3>
          </div>
        </Col>

        <Col sm={{size: 5}} className="flex-column">
          <Row className="reactor-buttons flex-max auto-scroll">
            <UncontrolledDropdown>
              <DropdownToggle caret>Dropdown</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {efficiencies.map(e => (
              <Col xl={6} key={e.label}>
                <Button
                  block
                  className={
                    e.efficiency === reactor.efficiency ? "active" : ""
                  }
                  onClick={() => setEfficiency(e.efficiency)}
                  size="lg"
                  disabled={!e.efficiency && e.efficiency !== 0 && !ship.clamps}
                  color={e.color}
                >
                  {e.label}
                  {typeof e.efficiency === "number" &&
                    ": " + e.efficiency * 100 + "%"}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Tour steps={trainingSteps(Boolean(battery))} />
    </Container>
  );
};

export default ReactorControl;

const Battery = ({level = 1}) => {
  return (
    <div className="battery">
      <div className="battery-bar" style={{height: `${level * 100}%`}} />
      <div className="battery-level">
        <AnimatedNumber
          value={level}
          duration={1000}
          formatValue={n => `${Math.round(n * 100)}`}
        />
      </div>
    </div>
  );
};
