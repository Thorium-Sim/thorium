import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import Measure from "react-measure";
import gql from "graphql-tag";

export default class WaveMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      frequencyA: Math.round(Math.random() * 20) / 2,
      offsetDownA: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpA: 10 + Math.round(Math.random() * 20) / 2,
      offsetDownB: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpB: 10 + Math.round(Math.random() * 20) / 2,
      frequencyB: Math.round(Math.random() * 20) / 2
    };
    const maxDown = Math.max(this.state.offsetDownA, this.state.offsetDownB);
    const minUp = Math.min(this.state.offsetUpA, this.state.offsetUpB);
    this.state.required = Math.round(
      maxDown + Math.random() * (minUp - maxDown)
    );
    this.loop = delta => {
      requestAnimationFrame(this.loop);
      this.setState({ phase: this.state.phase + 2 });
      if (delta % 12000 > 11000) {
        this.updateState();
      }
    };
  }
  componentDidMount() {
    this.loop();
  }
  lockSignal = () => {
    const { lrComm } = this.props;
    const mutation = gql`
      mutation UpdateLRC($longRange: LongRangeCommInput!) {
        updateLongRangeComm(longRangeComm: $longRange)
      }
    `;
    const variables = {
      longRange: {
        id: lrComm.id,
        locked: true
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateState = () => {
    const update = {
      offsetDownA: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpA: 10 + Math.round(Math.random() * 20) / 2,
      offsetDownB: 10 - Math.round(Math.random() * 20) / 2,
      offsetUpB: 10 + Math.round(Math.random() * 20) / 2
    };
    const maxDown = Math.max(update.offsetDownA, update.offsetDownB);
    const minUp = Math.min(update.offsetUpA, update.offsetUpB);
    update.required = Math.round(maxDown + Math.random() * (minUp - maxDown));
    this.setState(update);
  };
  render() {
    return (
      <Row className="wave-match">
        <Col sm={{ size: 8, offset: 2 }}>
          <h2 className="text-center">Lock Signal</h2>
          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
            }}
          >
            {({ measureRef }) => (
              <div ref={measureRef} className="wave-box">
                {this.state.dimensions && (
                  <svg
                    width={this.state.dimensions.width}
                    height={this.state.dimensions.height}
                  >
                    <path
                      stroke="red"
                      opacity="0.5"
                      fill="transparent"
                      strokeWidth="4"
                      d={calculateSin(
                        this.state.dimensions.width,
                        this.state.dimensions.height,
                        this.state.frequencyA,
                        Math.abs(this.state.frequencyA - this.state.required),
                        this.state.phase
                      )}
                    />
                    <path
                      stroke="blue"
                      opacity="0.5"
                      fill="transparent"
                      strokeWidth="4"
                      d={calculateSin(
                        this.state.dimensions.width,
                        this.state.dimensions.height,
                        this.state.frequencyB,
                        Math.abs(this.state.frequencyB - this.state.required),
                        this.state.phase
                      )}
                    />
                  </svg>
                )}
              </div>
            )}
          </Measure>
          <input
            type="range"
            min={this.state.offsetDownA}
            max={this.state.offsetUpA}
            step="0.5"
            value={this.state.frequencyA}
            onChange={e => this.setState({ frequencyA: e.target.value })}
          />

          <input
            type="range"
            min={this.state.offsetDownB}
            max={this.state.offsetUpB}
            step="0.5"
            value={this.state.frequencyB}
            onChange={e => this.setState({ frequencyB: e.target.value })}
          />
          <Button
            onClick={this.lockSignal}
            size="lg"
            color="warning"
            block
            disabled={
              !(
                parseFloat(this.state.frequencyB) === this.state.required &&
                parseFloat(this.state.frequencyA) === this.state.required
              )
            }
          >
            Lock Signal
          </Button>
        </Col>
      </Row>
    );
  }
}

function calculateSin(width, height, freq, variance, phase) {
  return Array(width)
    .fill(0)
    .map((_, i) =>
      Math.sin(
        Math.PI * 1 / 180 * (i + phase) / 5 * freq + Math.random() * variance
      )
    )
    .reduce((prev, next, i) => {
      return `${prev}L ${i} ${next * height / 2.1 + height / 2} `;
    }, `M 0 ${height / 2} `);
}
