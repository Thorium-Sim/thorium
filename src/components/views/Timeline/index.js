import React, { Component, Fragment } from "react";
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
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import FontAwesome from "react-fontawesome";
import * as Macros from "../../macros";
import "./style.scss";

const allowedMacros = [
  "updateViewscreenComponent",
  "setViewscreenToAuto",
  "showViewscreenTactical"
];

class TimelineItem extends Component {
  state = {};
  render() {
    let {
      id,
      event,
      name,
      args,
      executedTimelineSteps,
      steps,
      checkStep
    } = this.props;
    const { expanded } = this.state;
    return (
      <li>
        <input
          type="checkbox"
          checked={steps[id]}
          onChange={() => checkStep(id)}
        />
        <span
          className={
            executedTimelineSteps.indexOf(id) > -1 &&
            allowedMacros.indexOf(event) === -1
              ? "text-success"
              : ""
          }
        >
          {name}
        </span>
        <p onClick={() => this.setState({ expanded: !expanded })}>
          <FontAwesome name={expanded ? "arrow-down" : "arrow-right"} /> Details
        </p>
        {expanded && (
          <Fragment>
            <p>{event}</p>
            {Macros[event] &&
              (() => {
                const MacroPreview = Macros[event];
                if (typeof args === "string") {
                  args = JSON.parse(args);
                }
                return <MacroPreview args={args} updateArgs={() => {}} />;
              })()}
          </Fragment>
        )}
      </li>
    );
  }
}
const TIMELINE_SUB = gql`
  subscription UpdateSimulator($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      currentTimelineStep
      executedTimelineSteps
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
  state = { steps: {} };
  componentDidUpdate(prevProps, prevState) {
    // Update the state
    if (!this.props.data.loading) {
      const oldSim = prevProps.data.simulators && prevProps.data.simulators[0];
      const oldStep = oldSim && oldSim.currentTimelineStep;
      if (!this.props.data.simulators[0]) return;
      const { currentTimelineStep: newStep } = this.props.data.simulators[0];
      if (oldStep !== newStep) {
        const mission = this.props.data.simulators[0].mission;
        if (!mission) return;
        const { executedTimelineSteps } = this.props.data.simulators[0];
        const currentStep = mission.timeline[newStep];
        const steps = currentStep
          ? currentStep.timelineItems.reduce(
              (prev, next) =>
                executedTimelineSteps.indexOf(next.id) > -1 &&
                allowedMacros.indexOf(next.event) === -1
                  ? prev
                  : Object.assign(prev, { [next.id]: true }),
              {}
            )
          : [];
        if (JSON.stringify(steps) !== this.state.steps) {
          this.setState({
            steps
          });
        }
      }
    }
    // Update the cache, if necessary
    if (this.props.data.loading) return;
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    if (!mission) return;
    const currentStep = mission.timeline[currentTimelineStep];
    if (!prevProps.data.simulators) return;
    const {
      mission: oldMission,
      currentTimelineStep: oldTimelineStep
    } = prevProps.data.simulators[0];
    if (!oldMission) return;
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
      macros: currentStep.timelineItems.filter(t => steps[t.id]).map(t => ({
        stepId: t.id,
        event: t.event,
        args: t.args,
        delay: t.delay
      }))
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
  updateMission = e => {
    const mutation = gql`
      mutation SetSimulatorMission($simulatorId: ID!, $missionId: ID!) {
        setSimulatorMission(simulatorId: $simulatorId, missionId: $missionId)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      missionId: e.target.value
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const { missions } = this.props.data;
    if (!this.props.data.simulators[0]) return;
    const {
      mission,
      currentTimelineStep,
      executedTimelineSteps
    } = this.props.data.simulators[0];
    if (!mission) {
      return (
        <div>
          <SubscriptionHelper
            subscribe={() =>
              this.props.data.subscribeToMore({
                document: TIMELINE_SUB,
                variables: {
                  simulatorId: this.props.simulator.id
                },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    simulators: subscriptionData.data.simulatorsUpdate
                  });
                }
              })
            }
          />
          <select value={"nothing"} onChange={this.updateMission}>
            <option disabled value="nothing">
              Select a mission
            </option>
            {missions.map(m => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <p>Simulator has no mission</p>
        </div>
      );
    }
    const currentStep = mission.timeline[currentTimelineStep];
    const { steps } = this.state;
    return (
      <Container className="core-timeline">
        <Row>
          <Col>
            <select value={"nothing"} onChange={this.updateMission}>
              <option disabled value="nothing">
                Select a mission
              </option>
              {missions.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
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
              <ul className="timeline-list">
                {currentStep.timelineItems.map(i => (
                  <TimelineItem
                    {...i}
                    steps={steps}
                    checkStep={this.checkStep}
                    executedTimelineSteps={executedTimelineSteps}
                    key={i.id}
                  />
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
    missions {
      id
      name
      description
    }
    simulators(id: $simulatorId) {
      id
      currentTimelineStep
      executedTimelineSteps
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
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TimelineCore));
