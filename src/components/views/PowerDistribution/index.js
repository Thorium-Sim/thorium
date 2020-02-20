import React from "react";
import gql from "graphql-tag.macro";
import {Row, Col, Container, Card} from "helpers/reactstrap";
import {withApollo} from "react-apollo";
import Tour from "helpers/tourHelper";
import "./style.scss";
import AnimatedNumber from "react-animated-number";
import PowerLine from "../JumpDrive/powerLine";
import {useQuery, useSubscription} from "@apollo/client";

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
    }
  }
`;

const PowerDistribution = ({client, simulator, clientObj}) => {
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
  const systems = systemsSub ? systemsSub.systemsUpdate : data.systems;
  const reactors = reactorSub ? reactorSub.reactorUpdate : data.reactors;
  // Get the batteries, get just the first one.
  const battery = reactors.find(r => r.model === "battery");
  const reactor = reactors.find(r => r.model === "reactor");
  const charge = battery && battery.batteryChargeLevel;

  const trainingSteps = hasBattery =>
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
    ].filter(Boolean);
  return (
    <Container fluid={!!battery} className="powerLevels">
      <Row className="powerlevel-row">
        <Col lg="12" xl={battery ? 8 : 12} className="powerlevel-containers">
          <Power systems={systems} client={client} reactor={reactor} />
        </Col>
        {battery && (
          <Col sm="4" className="battery-holder">
            <Card>
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
          </Col>
        )}
      </Row>
      <Tour steps={trainingSteps(battery)} client={clientObj} />
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
      <div className="systems-holder">
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
const Summary = ({reactor, powerTotal}) => {
  return (
    <div className="totalPowerText">
      {reactor && (
        <h4>
          Total Power Available:{" "}
          {Math.round(reactor.efficiency * reactor.powerOutput)}
        </h4>
      )}
      <h4>Total Power Used: {powerTotal}</h4>
      {reactor && (
        <h4
          className={` ${
            Math.round(reactor.efficiency * reactor.powerOutput) - powerTotal <
            0
              ? "text-danger"
              : ""
          }`}
        >
          Remaining Power:{" "}
          {Math.round(reactor.efficiency * reactor.powerOutput) - powerTotal}
        </h4>
      )}
    </div>
  );
};
const Power = ({systems, client, reactor}) => {
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
    <>
      <Systems
        systems={systems}
        setPowerAdjust={setPowerAdjust}
        client={client}
      />
      <Summary reactor={reactor} powerTotal={powerTotal} />
    </>
  );
};
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
export const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    systems(simulatorId: $simulatorId, power: true) {
      id
      displayName
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
    }
  }
`;

export default withApollo(PowerDistribution);
