import React from "react";
import gql from "graphql-tag.macro";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery, useMutation} from "@apollo/client";
import {Input, Button} from "helpers/reactstrap";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import {capitalCase} from "change-case";

const fragment = gql`
  fragment MacrosButtonsData on MacroButtonConfig {
    id
    name
    buttons {
      id
      name
      color
      category
    }
  }
`;

const QUERY = gql`
  query Macros {
    macroButtons {
      ...MacrosButtonsData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription MacroUpdate {
    macroButtonsUpdate {
      ...MacrosButtonsData
    }
  }
  ${fragment}
`;

const MacroButtons = ({simulator: {id: simulatorId}}) => {
  const {loading, data, subscribeToMore} = useQuery(QUERY);
  const [trigger] = useMutation(gql`
    mutation Trigger($simulatorId: ID!, $configId: ID!, $buttonId: ID!) {
      triggerMacroButton(
        simulatorId: $simulatorId
        configId: $configId
        buttonId: $buttonId
      )
    }
  `);
  const buttonsConfig = React.useMemo(
    () => ({
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        macroButtons: subscriptionData.data.macroButtonsUpdate,
      }),
    }),
    [],
  );
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, buttonsConfig);
  const [selectedConfig, setSelectedConfig] = useLocalStorage(
    "thorium_macroButtonConfig",
    "",
  );
  const {macroButtons} = data || {};
  React.useEffect(() => {
    if (macroButtons && selectedConfig) {
      if (!macroButtons.find(m => m.id === selectedConfig)) {
        setSelectedConfig("");
      }
    }
  }, [macroButtons, selectedConfig, setSelectedConfig]);
  if (loading || !data) return null;

  const config = macroButtons.find(m => m.id === selectedConfig);
  const categories = config
    ? config.buttons.reduce((acc, b) => {
        const name = b.category.toLowerCase().trim();
        const output = {...acc};
        if (!output[name]) output[name] = [];
        output[name].push(b);
        return output;
      }, {})
    : {};
  return (
    <div className="macro-buttons">
      <Input
        type="select"
        value={selectedConfig || ""}
        onChange={e => setSelectedConfig(e.target.value)}
      >
        <option value={""} disabled>
          Choose a config
        </option>
        {macroButtons.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </Input>
      {config && (
        <div>
          {Object.entries(categories).map(([name, buttons]) => (
            <div>
              <strong>{capitalCase(name)}</strong>
              <div style={{borderTop: "solid 1px rgba(255,255,255,0.5)"}}>
                {buttons.map(b => (
                  <Button
                    key={b.id}
                    color={b.color}
                    size="sm"
                    onClick={() =>
                      trigger({
                        variables: {
                          configId: selectedConfig,
                          buttonId: b.id,
                          simulatorId,
                        },
                      })
                    }
                  >
                    {b.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MacroButtons;
