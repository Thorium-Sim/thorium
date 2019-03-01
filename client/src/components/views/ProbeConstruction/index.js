import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container } from "reactstrap";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { graphql, withApollo } from "react-apollo";
import ProbeEquipment from "./probeEquipment";
import DamageOverlay from "../helpers/DamageOverlay";
import ProbeDescription from "./probeDescription";
import ProbeAction from "./probeAction";
import ProbeSelector from "./probeSelector";
import "./style.scss";

const fragment = gql`
  fragment ProbesData on Probes {
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
const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      ...ProbesData
    }
  }
  ${fragment}
`;

const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      ...ProbesData
    }
  }
  ${fragment}
`;

class ProbeConstruction extends Component {
  state = {
    selectedProbeType: null,
    launching: false,
    description: null,
    equipment: [],
    modal: false
  };

  selectProbe(id) {
    this.setState({
      selectedProbeType: id,
      launching: false,
      equipment: id === null ? [] : this.state.equipment
    });
  }
  prepareProbe(equipment) {
    this.setState({
      equipment,
      launching: true
    });
  }
  launchProbe = name => {
    const probes = this.props.data.probes[0];
    const { selectedProbeType, equipment } = this.state;
    const mutation = gql`
      mutation LaunchProbe($id: ID!, $probe: ProbeInput!) {
        launchProbe(id: $id, probe: $probe)
      }
    `;
    const variables = {
      id: probes.id,
      probe: {
        name,
        type: selectedProbeType,
        equipment: equipment.map(({ id, count }) => ({
          id,
          count
        }))
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedProbeType: null,
      launching: false,
      equipment: [],
      modal: false
    });
  };
  trainingSteps = () => {
    const probes = this.props.data.probes && this.props.data.probes[0];
    return [
      {
        selector: ".nothing",
        content:
          "Probes are small robots that you can launch into space to perform many functions. Probe functionality is extended by the equipment which you put on the probe. Different kinds of probes can take different equipment and different amounts. Be sure to use the right probe for the right job."
      },
      {
        selector: ".probe-container",
        content:
          "These are the probes which are available. If you move your mouse over the probe you can see a brief description. Click on the science probe before continuing."
      },
      {
        selector: ".science-probe",
        content:
          "If you chose a science probe, you should see the different configuration options here. This shows you what specific configurations are available for science probes and what equipment is needed to configure the science probe properly. Make sure you review these options. As you construct a probe as part of training, configure it based on one of these configurations."
      },
      {
        selector: ".equipmentList",
        content:
          "This is a list of the equipment available to your probe. You can see its name, its size, and how many you have on your ship in this table. Click an equipment item to see a description of the equipment item. Click on the Add Equipment button to add it to your probe."
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
        )
      },
      {
        selector: ".nothing",
        content:
          "You will then have to type in the destination. If you equipped your probe with a probe network package, you will instead be shown a diagram of your probe network which will allow you to select where you want to place the probe."
      }
    ];
  };
  render() {
    if (this.props.data.loading || !this.props.data.probes) return null;
    const probes = this.props.data.probes && this.props.data.probes[0];
    const { selectedProbeType, launching } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    const comps = { ProbeDescription, ProbeEquipment, ProbeAction };
    return (
      <Container fluid className="probe-construction">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: PROBES_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  probes: subscriptionData.data.probesUpdate
                });
              }
            })
          }
        />
        <DamageOverlay
          system={probes}
          message={"Probe Launcher Offline"}
          style={{ height: "50vh" }}
        />
        <ProbeSelector
          types={probes.types}
          selectedProbeType={selectedProbeType}
          setDescription={e => this.setState({ description: e })}
          selectProbe={this.selectProbe.bind(this)}
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
                {...this.state}
                cancelProbe={this.selectProbe.bind(this, null)}
                prepareProbe={this.prepareProbe.bind(this)}
                selectProbe={this.selectProbe.bind(this)}
                equipment={this.state.equipment}
                launchProbe={this.launchProbe}
                probes={probes}
              />
            );
          })}
        <Tour steps={this.trainingSteps()} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default graphql(PROBES_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(ProbeConstruction));
