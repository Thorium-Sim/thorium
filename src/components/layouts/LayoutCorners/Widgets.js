import React, { Component } from "react";
import { Tooltip, Button } from "reactstrap";
import { Widgets } from "../../views";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import "./widgets.css";
const WIDGET_NOTIFY = gql`
  subscription WidgetNotify($simulatorId: ID!, $station: String) {
    widgetNotify(simulatorId: $simulatorId, station: $station)
  }
`;

class WidgetsContainer extends Component {
  state = {
    widgetNotify: {}
  };
  constructor(props) {
    super(props);
    const self = this;
    this.subscription = this.props.client
      .subscribe({
        query: WIDGET_NOTIFY,
        variables: {
          simulatorId: this.props.simulator.id,
          station: this.props.station.name
        }
      })
      .subscribe({
        next({ widgetNotify }) {
          self.setNotify(widgetNotify, true);
        },
        error(err) {
          console.error("err", err);
        }
      });
  }
  setNotify = (widget, state) => {
    this.setState({
      widgetNotify: Object.assign({}, this.state.widgetNotify, {
        [widget]: state
      })
    });
  };
  render() {
    const { simulator, clientObj, station, flight } = this.props;
    const { widgetNotify } = this.state;
    return (
      <div
        className={`widgets ${clientObj.loginState} ${
          clientObj.offlineState ? "offline" : ""
        }`}
      >
        {station.widgets &&
          station.widgets.map(key => {
            const widget = Widgets[key];
            return (
              <Widget
                simulator={simulator}
                flight={flight}
                station={station}
                widget={widget}
                wkey={key}
                clientObj={clientObj}
                notify={widgetNotify[key]}
                setNotify={this.setNotify}
                key={key}
              />
            );
          })}
      </div>
    );
  }
}

export class Widget extends Component {
  state = {
    tooltipOpen: false,
    modal: false,
    widgetNotifications: {},
    position: { x: 0, y: 0 }
  };
  mouseDown = () => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    this.setState({
      position: {
        x: this.state.position.x + evt.movementX,
        y: this.state.position.y + evt.movementY
      }
    });
  };
  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };
  toggleModal = () => {
    this.props.setNotify(this.props.wkey, false);
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const { widget, wkey, notify } = this.props;
    const { position } = this.state;
    const Comp = widget.widget;
    return (
      <div className="widget-item">
        <FontAwesome
          size="2x"
          fixedWidth
          name={widget.icon}
          className={`widget-icon ${notify ? "notify" : ""}`}
          id={`widget-${wkey}`}
          onClick={this.toggleModal}
          style={{ color: widget.color || "rgb(200,150,255)" }}
        />
        <Tooltip
          placement="bottom"
          isOpen={this.state.tooltipOpen}
          target={`widget-${wkey}`}
          toggle={this.toggle}
        >
          {widget.name}
        </Tooltip>
        {this.state.modal && (
          <div
            className={`modal-themed widget-body widget-${widget.size} ${
              this.state.modal ? "open" : ""
            }`}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <div className="widget-name" onMouseDown={this.mouseDown}>
              {widget.name}
            </div>
            <div className="widget-container">
              <Comp
                toggle={this.toggleModal}
                simulator={this.props.simulator}
                station={this.props.station}
                clientObj={this.props.clientObj}
                flight={this.props.flight}
              />
            </div>
            <Button onClick={this.toggleModal} style={{ width: "200px" }}>
              Close
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withApollo(WidgetsContainer);
