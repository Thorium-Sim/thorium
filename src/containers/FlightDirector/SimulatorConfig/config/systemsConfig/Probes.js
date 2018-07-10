import React from "react";
import { Input, Row, Col } from "reactstrap";
import GenericSystemConfig from "./Generic";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const PROBE_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      torpedo
    }
  }
`;

const Probes = ({ client, simulatorId, type }) => {
  return (
    <GenericSystemConfig client={client} simulatorId={simulatorId} type={type}>
      <Query query={PROBE_QUERY} variables={{ simulatorId }}>
        {({ data, loading }) => {
          if (loading) return null;
          const probes = data.probes[0];
          return (
            <Row>
              <Col sm={6}>
                <label style={{ marginLeft: "20px" }}>
                  <Mutation
                    mutation={gql`
                      mutation SetProbeTorpedo($id: ID!, $torpedo: Boolean!) {
                        setProbeTorpedo(id: $id, torpedo: $torpedo)
                      }
                    `}
                    refetchQueries={[
                      { query: PROBE_QUERY, variables: { simulatorId } }
                    ]}
                  >
                    {action => (
                      <Input
                        type="checkbox"
                        checked={probes.torpedo}
                        onChange={e => {
                          action({
                            variables: {
                              id: probes.id,
                              torpedo: e.target.checked
                            }
                          });
                        }}
                      />
                    )}
                  </Mutation>{" "}
                  Launch probes with Torpedo system
                </label>
              </Col>
            </Row>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Probes;
