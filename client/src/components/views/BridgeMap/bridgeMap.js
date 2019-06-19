import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";

import svgToJSX from "svg-to-jsx";
import "./style.scss";

class BridgeMap extends Component {
  state = {};
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
  handleClick = dataset => {
    this.setState({
      selectedClient: dataset.client,
      name: dataset.name,
      description: dataset.description
    });
  };
  renderSvg() {
    const { bridge } = this.props.simulator.assets;
    fetch(`/assets${bridge}`)
      .then(res => res.text())
      .then(res => svgToJSX(res))
      .then(res => this.setState({ svg: res }));
  }
  trainingSteps = () => {
    return [
      {
        selector: ".bridgeMap",
        content: (
          <FormattedMessage
            id="bridge-map-training-1"
            defaultMessage="This screen shows a map of the bridge. You can use it to see what each station on the bridge does. Hover your mouse over or tap on a station to see a description on the right side of the screen."
          />
        )
      }
    ];
  };
  render() {
    const { clients } = this.props;
    const { svg, selectedClient, name, description } = this.state;
    if (!svg)
      return (
        <div>
          No bridge map has been specified. Make sure you configure a bridge map
          in your simulator assets configuration.
        </div>
      );
    const client = clients.find(c => c.id === selectedClient);
    const station = client && client.station;
    return (
      <Container fluid className="bridgeMap">
        <Row>
          <Col sm={9}>
            <div
              className="svg-holder"
              onMouseMove={e => this.handleClick(e.target.dataset)}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </Col>
          <Col sm={3}>
            <Card className="flex-column flex-max">
              <CardBody>
                {(station || (name && description)) && (
                  <div className="flex-column">
                    <h3>{station ? station.name : name}</h3>
                    <h4>{client && client.loginName}</h4>
                    <p className="flex-max auto-scroll">
                      {station ? station.description : description}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Tour steps={this.trainingSteps()} client={this.props.clientObj} />
      </Container>
    );
  }
}
export default BridgeMap;
