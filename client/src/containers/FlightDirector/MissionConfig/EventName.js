import React from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";

const query = gql`
  query IntrospectionQuery {
    __schema {
      mutationType {
        name
        description
        fields {
          name
          description
          isDeprecated
          deprecationReason
          args {
            name
            description
            defaultValue
          }
        }
      }
    }
  }
`;

const memo = {};
const EventName = ({ id, label, client }) => {
  const [output, setOutput] = React.useState(label);
  React.useEffect(() => {
    if (!memo[id]) memo[id] = client.query({ query });
    memo[id].then(({ data }) => {
      const name = data.__schema.mutationType.fields
        .find(f => f.name === id)
        .description.replace("Macro: ", "");
      setOutput(name);
    });
  }, [client, id]);
  return output;
};

export default withApollo(EventName);
