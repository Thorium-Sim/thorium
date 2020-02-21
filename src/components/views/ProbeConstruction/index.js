import React from "react";
import gql from "graphql-tag.macro";
import {Container} from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import {graphql, withApollo} from "react-apollo";
import ProbeEquipment from "./probeEquipment";
import DamageOverlay from "../helpers/DamageOverlay";
import ProbeDescription from "./probeDescription";
import ProbeAction from "./probeAction";
import ProbeSelector from "./probeSelector";
import useFlightLocalStorage from "../../../helpers/hooks/useFlightLocalStorage";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/client";
import "./style.scss";

const fragment = gql`
  fragment ProbeConstructionData on Probes {
    id
    simulatorId
    type
    torpedo
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
      }
    }
    probes {
      id
      name
      equipment {
        id
      }
    }
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    torpedo
    scienceTypes {
      id
      name
      type
      description
      equipment
    }
  }
`;
export const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      ...ProbeConstructionData
    }
  }
  ${fragment}
`;

export const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      ...ProbeConstructionData
    }
  }
  ${fragment}
`;

const ProbeConstruction = ({
  simulator,
  clientObj,
  flight: {id: flightId},
  client,
}) => {
  const {loading, data, subscribeToMore} = useQuery(PROBES_QUERY, {
    variables: {
      simulatorId: simulator.id,
    },
  });
  const config = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => {
        return Object.assign({}, previousResult, {
          probes: subscriptionData.data.probesUpdate,
        });
      },
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, PROBES_SUB, config);

  const probes = data && data.probes ? data.probes[0] : null;

  const [selectedProbeType, setSelectedProbeType] = useFlightLocalStorage(
    flightId,
    "probe_construction_probe_type",
    null,
  );
  const [launching, setLaunching] = useFlightLocalStorage(
    flightId,
    "probe_construction_launching",
    false,
  );
  const [equipment, setEquipment] = useFlightLocalStorage(
    flightId,
    "probe_construction_equipment",
    [],
  );
  const [description, setDescription] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  function selectProbe(id) {
    setSelectedProbeType(id);
    setLaunching(false);
    setEquipment(eq => (id === null ? [] : eq));
  }
  function prepareProbe(equipment) {
    setEquipment(equipment);
    setLaunching(true);
  }
  const launchProbe = name => {
    const mutation = gql`
      mutation LaunchProbe($id: ID!, $probe: ProbeInput!) {
        launchProbe(id: $id, probe: $probe)
      }
    `;
    const variables = {
      id: probes.id,
      probe: {
        name: String(name),
        type: selectedProbeType,
        equipment: equipment.map(({id, count}) => ({
          id,
          count,
        })),
      },
    };
    client.mutate({
      mutation,
      variables,
    });
    setSelectedProbeType(null);
    setLaunching(false);
    setEquipment([]);
    setModal(false);
  };
  const trainingSteps = () => {
    return [
      {
        selector: ".nothing",
        content:
          "Probes are small robots that you can launch into space to perform many functions. Probe functionality is extended by the equipment which you put on the probe. Different kinds of probes can take different equipment and different amounts. Be sure to use the right probe for the right job.",
      },
      {
        selector: ".probe-container",
        content:
          "These are the probes which are available. If you move your mouse over the probe you can see a brief description. Click on the science probe before continuing.",
      },
      {
        selector: ".science-probe",
        content:
          "If you chose a science probe, you should see the different configuration options here. This shows you what specific configurations are available for science probes and what equipment is needed to configure the science probe properly. Make sure you review these options. As you construct a probe as part of training, configure it based on one of these configurations.",
      },
      {
        selector: ".equipmentList",
        content:
          "This is a list of the equipment available to your probe. You can see its name, its size, and how many you have on your ship in this table. Click an equipment item to see a description of the equipment item. Click on the Add Equipment button to add it to your probe.",
      },
      {
        selector: ".probe-control-buttons",
        content: (
          <span>
            Here you can see the amount of space available on your probe. You
            cannot put more equipment on a probe than what you have space for.
            Once you are done adding equipment to your probe, click the 'Prepare
            Probe' button. Then click the '{probes.torpedo ? "Load" : "Launch"}'
            button to confirm the probe you created.{" "}
            {probes.torpedo
              ? "The officer in charge of the torpedo launcher will have to launch the probe out of the torpedo tubes."
              : ""}
          </span>
        ),
      },
      {
        selector: ".nothing",
        content:
          "You will then have to type in the destination. If you equipped your probe with a probe network package, you will instead be shown a diagram of your probe network which will allow you to select where you want to place the probe.",
      },
    ];
  };
  if (loading) return null;
  if (!probes) return <p>No Probe Launcher</p>;
  const comps = {ProbeDescription, ProbeEquipment, ProbeAction};
  return (
    <Container fluid className="probe-construction">
      <DamageOverlay
        system={probes}
        message={"Probe Launcher Offline"}
        style={{height: "50vh"}}
      />
      <ProbeSelector
        types={probes.types}
        selectedProbeType={selectedProbeType}
        setDescription={e => setDescription(e)}
        selectProbe={selectProbe}
        launching={launching}
      />
      {Object.keys(comps)
        .filter(compName => {
          if (compName === "ProbeDescription" && !selectedProbeType) {
            return true;
          }
          if (
            compName === "ProbeEquipment" &&
            selectedProbeType &&
            !launching
          ) {
            return true;
          }
          if (compName === "ProbeAction" && selectedProbeType && launching) {
            return true;
          }
          return false;
        })
        .map(compName => {
          const Comp = comps[compName];
          return (
            <Comp
              key={compName}
              selectedProbeType={selectedProbeType}
              launching={launching}
              equipment={equipment}
              description={description}
              modal={modal}
              cancelProbe={() => selectProbe(null)}
              prepareProbe={prepareProbe}
              selectProbe={selectProbe}
              launchProbe={launchProbe}
              probes={probes}
            />
          );
        })}
      <Tour steps={trainingSteps()} client={clientObj} />
    </Container>
  );
};

export default graphql(PROBES_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(withApollo(ProbeConstruction));
