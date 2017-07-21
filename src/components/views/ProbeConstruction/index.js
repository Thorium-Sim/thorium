import React, { Component } from 'react';
import gql from 'graphql-tag';
import {
  Container,
  Button,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transitioner from '../helpers/transitioner';
import ProbeEquipment from './probeEquipment';

import './style.scss';

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      type
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
    }
  }
`;

class ProbeConstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProbeType: null,
      launching: false,
      description: null,
      equipment: [],
      modal: false
    };
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: { simulatorId: this.props.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ probes: subscriptionData.data.probesUpdate })
            .toJS();
        }
      });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
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
  launchProbe(name) {
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
  }
  render() {
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const { selectedProbeType, launching } = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return (
      <Container fluid className="probe-construction">
        <ProbeSelector
          types={probes.types}
          selectedProbeType={selectedProbeType}
          setDescription={e => this.setState({ description: e })}
          selectProbe={this.selectProbe.bind(this)}
        />
        <TransitionGroup>
          {[ProbeDescription, ProbeEquipment, ProbeAction]
            .filter(Comp => {
              if (Comp.name === 'ProbeDescription' && !selectedProbeType)
                return true;
              if (
                Comp.name === 'ProbeEquipment' &&
                selectedProbeType &&
                !launching
              )
                return true;
              if (Comp.name === 'ProbeAction' && selectedProbeType && launching)
                return true;
              return false;
            })
            .map(Comp => {
              return (
                <Comp
                  key={Comp.name}
                  {...this.state}
                  cancelProbe={this.selectProbe.bind(this, null)}
                  prepareProbe={this.prepareProbe.bind(this)}
                  selectProbe={this.selectProbe.bind(this)}
                  equipment={this.state.equipment}
                  toggle={this.toggle.bind(this)}
                  probes={probes}
                />
              );
            })}
        </TransitionGroup>
        {this.state.modal &&
          <ProbeName
            modal={this.state.modal}
            toggle={this.toggle.bind(this)}
            equipment={this.state.equipment}
            launchProbe={this.launchProbe.bind(this)}
          />}
      </Container>
    );
  }
}

const ProbeSelector = ({
  types,
  selectedProbeType,
  selectProbe,
  setDescription
}) => {
  return (
    <Row>
      <Col
        sm={12}
        className={`probe-container  ${selectedProbeType
          ? 'probeSelected'
          : ''}`}>
        <div className="placeholder" />
        {types.map((t, i) => {
          const probeImage = require(`./probes/${t.id}.svg`);
          return (
            <div
              onMouseOut={setDescription.bind(this, null)}
              onMouseOver={setDescription.bind(this, t.description)}
              className={`probe-type ${selectedProbeType === t.id
                ? 'selected'
                : ''}`}
              onClick={selectProbe.bind(this, t.id)}>
              <p>
                {t.name}: {t.count}
              </p>
              <img draggable="false" src={probeImage} role="presentation" />
            </div>
          );
        })}
        <div className="placeholder" />
      </Col>
    </Row>
  );
};

class ProbeDescription extends Transitioner {
  render() {
    return (
      <Row className="probeDescription">
        <Col sm={{ size: 4, offset: 4 }}>
          <p>
            {this.props.description}
          </p>
        </Col>
      </Row>
    );
  }
}

class ProbeAction extends Transitioner {
  render() {
    const { selectedProbeType, selectProbe, cancelProbe, toggle } = this.props;
    return (
      <Row className="probeAction">
        <Col sm={{ size: 4, offset: 4 }}>
          <Button block color="success" onClick={toggle}>
            Launch Probe
          </Button>
          <Button
            block
            color="warning"
            onClick={selectProbe.bind(this, selectedProbeType)}>
            Reconfigure Probe
          </Button>
          <Button block color="danger" onClick={cancelProbe}>
            Cancel Probe
          </Button>
        </Col>
      </Row>
    );
  }
}

class ProbeName extends Component {
  state = {
    name: ''
  };
  render() {
    const { modal, toggle, launchProbe, network } = this.props;
    const { name } = this.state;
    return (
      <Modal className="modal-themed" isOpen={modal} toggle={toggle}>
        {network
          ? <div />
          : <div>
              <ModalHeader toggle={toggle}>
                Please enter a name for the probe
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </ModalBody>
            </div>}
        <ModalFooter>
          <Col sm="3">
            <Button block color="danger" onClick={toggle}>
              Cancel
            </Button>
          </Col>
          <Col sm="5">
            <Button
              block
              disabled={!name}
              color="primary"
              onClick={launchProbe.bind(this, this.state.name)}>
              Launch Probe
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    );
  }
}
const PROBES_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      simulatorId
      type
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
    }
  }
`;

export default graphql(PROBES_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(ProbeConstruction));
