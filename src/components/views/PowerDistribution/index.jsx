import React from "react";
import {css} from "@emotion/core";
import gql from "graphql-tag.macro";
import {Container, Card} from "helpers/reactstrap";
import {withApollo} from "react-apollo";
import Tour from "helpers/tourHelper";
import "./style.scss";
import AnimatedNumber from "react-animated-number";
import PowerLine from "../JumpDrive/powerLine";
import {useQuery, useSubscription} from "@apollo/client";
import {capitalCase} from "change-case";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {useMouseIncrement} from "../ShieldControl/frequencyArrows";
import {Button} from "reactstrap";
import {useReactorRequestWingPowerMutation} from "generated/graphql";

const mutation = gql`
  mutation ChangePower($id: ID!, $level: Int!) {
    changePower(systemId: $id, power: $level)
  }
`;

export const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, power: true) {
      id
      displayName
      type
      wing
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
    }
  }
`;

export const REACTOR_SUB = gql`
  subscription ReactorUpdate($simulatorId: ID) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      model
      batteryChargeLevel
      efficiency
      powerOutput
      hasWings
      leftWingPower
      leftWingRequest
      leftWingRequested
      rightWingPower
      rightWingRequest
      rightWingRequested
    }
  }
`;

const PowerDistribution = ({client, simulator, clientObj, wing = null}) => {
  const {loading, data} = useQuery(SYSTEMS_QUERY, {
    variables: {
      simulatorId: simulator.id,
    },
  });
  const {data: reactorSub} = useSubscription(REACTOR_SUB, {
    variables: {simulatorId: simulator.id},
  });
  const {data: systemsSub} = useSubscription(SYSTEMS_SUB, {
    variables: {simulatorId: simulator.id},
  });

  if (loading || !data) return null;
  const systems = (systemsSub
    ? systemsSub.systemsUpdate
    : data.systems
  ).filter(s => (wing ? s.wing === wing : true));
  const reactors = reactorSub ? reactorSub.reactorUpdate : data.reactors;
  // Get the batteries, get just the first one.
  const battery = reactors.find(r => r.model === "battery");
  const reactor = reactors.find(r => r.model === "reactor");
  const charge = battery && battery.batteryChargeLevel;

  const trainingSteps = (hasBattery, wings) =>
    [
      {
        selector: ".nothing",
        content:
          "You are responsible for distributing power to the various systems on the ship. Without enough power, systems will not run. You only have a limited amount of power to distribute, so make sure you put power in the places that need it the most.",
      },
      {
        selector: ".powerlevel-containers",
        content:
          "This list shows all of the systems on the ship that take power. Drag the green bars next to each system to add or remove power. You must ensure that there is enough power for the system to run. The yellow bars represent the amount of power necessary for the system to function at a certain level.",
      },
      {
        selector: ".totalPowerText",
        content:
          "This is the total amount of power the ship has available and how much is being used based on the power levels above.",
      },
      hasBattery && {
        selector: ".battery-holder",
        content:
          "These are the ship’s batteries, if it has any. They show how much power is remaining in the batteries. If you use more power than is being outputted by your reactor, power will draw from the batteries. If they run out of power, you will have to balance your power, and the batteries will need to be recharged. You can recharge batteries from your reactor by using less power than the current reactor output. Don’t let these run out in the middle of space. That would be...problematic.",
      },
      wings && {
        selector: ".wing-request",
        content:
          "You can request more or less power from the main reactor here. Click the up and down arrow to change the power number, and then click the 'Request' button to send off the request. If it is accepted, your power level available will change. Only request as much power as you need and no more; if the reactor is put under undue strain, it could explode.",
      },
    ].filter(Boolean);
  return (
    <Container
      fluid
      className="powerLevels"
      css={css`
        display: grid;
        grid-template-columns: 1fr 450px;
        grid-template-rows: 1fr 1fr;
        gap: 2em;
      `}
    >
      <Power
        systems={systems}
        client={client}
        battery={battery}
        reactor={reactor}
        wing={wing}
      />
      {battery && (
        <div
          className="battery-holder"
          css={[
            css`
              grid-column: 2;
            `,
          ]}
        >
          <Card
            css={css`
              height: 100%;
            `}
          >
            <div
              className="battery-container"
              css={css`
                flex: 1;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1em;
                padding: 1em;
              `}
            >
              <Battery level={Math.min(1, Math.max(0, (charge - 0.75) * 4))} />
              <Battery level={Math.min(1, Math.max(0, (charge - 0.5) * 4))} />
              <Battery level={Math.min(1, Math.max(0, (charge - 0.25) * 4))} />
              <Battery level={Math.min(1, Math.max(0, charge * 4))} />
            </div>
          </Card>
        </div>
      )}
      <Tour
        steps={trainingSteps(battery, Boolean(reactor?.hasWings && wing))}
        client={clientObj}
      />
    </Container>
  );
};

const Systems = React.memo(
  ({systems, setPowerAdjust, client}) => {
    const onChange = (system, level) => {
      const variables = {
        id: system.id,
        level,
      };
      client.mutate({
        mutation,
        variables,
      });
    };
    return (
      <div
        className="systems-holder powerlevel-containers"
        css={[
          css`
            align-self: center;
            grid-column: 1;
            grid-row: 1/3;
          `,
        ]}
      >
        {systems
          .slice(0)
          .sort((a, b) => {
            if (a.type > b.type) return 1;
            if (a.type < b.type) return -1;
            if (a.displayName > b.displayName) return 1;
            if (a.displayName < b.displayName) return -1;
            return 0;
          })
          .filter(
            sys =>
              (sys.power.power || sys.power.power === 0) &&
              sys.power.powerLevels.length,
          )
          .map(sys => (
            <PowerLine
              key={sys.id}
              powerLevels={sys.power.powerLevels}
              power={sys.power.power}
              onChange={value => onChange(sys, value)}
              onChanging={value => setPowerAdjust(value - sys.power.power)}
              maxPower={40}
              topPower={40}
              boxWidthRatio={6}
              label={sys.displayName}
              labelClass={`${sys.damage.damaged ? "text-danger" : ""} ${
                !sys.damage.damaged &&
                !sys.power.powerLevels.find(p => p <= sys.power.power)
                  ? "text-dark"
                  : ""
              }`}
            />
          ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevPower = prevProps.systems.map(p => p.power.power);
    const nextPower = nextProps.systems.map(p => p.power.power);
    if (prevPower.join(",") !== nextPower.join(",")) return false;
    const prevDisplayName = prevProps.systems.map(p => p.displayName);
    const nextDisplayName = nextProps.systems.map(p => p.displayName);
    if (prevDisplayName.join(",") !== nextDisplayName.join(",")) return false;
    const prevDamage = prevProps.systems.map(p => p.damage.damaged);
    const nextDamage = nextProps.systems.map(p => p.damage.damaged);
    if (prevDamage.join(",") !== nextDamage.join(",")) return false;
    return true;
  },
);
const Summary = ({battery, reactor, powerTotal, wing}) => {
  const wingPower =
    reactor?.hasWings && wing ? reactor?.[`${wing}WingPower`] : 0;
  const reactorPower =
    Math.round(reactor?.efficiency * reactor?.powerOutput) || 0;
  return (
    <div
      className="totalPowerText"
      css={[
        css`
          grid-column: 2;
          grid-row: 1/3;
          align-self: center;
        `,
        battery &&
          css`
            grid-row: 2;
          `,
      ]}
    >
      {reactor && (
        <h4>
          Total Power Available:{" "}
          {reactor.hasWings && wing ? wingPower : reactorPower}
        </h4>
      )}
      <h4>Total Power Used: {powerTotal}</h4>
      {reactor && (
        <h4
          className={` ${
            (reactor?.hasWings && wing ? wingPower : reactorPower) -
              powerTotal <
            0
              ? "text-danger"
              : ""
          }`}
        >
          Remaining Power:{" "}
          {(reactor?.hasWings && wing ? wingPower : reactorPower) - powerTotal}
        </h4>
      )}
      {reactor?.hasWings && wing && (
        <React.Fragment>
          <hr
            css={css`
              border-color: rgba(255, 255, 255, 0.5);
            `}
          />
          <PowerRequest reactor={reactor} wing={wing} />
        </React.Fragment>
      )}
    </div>
  );
};

const PowerRequest = ({reactor, wing}) => {
  const [req, setReq] = React.useState(reactor[`${wing}WingRequest`]);
  const {handleDirection, handleMouseUp, value} = useMouseIncrement({
    value: req,
    onSet: value => {
      if (!reactor[`${wing}WingRequested`]) {
        setReq(value);
      }
    },
    increment: 1,
    min: 0,
    delayDec: 2,
    max: 200,
  });
  const [request] = useReactorRequestWingPowerMutation();

  return (
    <div
      className="wing-request"
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h3
        css={css`
          text-align: center;
        `}
      >
        {capitalCase(wing)} Wing Power Request
      </h3>
      <div
        css={css`
          width: 50%;
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
      <Button
        color="info"
        disabled={reactor[`${wing}WingRequested`]}
        css={css`
          margin: 0 auto;
          margin-top: 1rem;
        `}
        onClick={() => request({variables: {id: reactor.id, wing, power: req}})}
      >
        {reactor[`${wing}WingRequested`] ? "Requested" : "Request"} {req} Power
      </Button>
    </div>
  );
};

