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
  useDmxConfigSetActionStrengthMutation,
  useDmxConfigDuplicateMutation,
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
    [key in DMXChannelProperty]: number | string | null;
  }
>;

type DMXAlertConfig = {[tag: string]: ChannelConfig};

interface DMXConfigSetting {
  [key: string]: DMXAlertConfig;
}
const DMXConfigKeys = ["1", "2", "3", "4", "5", "p", "darken"];
const DMXProperties: DMXChannelProperty[] = [
  "color",
  "amber",
  "white",
  "uv",
  "intensity",
  "strobe",
  "generic",
];

export const DMXPropertiesEditor: React.FC<{
  channels: ChannelConfig;
  updateValue: (prop: DMXChannelProperty, value: string) => void;
}> = ({channels = {}, updateValue}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {DMXProperties.map((prop: DMXChannelProperty) => (
        <label key={`config-${prop}`} css={tw`block ml-4`}>
          {prop}
          {prop === "color" ? (
            <div>
              <ColorPicker
                color={channels[prop]}
                onChangeComplete={color => {
                  updateValue(prop, color);
                }}
              />
            </div>
          ) : (
            <Input
              type="number"
              min={0}
              max={1}
              step={0.01}
              defaultValue={channels[prop] || ""}
              onChange={e => {
                updateValue(prop, e.target.value);
              }}
            />
          )}
        </label>
      ))}
    </div>
  );
};
const DMXConfigs: React.FC = () => {
  const {configId} = useParams();
  const navigate = useNavigate();
  const {data} = useDmxConfigsSubscription();
  const {data: fixtureData} = useDmxFixtureTagsQuery();
  const [create] = useDmxConfigCreateMutation();
  const [setName] = useDmxConfigSetNameMutation();
  const [setConfig] = useDmxConfigSetConfigMutation();
  const [remove] = useDmxConfigRemoveMutation();
  const [duplicate] = useDmxConfigDuplicateMutation();
  const [setActionStrength] = useDmxConfigSetActionStrengthMutation();
  const selectedConfig = data?.dmxConfigs.find(d => d.id === configId);
  const selectedConfigSettings = selectedConfig?.config as
    | DMXConfigSetting
    | undefined;

  const allTags =
    fixtureData?.dmxFixtures
      .reduce((prev: string[], next) => {
        return prev.concat(next.tags);
      }, [])
      .filter((a, i, arr) => a !== "no-effects" && arr.indexOf(a) === i)
      .sort() || [];

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
            size="sm"
            color="success"
            onClick={() => {
              const name = prompt("What is the name of this DMX Config?");
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
            <React.Fragment>
              <Button
                block
                size="sm"
                color="info"
                onClick={() => {
                  const name = prompt(
                    "What is the name of the new DMX Config?",
                  );
                  if (!name || name === selectedConfig.name) return;
                  duplicate({variables: {id: selectedConfig.id, name}}).then(
                    res => {
                      navigate(
                        `/config/dmx/configs/${
                          res.data?.dmxConfigDuplicate || ""
                        }`,
                      );
                    },
                  );
                }}
              >
                Duplicate DMX Config
              </Button>
              <Button
                block
                size="sm"
                color="danger"
                onClick={() => {
                  remove({variables: {id: selectedConfig.id}});
                  navigate(`/config/dmx/configs`);
                }}
              >
                Remove DMX Config
              </Button>
              <Button
                tag="a"
                href={`/exportDmxConfigs/${selectedConfig.id}`}
                color="secondary"
                block
                size="sm"
              >
                Export DMX Config
              </Button>
            </React.Fragment>
          )}

          <label css={tw`mt-2`}>
            <div className="btn btn-sm btn-info btn-block">
              Import DMX Config
            </div>
            <input
              hidden
              type="file"
              onChange={evt => {
                if (evt?.target?.files?.[0]) {
                  const data = new FormData();
                  Array.from(evt.target.files).forEach((f, index) =>
                    data.append(`files[${index}]`, f),
                  );
                  fetch(`/importDmxConfigs`, {
                    method: "POST",
                    body: data,
                  }).then(() => {
                    window.location.reload();
                  });
                }
              }}
            />
          </label>
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
              <label>
                Action Strength ({selectedConfig?.actionStrength})
                <Input
                  key={selectedConfig?.id}
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.1}
                  defaultValue={selectedConfig?.actionStrength}
                  onChange={e =>
                    selectedConfig &&
                    setActionStrength({
                      variables: {
                        id: selectedConfig.id,
                        actionStrength: parseFloat(e.target.value),
                      },
                    })
                  }
                />
                <small>
                  Decrease the strength of lighting effects, like shake or
                  oscillate, to create configs for light-sensitive crew members.
                </small>
              </label>
              <label>Alert Conditions</label>
              <div css={tw`overflow-y-auto flex-grow`}>
                {DMXConfigKeys.map(key => {
                  return (
                    <details key={key} css={tw`ml-4`}>
                      <summary>
                        Alert Condition {key}
                        {key === "p" && " (Stealth/Cloaking)"}
                      </summary>
                      {allTags.map(t => (
                        <details
                          key={`config-${key}-${t}`}
                          css={tw`ml-4 block`}
                        >
                          <summary>
                            <Badge>{t}</Badge>
                          </summary>
                          <DMXPropertiesEditor
                            channels={selectedConfigSettings[key]?.[t]}
                            updateValue={(
                              prop: DMXChannelProperty,
                              value: string,
                            ) => {
                              setConfig({
                                variables: {
                                  id: selectedConfig.id,
                                  config: produce(
                                    selectedConfigSettings,
                                    draft => {
                                      draft[key] = draft[key] || {};
                                      draft[key][t] = draft[key][t] || {};
                                      draft[key][t][prop] = value;
                                    },
                                  ),
                                },
                              });
                            }}
                          />
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
