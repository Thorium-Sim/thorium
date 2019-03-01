import React, { Component } from "react";
import ReactDOM from "react-dom";
import tinycolor from "tinycolor2";
import { CompactPicker } from "react-color";
import { Button } from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import FileExplorer from "../TacticalMap/fileExplorer";
import SubscriptionHelper from "helpers/subscriptionHelper";
import uuid from "uuid";
import "./signalsCore.scss";

function transparentColor(col) {
  var color = tinycolor(col);
  color.setAlpha(0.3);
  return color.toRgbString();
}

const SHORTRANGE_SUB = gql`
  subscription ShortRangeCommSub($simulatorId: ID!) {
    shortRangeCommUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      arrows {
        id
        signal
        frequency
        connected
        muted
      }
      signals {
        id
        name
        image
        color
        range {
          lower
          upper
        }
      }
      state
      frequency
      amplitude
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

export class SignalPicker extends Component {
  state = {
    signals: this.props.shortRangeComm ? this.props.shortRangeComm.signals : []
  };
  componentDidUpdate(prevProps) {
    if (this.props.shortRangeComm) {
      const comm = this.props.shortRangeComm;
      const prevComm = prevProps.shortRangeComm;
      if (!comm) return;
      if (
        !prevComm ||
        JSON.stringify(comm.signals) !== JSON.stringify(prevComm.signals) ||
        (this.state.signals.length === 0 &&
          comm.signals.length > this.state.signals.length)
      ) {
        this.setState({
          signals: comm.signals
        });
      }
    }
  }
  resize = (id, which) => {
    this.setState({
      resize: { id, which }
    });
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mouseup", this.mouseup);
  };
  mousemove = e => {
    const {
      resize: { id, which },
      signals
    } = this.state;
    const { top, height } = ReactDOM.findDOMNode(this)
      .querySelector("#signalHolder")
      .getBoundingClientRect();
    const level = Math.min(1, Math.max(0, (e.clientY - top) / height));
    this.setState({
      signals: signals.map(s => {
        if (s.id === id) {
          return Object.assign({}, s, {
            range: Object.assign({}, s.range, { [which]: level })
          });
        }
        return s;
      })
    });
  };
  mouseup = () => {
    this.setState(
      {
        resize: null
      },
      this.saveSignals
    );
    document.removeEventListener("mousemove", this.mousemove);
    document.removeEventListener("mouseup", this.mouseup);
  };
  removeSignal = id => {
    this.setState(
      {
        signals: this.state.signals.filter(s => s.id !== id)
      },
      this.saveSignals
    );
  };
  addSignal = () => {
    const name = prompt("What is the name of the signal?");
    if (!name) return;
    const random = Math.random() / 2;
    this.setState(
      {
        signals: this.state.signals.concat({
          id: uuid.v4(),
          name,
          range: { lower: random, upper: random + 0.1 },
          color: "rebeccapurple"
        })
      },
      this.saveSignals
    );
  };
  renameSignal = id => {
    const name = prompt("What is the name of the signal?");
    if (!name) return;
    this.setState(
      {
        signals: this.state.signals.map(s => {
          if (s.id === id) {
            return Object.assign({}, s, { name });
          }
          return s;
        })
      },
      this.saveSignals
    );
  };
  saveSignals = () => {
    this.props.saveSignals(this.state.signals);
  };
  updateColor = (id, color) => {
    this.setState(
      {
        signals: this.state.signals.map(s => {
          if (s.id === id) {
            return Object.assign({}, s, { color });
          }
          return s;
        })
      },
      this.saveSignals
    );
  };
  updateImage = (id, image) => {
    this.setState(
      {
        signals: this.state.signals.map(s => {
          if (s.id === id) {
            return Object.assign({}, s, { image });
          }
          return s;
        })
      },
      this.saveSignals
    );
  };
  render() {
    const { signals, selectedSignal } = this.state;
    return (
      <div className="core-shortRangeSignals">
        {selectedSignal && (
          <div className="color-picker">
            <Button
              color="warning"
              size="sm"
              onClick={() => this.setState({ selectedSignal: false })}
            >
              Close
            </Button>
            <div>
              <CompactPicker
                color={signals.find(s => s.id === selectedSignal).color}
                onChangeComplete={color =>
                  this.updateColor(
                    selectedSignal,
                    `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
                  )
                }
              />
            </div>
            <FileExplorer
              simple
              directory="/Comm Images"
              selectedFiles={[signals.find(s => s.id === selectedSignal).image]}
              onClick={(evt, container) =>
                this.updateImage(selectedSignal, container.fullPath)
              }
            />
          </div>
        )}
        <div
          id="signalHolder"
          onMouseDown={() => {
            this.setState({
              selectedSignal: null
            });
          }}
        >
          {signals.map(s => (
            <div
              key={s.id}
              className="signal"
              style={{
                backgroundColor: transparentColor(s.color),
                width: "100%",
                height: `${(s.range.upper - s.range.lower) * 100}%`,
                top: `${s.range.lower * 100}%`
              }}
            >
              <div
                onMouseDown={() => this.resize(s.id, "lower")}
                className="handle handle-top"
              />
              <label
                className="signal-label"
                onDoubleClick={() => this.renameSignal(s.id)}
              >
                <Button
                  color="warning"
                  size="sm"
                  onClick={() =>
                    this.setState({
                      selectedSignal: s.id
                    })
                  }
                >
                  Color
                </Button>
                <span>{s.name}</span>
                <i
                  className="fa fa-ban text-danger hover"
                  onClick={() => this.removeSignal(s.id)}
                />
              </label>
              <div
                onMouseDown={() => this.resize(s.id, "upper")}
                className="handle handle-bottom"
              />
            </div>
          ))}
        </div>
        <Button color="success" size="sm" onClick={this.addSignal}>
          Add Signal
        </Button>
      </div>
    );
  }
}
class SignalsCore extends Component {
  saveSignals = signals => {
    const mutation = gql`
      mutation UpdateSignals($id: ID!, $signals: [CommSignalInput]!) {
        commUpdateSignals(id: $id, signals: $signals)
      }
    `;
    const variables = {
      id: this.props.data.shortRangeComm[0].id,
      signals: signals.map(
        ({ id, name, range: { upper, lower }, color, image }) => ({
          id,
          name,
          range: { upper, lower },
          color,
          image
        })
      )
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    return (
      <SubscriptionHelper
        subscribe={() =>
          this.props.data.subscribeToMore({
            document: SHORTRANGE_SUB,
            variables: {
              simulatorId: this.props.simulator.id
            },
            updateQuery: (previousResult, { subscriptionData }) => {
              return Object.assign({}, previousResult, {
                shortRangeComm: subscriptionData.data.shortRangeCommUpdate
              });
            }
          })
        }
      >
        {!this.props.data.loading &&
          this.props.data.shortRangeComm &&
          this.props.data.shortRangeComm[0] && (
            <SignalPicker
              shortRangeComm={this.props.data.shortRangeComm[0]}
              saveSignals={this.saveSignals}
            />
          )}
      </SubscriptionHelper>
    );
  }
}

const SHORTRANGE_QUERY = gql`
  query ShortRangeComm($simulatorId: ID!) {
    shortRangeComm(simulatorId: $simulatorId) {
      id
      simulatorId
      name
      arrows {
        id
        signal
        frequency
        connected
        muted
      }
      signals {
        id
        name
        image
        color
        range {
          lower
          upper
        }
      }
      state
      frequency
      amplitude
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
    }
  }
`;

export default graphql(SHORTRANGE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(SignalsCore));
