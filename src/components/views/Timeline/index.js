import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

import FontAwesome from "react-fontawesome";
import * as Macros from "../../macros";
import "./style.css";

const TIMELINE_SUB = gql`
  subscription UpdateSimulator($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      currentTimelineStep
      mission {
        id
        name
        description
        timeline {
          id
          name
          order
          description
          timelineItems {
            id
            name
            type
            args
            event
            delay
          }
        }
      }
    }
  }
`;

class TimelineCore extends Component {
  constructor(props) {
    super(props);
    this.sub = null;
    this.state = { steps: {} };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      const { simulator } = nextProps;
      this.internalSub = nextProps.data.subscribeToMore({
        document: TIMELINE_SUB,
        variables: {
          simulatorId: simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.simulatorsUpdate
          });
        }
      });
    }
    // Update the state based on the timeline step
    if (!nextProps.data.loading) {
      const oldSim =
        this.props.data.simulators && this.props.data.simulators[0];
      const oldStep = oldSim && oldSim.currentTimelineStep;
      const { currentTimelineStep: newStep } = nextProps.data.simulators[0];
      if (oldStep !== newStep) {
        const mission = nextProps.data.simulators[0].mission;
        if (!mission) return;
        const currentStep = mission.timeline[newStep];
        this.setState({
          steps: currentStep
            ? currentStep.timelineItems.reduce(
                (prev, next) => Object.assign(prev, { [next.id]: true }),
                {}
              )
            : []
        });
      }
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  componentDidUpdate(prevProps, prevState) {
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    if (!mission) return;
    const currentStep = mission.timeline[currentTimelineStep];
    if (!prevProps.data.simulators) return;
    const {
      mission: oldMission,
      currentTimelineStep: oldTimelineStep
    } = prevProps.data.simulators[0];
    const oldCurrentStep = oldMission.timeline[oldTimelineStep];
    if (!oldCurrentStep || !currentStep || currentStep.id === oldCurrentStep.id)
      return;
    const viewscreenItem = currentStep.timelineItems.find(
      e => e.event === "updateViewscreenComponent"
    );
    if (!viewscreenItem) return;
    const args = JSON.parse(viewscreenItem.args);
    const data = args.data ? JSON.parse(args.data) : {};
    if (!data.asset) return;
    // Add the asset to the cache
    const mutation = gql`
      mutation AddCache($simulatorId: ID, $cacheItem: String!) {
        clientAddCache(
          simulatorId: $simulatorId
          viewscreen: true
          cacheItem: $cacheItem
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      cacheItem: data.asset
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  checkStep = step => {
    this.setState(state => ({
      steps: Object.assign(state.steps, { [step]: !state.steps[step] })
    }));
  };
  runMacro = next => {
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    const currentStep = mission.timeline[currentTimelineStep];
    const { steps } = this.state;
    if (!currentStep) return;
    const variables = {
      simulatorId: this.props.simulator.id,
      macros: currentStep.timelineItems
        .filter(t => steps[t.id])
        .map(t => ({ event: t.event, args: t.args }))
    };
    const mutation = gql`mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
      triggerMacros(simulatorId: $simulatorId, macros: $macros)
      ${next &&
        `setSimulatorTimelineStep(simulatorId: $simulatorId, step: ${currentTimelineStep +
          1})`}
    }`;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateStep = step => {
    const { mission } = this.props.data.simulators[0];
    const mutation = gql`
      mutation UpdateTimelineStep($simulatorId: ID!, $step: Int!) {
        setSimulatorTimelineStep(simulatorId: $simulatorId, step: $step)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      step: Math.max(0, Math.min(mission.timeline.length - 1, step))
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  toggle = () => {
    const { currentTimelineStep } = this.props.data.simulators[0];
    this.setState({
      modal: !this.state.modal,
      newStep: currentTimelineStep
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    if (!mission) return <p>Simulator has no mission</p>;
    const currentStep = mission.timeline[currentTimelineStep];
    const { steps } = this.state;
    return (
      <Container className="core-timeline">
        <Row>
          <Col>
            <h4>{mission.name}</h4>
            <ButtonGroup size="sm">
              <Button
                color="primary"
                title="Go Back"
                onClick={() => this.updateStep(currentTimelineStep - 1)}
              >
                <FontAwesome fixedWidth name="arrow-left" />
              </Button>
              <Button
                color="warning"
                title="Run Step & Stay"
                onClick={this.runMacro}
              >
                <FontAwesome fixedWidth name="step-forward" />
              </Button>
              <Button color="info" onClick={this.toggle}>
                {currentTimelineStep + 1}
              </Button>
              <Button
                color="success"
                title="Run & Go Forward"
                onClick={() => this.runMacro(true)}
              >
                <FontAwesome fixedWidth name="play" />
              </Button>
              <Button
                color="primary"
                title="Go Forward"
                onClick={() => this.updateStep(currentTimelineStep + 1)}
              >
                <FontAwesome fixedWidth name="arrow-right" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          {currentStep ? (
            <Col>
              <h5>{currentStep.name}</h5>
              <p>{currentStep.description}</p>
              <ul>
                {currentStep.timelineItems.map(i => (
                  <li key={i.id}>
                    <input
                      type="checkbox"
                      checked={steps[i.id]}
                      onChange={() => this.checkStep(i.id)}
                    />{" "}
                    {i.name}
                    <details>
                      <summary>Details</summary>
                      <p>{i.event}</p>
                      {Macros[i.event] &&
                        (() => {
                          const MacroPreview = Macros[i.event];
                          let args = i.args;
                          if (typeof args === "string") {
                            args = JSON.parse(args);
                          }
                          return <MacroPreview args={args} />;
                        })()}
                    </details>
                  </li>
                ))}
              </ul>
            </Col>
          ) : (
            <Col>
              <h5>End of Timeline</h5>
            </Col>
          )}
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="large">
          <ModalHeader toggle={this.toggle}>
            Select which step to go to
          </ModalHeader>
          <ModalBody>
            <Input
              type="select"
              value={this.state.newStep}
              onChange={evt => this.setState({ newStep: evt.target.value })}
            >
              {mission.timeline.map((t, i) => {
                return (
                  <option key={t.id} value={i}>
                    {t.name}
                  </option>
                );
              })}
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.updateStep(this.state.newStep);
                this.toggle();
              }}
            >
              Load Step
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const SUBSCRIPTIONS_QUERY = gql`
  query Timeline($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      currentTimelineStep
      mission {
        id
        name
        description
        timeline {
          id
          name
          order
          description
          timelineItems {
            id
            name
            type
            args
            event
            delay
          }
        }
      }
    }
  }
`;
export default graphql(SUBSCRIPTIONS_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TimelineCore));
