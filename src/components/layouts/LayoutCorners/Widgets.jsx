import React, {Component} from "react";
import {Tooltip, Button} from "helpers/reactstrap";
import {Widgets} from "components/views";
import gql from "graphql-tag.macro";
import {withApollo} from "react-apollo";
import {subscribe} from "helpers/pubsub";

import Tour from "helpers/tourHelper";
import "./widgets.scss";
import useWindowMove from "../../../helpers/hooks/useWindowMove";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";
import {FaQuestionCircle} from "react-icons/fa";
const WIDGET_NOTIFY = gql`
  subscription WidgetNotify($simulatorId: ID!, $station: String) {
    widgetNotify(simulatorId: $simulatorId, station: $station)
  }
`;

class WidgetsContainer extends Component {
  state = {
    widgetNotify: {},
  };
  constructor(props) {
    super(props);
    const self = this;
    this.subscription = this.props.client
      .subscribe({
        query: WIDGET_NOTIFY,
        variables: {
          simulatorId: this.props.simulator.id,
          station: this.props.station.name,
        },
      })
      .subscribe({
        next({data}) {
          const {widgetNotify} = data;
          self.setNotify(widgetNotify, true);
        },
        error(err) {
          console.error("err", err);
        },
      });
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }
  setNotify = (widget, state) => {
    this.setState({
      widgetNotify: Object.assign({}, this.state.widgetNotify, {
        [widget]: state,
      }),
    });
  };
  render() {
    const {simulator, clientObj, station, flight, touch} = this.props;
    const {widgetNotify} = this.state;

    return (
      <div
        style={{zIndex: 500000}}
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
  flight,
  placement = "bottom",
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [training, setTraining] = React.useState(false);
  const [position, measureRef, mouseDown] = useWindowMove();
  const playEffect = useSoundEffect();

  React.useEffect(() => {
    return subscribe("widgetClose", () => {
      setModal(false);
    });
  }, []);

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
  const Comp = widget?.widget;
  const Icon = widget?.icon;
  if (!Comp || !Icon) return null;
  return (
    <div className="widget-item">
      <Icon
        size="2em"
        className={`widget-icon ${notify ? "notify" : ""}`}
        id={`widget-${wkey}`}
        onClick={toggleModal}
        style={{color: widget.color || "rgb(200,150,255)"}}
      />
      {!touch && (
        <Tooltip
          placement={placement}
          isOpen={tooltipOpen}
          target={`widget-${wkey}`}
          toggle={toggle}
          delay={{show: 0, hide: 20}}
        >
          {widget.name}
        </Tooltip>
      )}
      {modal && (
        <div
          ref={measureRef}
          className={`widget-body widget-${widget.size} ${modal ? "open" : ""}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <React.Suspense fallback={null}>
            <div
              className="widget-name"
              onMouseDown={mouseDown}
              onTouchStart={mouseDown}
            >
              {widget.name}
              {widget.training && (
                <FaQuestionCircle
                  className="pull-right"
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
            <Button onClick={toggleModal} style={{width: "200px"}}>
              Close
            </Button>
          </React.Suspense>
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
