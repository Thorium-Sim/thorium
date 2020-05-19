import React from "react";
import {css} from "@emotion/core";
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
  useReactorSetWingPowerMutation,
  useReactorAckWingPowerMutation,
} from "generated/graphql";
import {DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {FaArrowDown, FaArrowUp, FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import {useMouseIncrement} from "../ShieldControl/frequencyArrows";

const trainingSteps = (battery: boolean, wings: boolean) =>
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
        "Use these buttons to change the power output of the main reactor. Using less power might make your ship more stealthy or could be required for certain repairs. Just make sure you have enough power to run the systems on your ship.",
    },
    battery && {
      selector: ".battery-container",
      content:
        "These are the ship’s batteries. They show how much power is remaining in the batteries. If you use more power than is being outputted by your reactor, power will draw from the batteries. If they run out of power, you will have to balance your power, and the batteries will need to be recharged. You can recharge batteries from your reactor by using less power than the current reactor output. Don’t let these run out in the middle of space. That would be...problematic.",
    },
    wings && {
      selector: ".wings-area",
      content:
        "The power on your ship is distributed to two wings of the ship - left wing and right wing. You need to make sure each wing has sufficient power to run their systems.",
    },
    wings && {
      selector: ".LeftWing",
      content:
        "This is where you can change how much power is allocated to Left Wing. Click the up and down arrows to change the power. Remember, you cannot allocate more power than your reactor is producing. Doing do might lead to decreased performance or cause stress on the reactor.",
    },
    wings && {
      selector: ".RightWing",
      content:
        "This is where you can change how much power is allocated to Right Wing. Sometimes, the person in charge of distributing power for their wing might request more power from you. Just click the green button to accept the request and automatically allocate the power, or click the red button to deny the request.",
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
      const aEfficiency = a?.efficiency || 0;
      const bEfficiency = b?.efficiency || 0;
      if (aEfficiency > bEfficiency) return -1;
      if (aEfficiency < bEfficiency) return 1;
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
  const efficiencyObj = efficiencies.find(
    e => e.efficiency === reactor.efficiency,
  );
  return (
    <Container
      fluid
      className="reactor-control"
      css={[
        css`
          display: grid;
          grid-template-columns: 200px 2fr 1fr 1fr;
          grid-template-rows: 1fr auto auto 200px;
          gap: 2rem;
          grid-template-areas:
            "coolant efficiency reactor reactor"
            "coolant efficiency reactor reactor"
            "coolant efficiency reactor reactor"
            "coolant reactorInfo reactor reactor";
        `,
        battery &&
          css`
            grid-template-areas:
              "coolant reactor batteries batteries"
              "coolant reactor batteries batteries"
              "coolant reactorInfo efficiency efficiency"
              "coolant reactorInfo efficiency efficiency";
          `,
        reactor.hasWings &&
          css`
            grid-template-areas:
              "coolant efficiency reactor reactor"
              "coolant efficiency reactor reactor"
              "coolant efficiency total total"
              "coolant reactorInfo leftWing rightWing";
          `,
        battery &&
          reactor.hasWings &&
          css`
            grid-template-areas:
              "coolant reactor batteries batteries"
              "coolant efficiency batteries batteries"
              "coolant reactorInfo total total"
              "coolant reactorInfo leftWing rightWing";
          `,
      ]}
    >
      <div
        css={css`
          grid-area: reactor;
        `}
      >
        <div ref={measureRef} css={{height: "100%"}}>
          {dimensions?.width && <ReactorModel dimensions={dimensions} />}
        </div>
      </div>
      <div
        css={css`
          grid-area: coolant;
          display: flex;
          flex-direction: column;
        `}
      >
        <Row
          css={css`
            flex: 1;
          `}
        >
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
      </div>
      <div
        css={css`
          grid-area: batteries;
        `}
      >
        {battery && (
          <Card className="batteries">
            <div className="battery-container">
              <Battery level={Math.min(1, Math.max(0, (charge - 0.75) * 4))} />
              <Battery level={Math.min(1, Math.max(0, (charge - 0.5) * 4))} />
              <Battery level={Math.min(1, Math.max(0, (charge - 0.25) * 4))} />
              <Battery level={Math.min(1, Math.max(0, charge * 4))} />
            </div>
          </Card>
        )}
      </div>
      <div
        css={css`
          grid-area: reactorInfo;
          align-self: end;
        `}
      >
        <div className="reactor-info">
          <h2>
            Reactor Setting:{" "}
            {
              efficiencies?.find(e => e.efficiency === reactor.efficiency)
                ?.label
            }
          </h2>
          <h3>
            Reactor Efficiency:{" "}
            <AnimatedNumber
              stepPrecision={3}
              value={reactor?.efficiency || 0}
              duration={800}
              formatValue={n => `${Math.round(n * 100)}%`}
            />
          </h3>
          <h4>
            Reactor Output:{" "}
            <AnimatedNumber
              stepPrecision={3}
              value={(reactor?.efficiency || 0) * (reactor?.powerOutput || 0)}
              duration={800}
              formatValue={n => `${Math.round(n)}`}
            />
          </h4>
          <h4
            className={
              (reactor?.efficiency || 0) * (reactor?.powerOutput || 0) <
              powerTotal
                ? "text-danger"
                : ""
            }
          >
            Power Used: {powerTotal}
          </h4>
        </div>
      </div>

      <div
        css={css`
          grid-area: efficiency;
          align-self: center;
        `}
      >
        {reactor.hasWings ? (
          <UncontrolledDropdown
            className="reactor-buttons"
            css={css`
              width: 50%;
              margin: 0 auto;
              .dropdown-menu {
                z-index: 1000000;
              }
            `}
          >
            <DropdownToggle caret block size="lg" color={efficiencyObj?.color}>
              {efficiencyObj?.label || "Change Efficiency"}
              {typeof efficiencyObj?.efficiency === "number" &&
                ": " + efficiencyObj?.efficiency * 100 + "%"}
            </DropdownToggle>
            <DropdownMenu positionFixed>
              {efficiencies.map(e => (
                <DropdownItem
                  key={e.label}
                  disabled={!e.efficiency && e.efficiency !== 0 && !ship.clamps}
                  onClick={() => setEfficiency(e.efficiency || 0)}
                >
                  {e.label}
                  {typeof e.efficiency === "number" &&
                    ": " + e.efficiency * 100 + "%"}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <Row className="reactor-buttons">
            {efficiencies.map(e => (
              <Col xl={6} key={e.label}>
                <Button
                  block
                  className={
                    e.efficiency === reactor.efficiency ? "active" : ""
                  }
                  onClick={() => setEfficiency(e.efficiency || 0)}
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
        )}
      </div>
      {reactor.hasWings && (
        <React.Fragment>
          <div
            className="wings-area"
            css={css`
              grid-area: total;
              text-align: center;
            `}
          >
            <h2>
              Total Output:{" "}
              {(reactor?.efficiency || 0) * (reactor?.powerOutput || 0)}
            </h2>
            <h2
              className={
                (reactor.leftWingPower || 0) + (reactor.rightWingPower || 0) >
                (reactor?.efficiency || 0) * (reactor?.powerOutput || 0)
                  ? "text-danger"
                  : ""
              }
            >
              Total Distributed:{" "}
              {(reactor.leftWingPower || 0) + (reactor.rightWingPower || 0)}
            </h2>
          </div>
          <Wing
            id={reactor.id}
            wing="Left"
            val={reactor.leftWingPower || 0}
            request={reactor.leftWingRequest || 0}
            requested={reactor.leftWingRequested || false}
            css={css`
              grid-area: leftWing;
            `}
          />
          <Wing
            id={reactor.id}
            wing="Right"
            val={reactor.rightWingPower || 0}
            request={reactor.rightWingRequest || 0}
            requested={reactor.rightWingRequested || false}
            css={css`
              grid-area: rightWing;
            `}
          />
        </React.Fragment>
      )}
      <Tour
        steps={trainingSteps(Boolean(battery), Boolean(reactor.hasWings))}
      />
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

const Wing: React.FC<{
  wing: string;
  id: string;
  className?: string;
  val: number;
  request: number;
  requested: boolean;
}> = ({id, wing, val, request, requested, className}) => {
  const [setWingPower] = useReactorSetWingPowerMutation();
  const [ackRequest] = useReactorAckWingPowerMutation();
  const {handleDirection, handleMouseUp, value} = useMouseIncrement({
    value: val,
    onSet: (value: number) => {
      setWingPower({variables: {id, wing: wing.toLowerCase(), power: value}});
    },
    increment: 1,
    min: 0,
    delayDec: 2,
    max: 200,
  });
  return (
    <div className={`${wing}Wing ${className}`}>
      <h3
        css={css`
          text-align: center;
        `}
      >
        {wing} Wing
      </h3>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <FaArrowDown
          size="2em"
          onMouseDown={handleDirection("down")}
          onTouchStart={handleDirection("down")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
        <div
          css={css`
            flex: 1;
          `}
        >
          <h2 className="text-center">{value}</h2>
        </div>
        <FaArrowUp
          size="2em"
          onMouseDown={handleDirection("up")}
          onTouchStart={handleDirection("up")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
      </div>
      {requested && (
        <React.Fragment>
          <hr
            css={css`
              border-color: rgba(255, 255, 255, 0.5);
            `}
          />
          <div
            css={css`
              font-size: 1.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            Requested: {request}
            <div
              css={css`
                display: flex;
              `}
            >
              <Button
                color="success"
                onClick={() =>
                  ackRequest({
                    variables: {id, wing: wing.toLowerCase(), ack: true},
                  })
                }
              >
                <FaThumbsUp />
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  ackRequest({
                    variables: {id, wing: wing.toLowerCase(), ack: false},
                  })
                }
              >
                <FaThumbsDown />
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
