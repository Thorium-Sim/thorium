import React, { Component } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";

class CommShortRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCall: null,
      selectedArrow: null
    };
  }
  _commHail = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CommAddArrow($id: ID!, $commArrowInput: CommArrowInput!) {
        commAddArrow(id: $id, commArrowInput: $commArrowInput)
      }
    `;
    const variables = {
      id,
      commArrowInput: {
        signal: this.state.selectedCall
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _commCancel = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CommRemoveArrow($id: ID!, $arrowId: ID!) {
        commRemoveArrow(id: $id, arrowId: $arrowId)
      }
    `;
    const variables = {
      id,
      arrowId: this.state.selectedArrow
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedArrow: null
    });
  };
  _commConnect = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CommConnectHail($id: ID!) {
        connectHail(id: $id)
      }
    `;
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  commReject = () => {
    const { id } = this.props;
    const mutation = gql`
      mutation CancelHail($id: ID!) {
        cancelHail(id: $id, core: true)
      }
    `;
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  getSignal() {
    const { signals, frequency } = this.props;
    return signals.reduce((prev, next) => {
      if (next.range.upper > frequency && next.range.lower < frequency)
        return next;
      return prev;
    }, {});
  }
  render() {
    const { selectedCall, selectedArrow } = this.state;
    const { frequency, amplitude, state, signals, arrows } = this.props;
    return (
      <Container fluid className="shortRangeComm-core">
        <Row>
          <Col sm="12" style={{ height: "100%" }}>
            <p>
              Freq: {Math.round(frequency * 37700 + 37700) / 100} MHz - Amp:{" "}
              {Math.round(amplitude * 100) / 100} - {this.getSignal().name}
            </p>
            <div>
              External Call
              {state === "hailing" ? (
                <ButtonGroup>
                  <Button onClick={this._commConnect} size="sm" color="info">
                    Hailing - Connect
                  </Button>
                  <Button onClick={this.commReject} size="sm" color="warning">
                    Reject
                  </Button>
                </ButtonGroup>
              ) : null}
            </div>
            <select
              value={selectedCall || ""}
              onChange={e => {
                this.setState({ selectedCall: e.target.value });
              }}
            >
              <option value={null}>---</option>
              {signals.length === 0 && <option value="random">Random</option>}
              {signals.map(s => {
                return (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
            <Button
              size="sm"
              color="primary"
              disabled={!selectedCall}
              onClick={this._commHail}
            >
              Hail
            </Button>
            <p>Current Comms</p>
            <div className="commList">
              {arrows.map(a => {
                const signal = signals.find(s => s.id === a.signal);
                return (
                  <p
                    key={a.id}
                    onClick={() => {
                      this.setState({ selectedArrow: a.id });
                    }}
                    className={`${a.connected ? "text-success" : ""} ${
                      a.muted ? "text-purple" : ""
                    } ${a.id === selectedArrow ? "selected" : ""}`}
                  >
                    {signal && signal.name} -{" "}
                    {Math.round(a.frequency * 37700 + 37700) / 100} MHz
                    {a.muted && ` - Muted`}
                  </p>
                );
              })}
            </div>
            <Button
              disabled={!selectedArrow}
              onClick={this._commCancel}
              size="sm"
              block
              color="primary"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withApollo(CommShortRange);
