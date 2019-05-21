import React from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import StationSetPicker from "./StationSetPicker";
import StationPicker from "./StationPicker";
import ConfigStation from "./StationConfig";
import { useQuery } from "@apollo/react-hooks";
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

const StationConfig = ({ selectedSimulator, client }) => {
  const { data } = useQuery(QUERY);
  const [selectedStationSet, setSelectedStationSet] = React.useState(null);
  const [selectedStation, setSelectedStation] = React.useState(null);
  const { stationSets } = selectedSimulator;

  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <StationSetPicker
            sim={selectedSimulator}
            client={client}
            selectedStationSet={selectedStationSet}
            setStationSet={set => {
              setSelectedStation(null);
              setSelectedStationSet(set);
            }}
          />
        </Col>
        <Col sm={3}>
          {selectedStationSet && (
            <StationPicker
              client={client}
              stationSet={stationSets.find(s => s.id === selectedStationSet)}
              selectedStation={selectedStation}
              selectStation={station => setSelectedStation(station)}
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
};

export default withApollo(StationConfig);