const Power = ({systems, client, battery, reactor, wing}) => {
  const [powerAdjust, setPowerAdjust] = React.useState(0);

  const powerTotal =
    systems.reduce((prev, next) => {
      return next.power.power + prev;
    }, 0) + powerAdjust;
  React.useEffect(() => {
    if (systems) {
      setPowerAdjust(0);
    }
  }, [systems]);

  return (
    <React.Fragment>
      <Systems
        systems={systems}
        setPowerAdjust={setPowerAdjust}
        client={client}
      />
      <Summary
        reactor={reactor}
        battery={battery}
        powerTotal={powerTotal}
        wing={wing}
      />
    </React.Fragment>
  );
};
const Battery = ({level = 1}) => {
  return (
    <div className="battery">
      <div className="battery-bar" css={{height: `${level * 100}%`}} />
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
export const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    systems(simulatorId: $simulatorId, power: true) {
      id
      displayName
      wing
      type
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
    }
    reactors(simulatorId: $simulatorId) {
      id
      model
      batteryChargeLevel
      efficiency
      powerOutput
      hasWings
      leftWingPower
      leftWingRequest
      leftWingRequested
      rightWingPower
      rightWingRequest
      rightWingRequested
    }
  }
`;

const WrappedPowerDistribution = withApollo(PowerDistribution);
export default WrappedPowerDistribution;
