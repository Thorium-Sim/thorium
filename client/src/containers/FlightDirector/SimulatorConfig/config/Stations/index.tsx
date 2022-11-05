import React from "react";
import {Container, Row, Col} from "helpers/reactstrap";
import StationSetPicker from "./StationSetPicker";
import StationPicker from "./StationPicker";
import ConfigStation from "./StationConfig";
import {Simulator} from "generated/graphql";
import {useParams} from "react-router";

const StationConfig = ({selectedSimulator}: {selectedSimulator: Simulator}) => {
  const {
    subPath1: selectedStationSet,
    subPath2: selectedStationUnparsed,
  } = useParams();
  const selectedStation = decodeURI(selectedStationUnparsed || "");
  const {stationSets} = selectedSimulator;
  const stationSet = stationSets?.find(s => s?.id === selectedStationSet);
  const station = stationSet?.stations?.find(s => s?.name === selectedStation);
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <StationSetPicker sim={selectedSimulator} />
        </Col>
        <Col sm={3}>
          {stationSet && <StationPicker stationSet={stationSet} />}
        </Col>
        <Col sm={6}>
          {station && (
            <ConfigStation simulator={selectedSimulator} station={station} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StationConfig;
