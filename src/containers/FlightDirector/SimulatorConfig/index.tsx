import React from "react";
import {Col, Row, Container, Button} from "helpers/reactstrap";

import SimulatorProperties from "./SimulatorProperties";
import * as Config from "./config";
import {
  useRemoveSimulatorMutation,
  useSimulatorsConfigSubscription,
  useStationSetConfigSubscription,
  Simulator,
} from "generated/graphql";
import "./SimulatorConfig.scss";
import {useParams, useNavigate, Route, Routes} from "react-router-dom";

const SimulatorConfig = () => {
  const {selectedProperty, simulatorId} = useParams();
  const navigate = useNavigate();

  function setSelectedProperty(prop: string) {
    navigate(`/config/simulator/${simulatorId}/${prop}`);
  }
  const [removeSimMutation] = useRemoveSimulatorMutation();
  const {data} = useSimulatorsConfigSubscription();
  const {data: stationData} = useStationSetConfigSubscription();

  const selectProperty = (prop: string) => {
    setSelectedProperty(prop);
  };
  const removeSimulator = () => {
    if (simulatorId) {
      if (window.confirm("Are you sure you want to delete that simulator?")) {
        removeSimMutation({variables: {id: simulatorId}});
        navigate("/config/simulator");
      }
    }
  };

  const prop = selectedProperty as keyof typeof Config;
  const Comp = React.useMemo(() => Config[prop], [prop]) as React.FC<{
    selectedSimulator: Simulator;
  }>;

  const selectedSimulator = data?.simulatorsUpdate?.find(
    s => s?.id === simulatorId,
  );
  const simulatorStationsSets = stationData?.stationSetUpdate?.filter(
    s => s?.simulator?.id === simulatorId,
  );
  return (
    <Container fluid className="simulator-config">
      <h4>Simulator Config </h4>
      <Row>
        <Col sm={2} className="property-list">
          <SimulatorProperties
            selectProperty={selectProperty}
            selectedProperty={selectedProperty}
          />
          <Button
            tag="a"
            href={`/exportSimulator/${simulatorId}`}
            block
            size="sm"
            color="info"
          >
            Export
          </Button>
          <Button block onClick={removeSimulator} size="sm" color="danger">
            Remove Simulator
          </Button>
        </Col>
        <Col sm={10} style={{height: "100%", overflowY: "auto"}}>
          {selectedSimulator && Comp ? (
            <Comp
              selectedSimulator={{
                ...selectedSimulator,
                stationSets: simulatorStationsSets,
              }}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

const SimulatorConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SimulatorConfig />} />
      <Route path=":selectedProperty" element={<SimulatorConfig />} />
      <Route path=":selectedProperty/:subPath1" element={<SimulatorConfig />} />
      <Route
        path=":selectedProperty/:subPath1/:subPath2"
        element={<SimulatorConfig />}
      />
      <Route
        path=":selectedProperty/:subPath1/:subPath2/:subPath3"
        element={<SimulatorConfig />}
      />
    </Routes>
  );
};
export default SimulatorConfigRoutes;
