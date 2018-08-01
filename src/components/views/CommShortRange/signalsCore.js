import React, { Component } from "react";
import ReactDOM from "react-dom";
import tinycolor from "tinycolor2";
import { CompactPicker } from "react-color";
import { Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import FileExplorer from "../TacticalMap/fileExplorer";
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
    }
  }
`;

class SignalsCore extends Component {
  state = {
    editing: false,
    signals: [
      {
        id: 1,
        name: "Federation",
        range: { lower: 0.5, upper: 0.6 },
        color: "blue",
        image: "Starfleet"
      },
      {
        id: 2,
        name: "Klingon",
        range: { lower: 0.6, upper: 0.75 },
        color: "red",
        image: "Klingon"
      }
    ]
  };
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SHORTRANGE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            shortRangeComm: subscriptionData.data.shortRangeCommUpdate
          });
        }
      });
    }
    if (
      !nextProps.data.loading &&
      nextProps.data.shortRangeComm &&
      !this.state.editing
    ) {
      const comm = nextProps.data.shortRangeComm[0];
      if (!comm) return;
      this.setState({
        signals: comm.signals
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
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
    this.setState({
      resize: null
    });
    document.removeEventListener("mousemove", this.mousemove);
    document.removeEventListener("mouseup", this.mouseup);
  };
  removeSignal = id => {
    this.setState({
      signals: this.state.signals.filter(s => s.id !== id)
    });
  };
  addSignal = () => {
    const name = prompt("What is the name of the signal?");
    if (!name) return;
    this.setState({
      signals: this.state.signals.concat({
        id: Math.random(),
        name,
        range: { lower: Math.random() / 2, upper: Math.random() / 2 + 0.5 },
        color: "rebeccapurple"
      })
    });
  };
  renameSignal = id => {
    const name = prompt("What is the name of the signal?");
    if (!name) return;
    this.setState({
      signals: this.state.signals.map(s => {
        if (s.id === id) {
          return Object.assign({}, s, { name });
        }
        return s;
      })
    });
  };
  saveSignals = () => {
    this.setState({
      editing: false,
      selectedSignal: false
    });
    const mutation = gql`
      mutation UpdateSignals($id: ID!, $signals: [CommSignalInput]!) {
        commUpdateSignals(id: $id, signals: $signals)
      }
    `;
    const variables = {
      id: this.props.data.shortRangeComm[0].id,
      signals: this.state.signals.map(
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
  updateColor = (id, color) => {
    this.setState({
      signals: this.state.signals.map(s => {
        if (s.id === id) {
          return Object.assign({}, s, { color });
        }
        return s;
      })
    });
  };
  updateImage = (id, image) => {
    this.setState({
      signals: this.state.signals.map(s => {
        if (s.id === id) {
          return Object.assign({}, s, { image });
        }
        return s;
      })
    });
  };
  render() {
    const { signals, editing, selectedSignal } = this.state;
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
              directory="/Comm Images"
              selectedFiles={[
                "/Comm Images/" +
                  signals.find(s => s.id === selectedSignal).image
              ]}
              onClick={(evt, container) =>
                this.updateImage(selectedSignal, container.name)
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
              {editing && (
                <div
                  onMouseDown={() => this.resize(s.id, "lower")}
                  className="handle handle-top"
                />
              )}
              <label onDoubleClick={() => this.renameSignal(s.id)}>
                {editing && (
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
                )}
                {s.name}
                {editing && (
                  <i
                    className="fa fa-ban text-danger hover"
                    onClick={() => this.removeSignal(s.id)}
                  />
                )}
              </label>
              {editing && (
                <div
                  onMouseDown={() => this.resize(s.id, "upper")}
                  className="handle handle-bottom"
                />
              )}
            </div>
          ))}
        </div>
        {editing && (
          <div>
            <Button color="success" size="sm" onClick={this.addSignal}>
              Add Signal
            </Button>
            <Button color="info" size="sm" onClick={this.saveSignals}>
              Save
            </Button>
          </div>
        )}
        {!editing && (
          <div>
            <Button
              color="secondary"
              size="sm"
              onClick={() =>
                this.setState({
                  editing: true
                })
              }
            >
              Edit
            </Button>
          </div>
        )}
      </div>
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
