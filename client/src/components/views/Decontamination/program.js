import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import Bars from "../TractorBeam/bars";
class DeconProgram extends Component {
  state = {
    mStream: Math.round(Math.random() * 100),
    aStream: Math.round(Math.random() * 100),
    idealAStream: Math.round(Math.random() * 100),
    idealMStream: Math.round(Math.random() * 100)
  };
  componentDidMount() {
    this.idealStreamChange();
    this.sendUpdate();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.timeout2);
  }
  calcStressLevel = () => {
    const { mStream, aStream, idealAStream, idealMStream } = this.state;
    const mStreamDif = Math.abs(idealMStream - mStream);
    const aStreamDif = Math.abs(idealAStream - aStream);
    const stressLevel =
      mStreamDif + aStreamDif > 100 ? 100 : mStreamDif + aStreamDif;
    return stressLevel;
  };
  idealStreamChange = () => {
    let { mStream, aStream, idealAStream, idealMStream } = this.state;
    const mStreamDif = idealMStream - parseInt(mStream, 10);
    const aStreamDif = idealAStream - parseInt(aStream, 10);
    if (mStreamDif <= 0) idealMStream -= 0.1;
    else idealMStream += 0.1;
    if (aStreamDif <= 0) idealAStream -= 0.1;
    else idealAStream += 0.1;
    if (idealMStream > 100 || idealMStream < 0)
      idealMStream = Math.round(Math.random() * 100);
    if (idealAStream > 100 || idealAStream < 0)
      idealAStream = Math.round(Math.random() * 100);

    this.setState({
      idealAStream,
      idealMStream
    });
    this.timeout = setTimeout(this.idealStreamChange, 300);
  };
  sendUpdate = () => {
    const mutation = gql`
      mutation DeconOffset($id: ID!, $offset: Float!) {
        updateDeconOffset(id: $id, offset: $offset)
      }
    `;
    const variables = {
      id: this.props.id,
      offset: this.calcStressLevel()
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.timeout2 = setTimeout(this.sendUpdate, 1000 * 5);
  };
  render() {
    const { deconProgram, deconLocation, id } = this.props;
    const { mStream, aStream } = this.state;
    return (
      <Container className="card-decon">
        <Row>
          <Col sm={6}>
            <h1>Decontamination in progress...</h1>
            <h3>Program: {deconProgram}</h3>
            <h3>Location: {deconLocation}</h3>
            <Mutation
              mutation={gql`
                mutation CancelDecon($id: ID!) {
                  cancelDeconProgram(id: $id)
                }
              `}
              variables={{ id }}
            >
              {action => (
                <Button size="lg" color="danger" onClick={action}>
                  Cancel Decontamination Program
                </Button>
              )}
            </Mutation>
          </Col>
          <Col sm={6}>
            <div className="bars-holder">
              <Bars
                className="mBar"
                arrow
                flop
                color={"blue"}
                simulator={this.props.simulator}
                level={mStream / 100}
                noLevel
                mouseUp={level => this.setState({ mStream: level * 100 })}
                mouseMove={level => this.setState({ mStream: level * 100 })}
              />
              <div className="stressHolder">
                <div
                  className="stressBar"
                  style={{ height: `${this.calcStressLevel()}%` }}
                />
              </div>
              <Bars
                className="aBar"
                arrow
                simulator={this.props.simulator}
                level={aStream / 100}
                noLevel
                mouseUp={level => this.setState({ aStream: level * 100 })}
                mouseMove={level => this.setState({ aStream: level * 100 })}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withApollo(DeconProgram);
