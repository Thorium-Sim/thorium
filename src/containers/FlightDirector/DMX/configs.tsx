/** @jsx jsx */
import {jsx} from "@emotion/core";
import tw from "twin.macro";
import css from "@emotion/css/macro";
import React from "react";
import {
  useDmxConfigsSubscription,
  useDmxFixtureTagsQuery,
  useDmxConfigSetConfigMutation,
  useDmxConfigRemoveMutation,
  useDmxConfigSetNameMutation,
  useDmxConfigCreateMutation,
} from "generated/graphql";
import SearchableList from "helpers/SearchableList";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, Badge} from "reactstrap";
import produce from "immer";
import ColorPicker from "helpers/colorPicker";

export type DMXChannelProperty =
  | "color"
  | "amber"
  | "white"
  | "uv"
  | "intensity"
  | "strobe"
  | "generic"
  | "nothing";

type ChannelConfig = Partial<
  {
    [key in DMXChannelProperty]: number | string;
  }
>;

type DMXAlertConfig = {[tag: string]: ChannelConfig};

interface DMXConfigSetting {
  [key: string]: DMXAlertConfig;
}
const DMXConfigKeys = ["1", "2", "3", "4", "5", "p"];
const DMXProperties: DMXChannelProperty[] = [
  "color",
  "amber",
  "white",
  "uv",
  "intensity",
  "strobe",
  "generic",
];
const DMXConfigs: React.FC = () => {
  const {configId} = useParams();
  const navigate = useNavigate();
  const {data} = useDmxConfigsSubscription();
  const {data: fixtureData} = useDmxFixtureTagsQuery();
  const [create] = useDmxConfigCreateMutation();
  const [setName] = useDmxConfigSetNameMutation();
  const [setConfig] = useDmxConfigSetConfigMutation();
  const [remove] = useDmxConfigRemoveMutation();

  const selectedConfig = data?.dmxConfigs.find(d => d.id === configId);
  const selectedConfigSettings = selectedConfig?.config as
    | DMXConfigSetting
    | undefined;

  const allTags =
    fixtureData?.dmxFixtures
      .reduce((prev: string[], next) => {
        return prev.concat(next.tags);
      }, [])
      .filter((a, i, arr) => arr.indexOf(a) === i) || [];

  return (
    <div css={tw`h-full`}>
      <h3>Configs</h3>
      <div
        css={[
          tw`grid grid-cols-3 gap-4`,
          css`
            height: calc(100% - 196px);
          `,
        ]}
      >
        <div css={tw`flex flex-col`}>
          <SearchableList
            items={
              data?.dmxConfigs?.map(d => ({id: d.id, label: d.name})) || []
            }
            selectedItem={configId || null}
            setSelectedItem={item => navigate(`/config/dmx/configs/${item}`)}
          ></SearchableList>
          <Button
            block
            color="success"
            onClick={() => {
              const name = prompt("What is the name of this DMX Device?");
              if (!name) return;
              create({variables: {name}}).then(res =>
                navigate(
                  `/config/dmx/configs/${res.data?.dmxConfigCreate || ""}`,
                ),
              );
            }}
          >
            Create DMX Config
          </Button>
          {selectedConfig && (
            <Button
              block
              color="danger"
              onClick={() => {
                remove({variables: {id: selectedConfig.id}});
                navigate(`/config/dmx/configs`);
              }}
            >
              Remove DMX Config
            </Button>
          )}
        </div>
        <div css={tw`flex flex-col col-span-2 overflow-y-hidden`}>
          {selectedConfig && selectedConfigSettings && (
            <React.Fragment>
              <h3>{selectedConfig?.name}</h3>
              <label>
                Name
                <Input
                  key={selectedConfig?.id}
                  defaultValue={selectedConfig?.name}
                  onChange={e =>
                    selectedConfig &&
                    setName({
                      variables: {id: selectedConfig.id, name: e.target.value},
                    })
                  }
                />
              </label>
              <label>Alert Conditions</label>
              <div css={tw`overflow-y-auto flex-grow`}>
                {DMXConfigKeys.map(key => {
                  return (
                    <details key={key} css={tw`ml-4`}>
                      <summary>Alert Condition {key}</summary>
                      {allTags.map(t => (
                        <details
                          key={`config-${key}-${t}`}
                          css={tw`ml-4 block`}
                        >
                          <summary>
                            <Badge>{t}</Badge>
                          </summary>
                          {DMXProperties.map((prop: DMXChannelProperty) => (
                            <label
                              key={`config-${key}-${t}-${prop}`}
                              css={tw`block ml-4`}
                            >
                              {prop}
                              {prop === "color" ? (
                                <div>
                                  <ColorPicker
                                    color={
                                      selectedConfigSettings[key]?.[t]?.[prop]
                                    }
                                    onChangeComplete={color => {
                                      setConfig({
                                        variables: {
                                          id: selectedConfig.id,
                                          config: produce(
                                            selectedConfigSettings,
                                            draft => {
                                              draft[key] = draft[key] || {};
                                              draft[key][t] =
                                                draft[key][t] || {};
                                              draft[key][t][prop] = color;
                                            },
                                          ),
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              ) : (
                                <Input
                                  type="number"
                                  min={0}
                                  max={1}
                                  step={0.01}
                                  defaultValue={
                                    selectedConfigSettings[key]?.[t]?.[prop]
                                  }
                                  onChange={e => {
                                    setConfig({
                                      variables: {
                                        id: selectedConfig.id,
                                        config: produce(
                                          selectedConfigSettings,
                                          draft => {
                                            draft[key] = draft[key] || {};
                                            draft[key][t] = draft[key][t] || {};
                                            draft[key][t][prop] =
                                              e.target.value;
                                          },
                                        ),
                                      },
                                    });
                                  }}
                                />
                              )}
                            </label>
                          ))}
                        </details>
                      ))}
                    </details>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default DMXConfigs;
