import React, { Component } from "react";
import { Tooltip, Button } from "helpers/reactstrap";
import { Widgets } from "components/views";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import { subscribe } from "helpers/pubsub";

import Tour from "helpers/tourHelper";
import "./widgets.scss";
import useWindowMove from "../../../helpers/hooks/useWindowMove";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";
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
        next({ data }) {
          const { widgetNotify } = data;
          self.setNotify(widgetNotify, true);
        },
        error(err) {
          console.error("err", err);
        }
      });
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }
  setNotify = (widget, state) => {
    this.setState({
      widgetNotify: Object.assign({}, this.state.widgetNotify, {
        [widget]: state
      })
    });
  };
  render() {
    const { simulator, clientObj, station, flight, touch } = this.props;
    const { widgetNotify } = this.state;

    return (
      <div
        style={{ zIndex: 500000 }}
        className={`widgets ${clientObj.loginState} ${
          clientObj.offlineState ? "offline" : ""
        }`}
      >
        {touch && (
          <Widget
            simulator={simulator}
            station={station}
            flight={flight}
            widget={Widgets.keyboard}
            wkey={"keyboard-auto"}
            clientObj={clientObj}
            notify={widgetNotify.keyboard}
            setNotify={this.setNotify}
            touch={touch}
          />
        )}

        {station.widgets &&
          station.widgets
            .concat()
            .filter(w => (touch ? w !== "keyboard" : true))
            .map(key => {
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
                  touch={touch}
                />
              );
            })}
      </div>
    );
  }
}

export const Widget = ({
  widget,
  wkey,
  setNotify,
  notify,
  touch,
  simulator,
  station,
  clientObj,
  flight
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [training, setTraining] = React.useState(false);
  const [position, measureRef, mouseDown] = useWindowMove();
  const playEffect = useSoundEffect();
  React.useEffect(() => {
    const widgetOpenSub = subscribe("widgetOpen", widgetName => {
      if (widgetName === wkey) {
        setModal(true);
      }
    });
    return () => widgetOpenSub && widgetOpenSub();
  }, [wkey]);

  const toggle = () => {
    if (!tooltipOpen) {
      playEffect("buttonHover");
    }
    setTooltipOpen(!tooltipOpen);
  };
  const toggleModal = () => {
    setNotify(wkey, false);
    if (!modal) {
      playEffect("buttonClick");
    }
    setModal(!modal);
  };
  const Comp = widget.widget;
  return (
    <div className="widget-item">
      <FontAwesome
        size="2x"
        fixedWidth
        name={widget.icon}
        className={`widget-icon ${notify ? "notify" : ""}`}
        id={`widget-${wkey}`}
        onClick={toggleModal}
        style={{ color: widget.color || "rgb(200,150,255)" }}
      />
      {!touch && (
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpen}
          target={`widget-${wkey}`}
          toggle={toggle}
          delay={{ show: 0, hide: 20 }}
        >
          {widget.name}
        </Tooltip>
      )}
      {modal && (
        <div
          ref={measureRef}
          className={`widget-body widget-${widget.size} ${modal ? "open" : ""}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          <div
            className="widget-name"
            onMouseDown={mouseDown}
            onTouchStart={mouseDown}
          >
            {widget.name}
            {widget.training && (
              <FontAwesome
                className="pull-right"
                name="question-circle-o"
                onClick={() => setTraining(true)}
              />
            )}
          </div>
          <div className="widget-container">
            <Comp
              toggle={toggleModal}
              simulator={simulator}
              station={station}
              clientObj={clientObj}
              flight={flight}
            />
          </div>
          <Button onClick={toggleModal} style={{ width: "200px" }}>
            Close
          </Button>
        </div>
      )}
      <Tour
        steps={widget.training}
        training={training}
        onRequestClose={() => setTraining(false)}
      />
    </div>
  );
};

export default withApollo(WidgetsContainer);
