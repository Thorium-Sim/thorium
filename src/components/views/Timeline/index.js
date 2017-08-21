import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import Immutable from "immutable";
import FontAwesome from "react-fontawesome";

import "./style.scss";

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
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ simulators: subscriptionData.data.simulatorsUpdate })
            .toJS();
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
  checkStep = step => {
    this.setState(state => ({
      steps: Object.assign(state.steps, { [step]: !state.steps[step] })
    }));
  };
  runMacro = next => {
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    const currentStep = mission.timeline[currentTimelineStep];
    const { steps } = this.state;
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
  render() {
    if (this.props.data.loading) return null;
    const { mission, currentTimelineStep } = this.props.data.simulators[0];
    const currentStep = mission.timeline[currentTimelineStep];
    const { steps } = this.state;
    return (
      <Container className="core-timeline">
        <Row>
          <Col>
            <h4>
              {mission.name}
            </h4>
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
          {currentStep
            ? <Col>
                <h5>
                  {currentStep.name}
                </h5>
                <p>
                  {currentStep.description}
                </p>
                <ul>
                  {currentStep.timelineItems.map(i =>
                    <li key={i.id}>
                      <input
                        type="checkbox"
                        checked={steps[i.id]}
                        onChange={() => this.checkStep(i.id)}
                      />{" "}
                      {i.name}
                      <details>
                        <summary>Details</summary>
                        <p>
                          {i.event}
                        </p>
                        <pre>
                          {i.args}
                        </pre>
                      </details>
                    </li>
                  )}
                </ul>
              </Col>
            : <Col>
                <h5>End of Timeline</h5>
              </Col>}
        </Row>
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
