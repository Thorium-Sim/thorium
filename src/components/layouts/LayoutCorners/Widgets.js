import React, { Component } from "react";
import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Widgets } from "../../views";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

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
    const { simulator, clientObj, station } = this.props;
    const { widgetNotify } = this.state;
    console.log(station);
    return (
      <div
        className={`widgets ${clientObj.loginState} ${clientObj.offlineState
          ? "offline"
          : ""}`}
      >
        {station.widgets.map(key => {
          const widget = Widgets[key];
          return (
            <Widget
              simulator={simulator}
              station={station}
              widget={widget}
              wkey={key}
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

class Widget extends Component {
  state = {
    tooltipOpen: false,
    modal: false,
    widgetNotifications: {}
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
    const Component = widget.widget;
    return (
      <div className="widget-item" onClick={this.toggleModal}>
        <FontAwesome
          size="2x"
          fixedWidth
          name={widget.icon}
          className={`widget-icon ${notify ? "notify" : ""}`}
          id={`widget-${wkey}`}
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
        {this.state.modal &&
          <Modal
            className="modal-themed"
            size={widget.size || ""}
            isOpen={this.state.modal}
            toggle={this.toggleModal}
          >
            <ModalHeader toggle={this.toggleModal}>
              {widget.name}
            </ModalHeader>
            <ModalBody>
              <Component
                toggle={this.toggleModal}
                simulator={this.props.simulator}
                station={this.props.station}
              />
            </ModalBody>
          </Modal>}
      </div>
    );
  }
}

export default withApollo(WidgetsContainer);
