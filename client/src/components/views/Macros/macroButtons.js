import React from "react";
import gql from "graphql-tag.macro";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Input, Button } from "helpers/reactstrap";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import { titleCase } from "change-case";

const fragment = gql`
  fragment MacrosData on MacroButtonConfig {
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
      ...MacrosData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription MacroUpdate {
    macroButtonsUpdate {
      ...MacrosData
    }
  }
  ${fragment}
`;

const MacroButtons = ({ simulator: { id: simulatorId } }) => {
  const { loading, data, subscribeToMore } = useQuery(QUERY);
  const [trigger] = useMutation(gql`
    mutation Trigger($simulatorId: ID!, $configId: ID!, $buttonId: ID!) {
      triggerMacroButton(
        simulatorId: $simulatorId
        configId: $configId
        buttonId: $buttonId
      )
    }
  `);
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, {
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      macroButtons: subscriptionData.data.macroButtonsUpdate
    })
  });
  const { macroButtons } = data;
  const [selectedConfig, setSelectedConfig] = useLocalStorage(
    "thorium_macroButtonConfig",
    ""
  );
  React.useEffect(() => {
    if (macroButtons && selectedConfig) {
      if (!macroButtons.find(m => m.id === selectedConfig)) {
        setSelectedConfig("");
      }
    }
  }, [macroButtons, selectedConfig, setSelectedConfig]);
  if (loading || !macroButtons) return null;
  const config = macroButtons.find(m => m.id === selectedConfig);
  const categories = config
    ? config.buttons.reduce((acc, b) => {
        const name = b.category.toLowerCase().trim();
        const output = { ...acc };
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
              <strong>{titleCase(name)}</strong>
              <div style={{ borderTop: "solid 1px rgba(255,255,255,0.5)" }}>
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
                          simulatorId
                        }
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
