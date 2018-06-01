import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
class DeconProgram extends Component {
  state = {
    mStream: 0,
    aStream: 0,
    idealAStream: Math.round(Math.random() * 100),
    idealMStream: Math.round(Math.random() * 100)
  };
  componentDidMount() {
    this.idealStreamChange();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
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
    if (mStreamDif <= 0) idealMStream -= 1;
    else idealMStream += 1;
    if (aStreamDif <= 0) idealAStream -= 1;
    else idealAStream += 1;
    if (idealMStream > 100 || idealMStream < 0)
      idealMStream = Math.round(Math.random() * 100);
    if (idealAStream > 100 || idealAStream < 0)
      idealAStream = Math.round(Math.random() * 100);

    this.setState({
      idealAStream,
      idealMStream
    });
    this.timeout = setTimeout(this.idealStreamChange, 5 * 1000);
  };
  render() {
    const { deconProgram, deconLocation, id } = this.props;
    const { mStream, aStream, idealAStream, idealMStream } = this.state;
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
            <div>
              <input
                min={0}
                max={100}
                step={1}
                type="range"
                value={mStream}
                onChange={e => this.setState({ mStream: e.target.value })}
              />{" "}
              {mStream}/{idealMStream}
              <input
                min={0}
                max={100}
                step={1}
                type="range"
                value={aStream}
                onChange={e => this.setState({ aStream: e.target.value })}
              />{" "}
              {aStream}/{idealAStream}
              <div className="stressHolder">
                <div
                  className="stressBar"
                  style={{ height: `${this.calcStressLevel()}%` }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DeconProgram;
