import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Input,
  Button
} from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";
import { titleCase } from "change-case";

const Symptoms = ({
  symptoms,
  diagnosis,
  treatment,
  treatmentRequest,
  update
}) => {
  return (
    <div className="symptoms action-container">
      <h4>Symptoms</h4>
      <UncontrolledDropdown>
        <DropdownToggle block caret>
          Click to add Symptoms
        </DropdownToggle>
        <DropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
          <Query
            query={gql`
              query Symptoms {
                symptoms
              }
            `}
          >
            {({ loading, data }) =>
              loading
                ? null
                : data.symptoms
                    .filter(s => symptoms.indexOf(s) === -1)
                    .map(s => (
                      <DropdownItem
                        key={s}
                        onClick={() =>
                          update(
                            "symptoms",
                            [...symptoms, s].filter(
                              (a, i, arr) => arr.indexOf(a) === i
                            )
                          )
                        }
                      >
                        {titleCase(s)}
                      </DropdownItem>
                    ))
            }
          </Query>
        </DropdownMenu>
      </UncontrolledDropdown>
      <ListGroup
        style={{
          minHeight: "50px",
          maxHeight: "200px",
          overflowY: "auto"
        }}
      >
        {symptoms.map(s => (
          <ListGroupItem key={`symptom-${s}`}>
            {titleCase(s)}{" "}
            <FontAwesome
              name="ban"
              className="text-danger"
              onClick={() => update("symptoms", symptoms.filter(c => c !== s))}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
      <h4>Diagnosis</h4>
      <Input
        type="textarea"
        rows={2}
        readOnly
        value={diagnosis.map(titleCase).join(", ")}
      />
      <h4>Treatment</h4>
      <Input
        type="textarea"
        rows={4}
        readOnly
        value={
          treatmentRequest ? "Requesting treatment instructions..." : treatment
        }
      />
      {treatmentRequest ? (
        <Button
          color="warning"
          block
          onClick={() => update("treatmentRequest", false)}
        >
          Cancel Treatment Request
        </Button>
      ) : (
        <Button
          color="success"
          block
          onClick={() => update("treatmentRequest", true)}
        >
          Request Treatment
        </Button>
      )}
    </div>
  );
};

export default Symptoms;
