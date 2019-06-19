import React from "react";
import { Input, Row, Col } from "helpers/reactstrap";
import GenericSystemConfig from "./Generic";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const PROBE_QUERY = gql`
  query Probes($id: ID!) {
    probe(id: $id) {
      id
      torpedo
    }
  }
`;

const Probes = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={PROBE_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const probes = data.probe;
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
                    refetchQueries={[{ query: PROBE_QUERY, variables: { id } }]}
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
