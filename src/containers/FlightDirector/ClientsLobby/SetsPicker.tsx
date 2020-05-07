import React from "react";
import {Container, Row, Col, Card} from "helpers/reactstrap";
import {useSetsPickerQuery, useApplyClientSetMutation} from "generated/graphql";

import "../SetConfig/setConfig.scss";
import {useParams} from "react-router-dom";

export const trainingSteps = [
  {
    selector: ".set-picker",
    content: (
      <span>
        This is the set picker. Sets connect stations to clients, making it easy
        to immediately set all of the clients to the correct station for the
        flight. Click on the simulator name for the set you want to activate.
      </span>
    ),
  },
];
const SetsPicker = () => {
  const [applyClientSetMutation] = useApplyClientSetMutation();
  const {flightId = ""} = useParams();

  const {data, loading} = useSetsPickerQuery({variables: {flightId}});

  const applyClientSet = (
    setId?: string | null,
    simulatorId?: string,
    templateId?: string | null,
    stationSetId?: string | null,
  ) => {
    if (!setId || !simulatorId || !templateId || !stationSetId) {
      return;
    }
    applyClientSetMutation({
      variables: {id: setId, simulatorId, templateId, flightId, stationSetId},
    });
  };
  if (loading) return null;

  const sets = data?.sets;
  const flights = data?.flights;
  if (!flights || !sets) return null;

  const flight = flights?.[0];
  if (!flight) return null;

  return (
    <Container className="set-picker">
      <h4>Sets</h4>
      <Row className="justify-content-md-center">
        {flight?.simulators?.map(s => (
          <Col key={s?.id} sm={4}>
            <h5>
              {s?.name} - {s?.stationSet && s?.stationSet.name}
            </h5>
            <Card style={{maxHeight: "10vh", overflowY: "auto"}}>
              {sets
                .filter(se => {
                  return se?.clients?.find(c => {
                    if (!c?.stationSet) return false;
                    return (
                      c.simulator?.id === s?.templateId &&
                      c.stationSet.id === s?.stationSet?.id
                    );
                  });
                })
                .map(set => {
                  return (
                    set && (
                      <li
                        className="list-group-item"
                        onClick={() =>
                          applyClientSet(
                            set?.id,
                            s?.id,
                            s?.templateId,
                            s?.stationSet?.id,
                          )
                        }
                        key={`${s?.id}-${set?.id}}`}
                      >
                        {set?.name}
                      </li>
                    )
                  );
                })}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SetsPicker;
