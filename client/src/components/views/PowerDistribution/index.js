import React from "react";
import gql from "graphql-tag.macro";
import { Row, Col, Container, Card } from "helpers/reactstrap";
import { withApollo } from "react-apollo";
import Tour from "helpers/tourHelper";
import "./style.scss";
import AnimatedNumber from "react-animated-number";
import PowerLine from "../JumpDrive/powerLine";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";
import { useQuery } from "@apollo/react-hooks";
/* TODO

Some improvements:
- Make it so you can just click on a box or a yellow line to set the power level
- Make it so the names show up better (add a display name to the system class)
- Change the types of the systems to make it easier to sort the systems by name.
*/

const mutation = gql`
  mutation ChangePower($id: ID!, $level: Int!) {
    changePower(systemId: $id, power: $level)
  }
`;

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, power: true) {
      name
      displayName
      type
      id
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

const REACTOR_SUB = gql`
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

const PowerDistribution = ({ client, simulator, clientObj }) => {
  const { loading, data, subscribeToMore } = useQuery(SYSTEMS_QUERY, {
    variables: {
      simulatorId: simulator.id
    }
  });
  const reactorConfig = React.useMemo(
    () => ({
      variables: {
        simulatorId: simulator.id
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        return Object.assign({}, previousResult, {
          reactors: subscriptionData.data.reactorUpdate
        });
      }
    }),
    [simulator.id]
  );
  useSubscribeToMore(subscribeToMore, REACTOR_SUB, reactorConfig);
  const systemsConfig = React.useMemo(
    () => ({
      variables: {
        simulatorId: simulator.id
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        return Object.assign({}, previousResult, {
          systems: subscriptionData.data.systemsUpdate
        });
      }
    }),
    [simulator.id]
  );
  useSubscribeToMore(subscribeToMore, SYSTEMS_SUB, systemsConfig);

  if (loading || !data.reactors) return null;
  // Get the batteries, get just the first one.
  const systems = data.systems;
  const battery = data.reactors.find(r => r.model === "battery");
  const reactor = data.reactors.find(r => r.model === "reactor");
  const charge = battery && battery.batteryChargeLevel;

  const trainingSteps = hasBattery =>
    [
      {
        selector: ".nothing",
        content:
          "You are responsible for distributing power to the various systems on the ship. Without enough power, systems will not run. You only have a limited amount of power to distribute, so make sure you put power in the places that need it the most."
      },
      {
        selector: ".powerlevel-containers",
        content:
          "This list shows all of the systems on the ship that take power. Drag the green bars next to each system to add or remove power. You must ensure that there is enough power for the system to run. The yellow bars represent the amount of power necessary for the system to function at a certain level."
      },
      {
        selector: ".totalPowerText",
        content:
          "This is the total amount of power the ship has available and how much is being used based on the power levels above."
      },
      hasBattery && {
        selector: ".battery-holder",
        content:
          "These are the ship’s batteries, if it has any. They show how much power is remaining in the batteries. If you use more power than is being outputted by your reactor, power will draw from the batteries. If they run out of power, you will have to balance your power, and the batteries will need to be recharged. You can recharge batteries from your reactor by using less power than the current reactor output. Don’t let these run out in the middle of space. That would be...problematic."
      }
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
  ({ systems, setPowerAdjust, client }) => {
    const onChange = (system, level) => {
      const variables = {
        id: system.id,
        level
      };
      client.mutate({
        mutation,
        variables
      });
    };
    return (
      <div className="systems-holder">
        {systems
          .slice(0)
          .sort((a, b) => {
            if (a.type > b.type) return 1;
            if (a.type < b.type) return -1;
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .filter(
            sys =>
              (sys.power.power || sys.power.power === 0) &&
              sys.power.powerLevels.length
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
    return true;
  }
);
const Summary = ({ reactor, powerTotal }) => {
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
const Power = ({ systems, client, reactor }) => {
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
const Battery = ({ level = 1 }) => {
  return (
    <div className="battery">
      <div className="battery-bar" style={{ height: `${level * 100}%` }} />
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
const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    systems(simulatorId: $simulatorId, power: true) {
      name
      displayName
      type
      id
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
