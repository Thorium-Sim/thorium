import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { withApollo, graphql } from "react-apollo";
import StationSetPicker from "./StationSetPicker";
import StationPicker from "./StationPicker";
import ConfigStation from "./StationConfig";

class StationConfig extends Component {
  state = {};
  render() {
    const { selectedSimulator, data, client } = this.props;
    const { selectedStationSet, selectedStation } = this.state;
    const { stationSets } = selectedSimulator;

    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <StationSetPicker
              sim={selectedSimulator}
              client={client}
              selectedStationSet={selectedStationSet}
              setStationSet={set =>
                this.setState({
                  selectedStationSet: set,
                  selectedStation: null
                })
              }
            />
          </Col>
          <Col sm={3}>
            {selectedStationSet && (
              <StationPicker
                client={client}
                stationSet={stationSets.find(s => s.id === selectedStationSet)}
                selectedStation={selectedStation}
                selectStation={station =>
                  this.setState({ selectedStation: station })
                }
              />
            )}
          </Col>
          <Col sm={6}>
            {selectedStation && (
              <ConfigStation
                data={data}
                client={client}
                simulator={selectedSimulator}
                selectedStationSet={selectedStationSet}
                station={
                  stationSets.find(s => s.id === selectedStationSet) &&
                  stationSets
                    .find(s => s.id === selectedStationSet)
                    .stations.find(s => s.name === selectedStation)
                }
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Panels {
    softwarePanels {
      id
      name
    }
    interfaces {
      id
      name
    }
  }
`;

export default withApollo(graphql(QUERY)(StationConfig));
