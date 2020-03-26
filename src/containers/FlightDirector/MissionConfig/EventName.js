import React from "react";
import {withApollo} from "react-apollo";
import {MacroConfigQuery} from "./EventPicker";

const memo = {};
const EventName = ({id, label, client}) => {
  const [output, setOutput] = React.useState(label);
  React.useEffect(() => {
    if (!memo[id]) memo[id] = client.query({query: MacroConfigQuery});
    memo[id].then(({data}) => {
      const item = data.__schema.mutationType.fields.find(f => f.name === id);
      const name = item
        ? item.description.replace("Macro: ", "").split("\n")[0]
        : id;
      setOutput(name);
    });
  }, [client, id]);
  return output || null;
};

export default withApollo(EventName);
