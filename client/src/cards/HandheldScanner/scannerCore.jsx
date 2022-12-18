import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "helpers/reactstrap";
import {Mutation} from "@apollo/client/react/components";
import gql from "graphql-tag";
import {OutputField, TypingField} from "../../components/generic/core";
import ScanPresets from "../Sensors/ScanPresets";

const ScannerCore = ({scanners, clients}) => {
  const screens = ["MedicalTricorder", "Tricorder"];
  const [selectedScanner, setSelectedScanner] = React.useState(null);
  const [dataField, setDataField] = React.useState("");
  const clientsList = clients
    .filter(c => c.station && screens.indexOf(c.station.name) > -1)
    .map(c => scanners.find(k => k.id === c.id));
  const scanner = scanners.find(k => k.id === selectedScanner);
  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: "100%",
  };

  return clientsList.length === 0 ? (
    <p>No handheld scanners. Use the Thorium Mobile app to use this core.</p>
  ) : (
    <Container className="handheldScanner-core">
      <Row>
        <Col sm={4}>
          <ListGroup>
            {clientsList.map(c => (
              <ListGroupItem
                key={c.id}
                active={c.id === selectedScanner}
                onClick={() => setSelectedScanner(c.id)}
                style={{
                  backgroundColor: c.scanning ? `rgba(255, 0, 0, 0.3)` : null,
                }}
              >
                {c.label}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {scanner && (
          <Col sm={8}>
            <div style={fieldStyle}>
              <OutputField
                style={{flexGrow: 2, minHeight: "44px"}}
                alert={scanner.scanning}
              >
                {scanner.scanRequest}
              </OutputField>
              <TypingField
                style={{flexGrow: 6, minHeight: "44px"}}
                controlled
                onChange={e => setDataField(e.target.value)}
                value={dataField}
              />
              <div style={{display: "flex"}}>
                <Mutation
                  mutation={gql`
                    mutation ScannerResponse($id: ID!, $response: String!) {
                      handheldScannerResponse(id: $id, response: $response)
                    }
                  `}
                >
                  {action => (
                    <Button
                      onClick={() =>
                        action({
                          variables: {
                            id: scanner.id,
                            response: dataField,
                          },
                        })
                      }
                      style={{flexGrow: 2}}
                      size={"sm"}
                      color="primary"
                    >
                      Send
                    </Button>
                  )}
                </Mutation>
                <ScanPresets
                  style={{flexGrow: 4, maxWidth: 100}}
                  onChange={e => setDataField(e)}
                />
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default ScannerCore;
