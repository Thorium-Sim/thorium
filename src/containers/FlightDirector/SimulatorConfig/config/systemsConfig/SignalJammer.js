import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import {useQuery, useMutation} from "react-apollo";

const SIGNAL_JAMMER_QUERY = gql`
  query SignalJammer($simulatorId: ID!) {
    signalJammers(simulatorId: $simulatorId) {
      id
      addsSensorsInterference
    }
  }
`;

const SIGNAL_JAMMER_MUTATION = gql`
  mutation SetSensorsInterference($id: ID!, $interference: Boolean!) {
    setSignalJammerSensorsInterference(id: $id, interference: $interference)
  }
`;

const SignalJammer = props => {
  console.log(props);
  const {id, simulatorId} = props;
  const {data} = useQuery(SIGNAL_JAMMER_QUERY, {variables: {simulatorId}});
  const [setSensorsInterference] = useMutation(SIGNAL_JAMMER_MUTATION, {
    refetchQueries: [{query: SIGNAL_JAMMER_QUERY, variables: {simulatorId}}],
  });
  const {addsSensorsInterference} = data?.signalJammers?.[0] || {};

  return (
    <GenericSystemConfig {...props}>
      <label>
        <input
          type="checkbox"
          checked={addsSensorsInterference}
          onChange={() =>
            setSensorsInterference({
              variables: {id, interference: !addsSensorsInterference},
            })
          }
        />
        Add interference to Sensors when signal jammer is active.
      </label>
    </GenericSystemConfig>
  );
};

export default SignalJammer;
