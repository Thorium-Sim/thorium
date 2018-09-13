import React, { Component } from "react";
import { createPortal } from "react-dom";
import svgToJSX from "svg-to-jsx";
import { withApollo } from "react-apollo";
import Actions, { triggerAction } from "../Actions/core";

import "./style.scss";

const ClientLabel = ({ x, y, client }) => {
  return createPortal(
    <div
      className="bridge-map-client-label core"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <p>{client.station.name}</p>
      <p>{client.id}</p>
    </div>,
    document.body
  );
};

class BridgeMapCore extends Component {
  state = { x: 0, y: 0, action: "flash" };
  componentDidMount() {
    this.renderSvg();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.simulator.assets.bridge !== prevProps.simulator.assets.bridge
    ) {
      this.renderSvg();
    }
  }
  handleClick = clientId => {
    if (!clientId) return;
    triggerAction({
      actionName: this.state.action,
      actionDest: clientId,
      selectedMovie: this.state.movie,
      selectedVoice: this.state.voice,
      simulator: this.props.simulator,
      client: this.props.client
    });
  };
  renderSvg() {
    const { bridge } = this.props.simulator.assets;
    fetch(`/assets${bridge}`)
      .then(res => res.text())
      .then(res => svgToJSX(res))
      .then(res => this.setState({ svg: res }));
  }
  render() {
    const { svg, client, x, y } = this.state;
    const { clients } = this.props;
    const clientObj = clients.find(c => c.id === client);
    if (!svg) return null;
    return (
      <div className="bridgeMap-core">
        <Actions
          {...this.props}
          bridgeMap
          onChangeAction={e => this.setState({ action: e })}
          onChangeSound={e => this.setState({ sound: e })}
          onChangeMovie={e => this.setState({ movie: e })}
          onChangeVoice={e => this.setState({ voice: e })}
        />
        <div
          className="svg-holder"
          onMouseMove={e =>
            this.setState({
              client: e.target.dataset.client,
              x: e.clientX + 10,
              y: e.clientY + 10
            })
          }
          onClick={e => this.handleClick(e.target.dataset.client)}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {clientObj && <ClientLabel x={x} y={y} client={clientObj} />}
      </div>
    );
  }
}

export default withApollo(BridgeMapCore);
