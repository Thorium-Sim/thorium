import React from "react";
import {Container, Row, Col, Card, Button} from "helpers/reactstrap";
import {
  useSetsQuery,
  SetsDocument,
  useAddSetMutation,
  useRenameSetMutation,
  useRemoveSetMutation,
} from "generated/graphql";
import {useParams, useNavigate} from "react-router-dom";
import SetStationPicker from "./SetStationPicker";

import "./setConfig.scss";
import ClientConfig from "./ClientConfig";

const SetConfig: React.FC = () => {
  const {data} = useSetsQuery();
  const [createSetMutation] = useAddSetMutation();
  const [renameSetMutation] = useRenameSetMutation();
  const [removeSetMutation] = useRemoveSetMutation();

  const {setId, simulatorId, stationSetId, station} = useParams();

  const navigate = useNavigate();

  const selectedSet = data?.sets?.find(s => s?.id === setId);
  const addSet = () => {
    const name = prompt("What is the name of the set?");
    if (name) {
      createSetMutation({
        variables: {name},
        refetchQueries: [{query: SetsDocument}],
      });
    }
  };

  const removeSet = () => {
    if (!setId) return;
    removeSetMutation({
      variables: {id: setId},
      refetchQueries: [{query: SetsDocument}],
    });
    navigate(`/config/sets/`);
  };
  const renameSet = () => {
    if (!setId) return;
    const name = prompt("What is the name of the new set?", selectedSet?.name);
    if (!name) return;
    renameSetMutation({
      variables: {id: setId, name},
      refetchQueries: [{query: SetsDocument}],
    });
  };

  const sets = data?.sets || [];
  const simulators = data?.simulators || [];

  const selectedSimulator = simulators.find(s => s.id === simulatorId);

  return (
    <Container fluid className="set-config">
      <h4>Set Config </h4>
      <small>
        Be sure to connect all of your clients before configuring this
      </small>
      <Row>
        <Col>
          <h5>Sets</h5>
          <Card>
            {sets.map(s => (
              <li
                key={s?.id || ""}
                className={`list-group-item ${
                  s?.id === setId ? "selected" : ""
                }`}
                onClick={() => navigate(`/config/sets/${s?.id}`)}
              >
                {s?.name}
              </li>
            ))}
          </Card>
          <Button block size="sm" color="primary" onClick={addSet}>
            Add Set
          </Button>
          <Button
            block
            size="sm"
            color="warning"
            onClick={renameSet}
            disabled={!selectedSet}
          >
            Rename Set
          </Button>
          <Button
            block
            size="sm"
            color="danger"
            onClick={removeSet}
            disabled={!selectedSet}
          >
            Remove Set
          </Button>
        </Col>
        <Col className="flex-column">
          {selectedSet && (
            <>
              <h5>Simulators</h5>
              <Card className="flex-max auto-scroll">
                {simulators.map(s => (
                  <li
                    key={s.id}
                    className={`list-group-item ${
                      s.id === simulatorId ? "selected" : ""
                    }`}
                    onClick={() => navigate(`/config/sets/${setId}/${s.id}`)}
                  >
                    {s.name}
                  </li>
                ))}
              </Card>
            </>
          )}
        </Col>
        <Col className="flex-column">
          {simulatorId && (
            <>
              <h5>Station Sets</h5>
              {selectedSimulator && (
                <Card className="flex-max auto-scroll">
                  {selectedSimulator?.stationSets?.map(s => (
                    <li
                      key={s?.id || ""}
                      className={`list-group-item ${
                        s?.id === stationSetId ? "selected" : ""
                      }`}
                      onClick={() =>
                        navigate(
                          `/config/sets/${setId}/${simulatorId}/${s?.id}`,
                        )
                      }
                    >
                      {s?.name}
                    </li>
                  ))}
                </Card>
              )}
            </>
          )}
        </Col>
        <Col className="flex-column">
          {stationSetId && <SetStationPicker />}
        </Col>
        <Col className="flex-column">{station && <ClientConfig />}</Col>
      </Row>
    </Container>
  );
};

export default SetConfig;
