import tw from "twin.macro";
import css from "@emotion/css/macro";
import React from "react";
import {
  useDmxDevicesSubscription,
  useDmxDeviceCreateMutation,
  useDmxDeviceSetNameMutation,
  useDmxDeviceSetChannelsMutation,
  DmxChannelProperty,
  useDmxDeviceRemoveMutation,
} from "generated/graphql";
import SearchableList from "helpers/SearchableList";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input} from "reactstrap";
import produce from "immer";
import {FaBan} from "react-icons/fa";
const DMXDevices: React.FC = () => {
  const {deviceId} = useParams();
  const navigate = useNavigate();
  const {data} = useDmxDevicesSubscription();
  const [create] = useDmxDeviceCreateMutation();
  const [setName] = useDmxDeviceSetNameMutation();
  const [setChannels] = useDmxDeviceSetChannelsMutation();
  const [remove] = useDmxDeviceRemoveMutation();

  const selectedDevice = data?.dmxDevices.find(d => d.id === deviceId);
  return (
    <div css={tw`h-full`}>
      <h3>Devices</h3>
      <div
        css={[
          tw`flex justify-between`,
          css`
            height: calc(100% - 196px);
          `,
        ]}
      >
        <div css={tw`mr-4 flex-grow flex flex-col`}>
          <SearchableList
            items={
              data?.dmxDevices?.map(d => ({id: d.id, label: d.name})) || []
            }
            selectedItem={deviceId || null}
            setSelectedItem={item => navigate(`/config/dmx/devices/${item}`)}
          ></SearchableList>
          <Button
            block
            size="sm"
            color="success"
            onClick={() => {
              const name = prompt("What is the name of this DMX Device?");
              if (!name) return;
              create({variables: {name}}).then(res =>
                navigate(
                  `/config/dmx/devices/${res.data?.dmxDeviceCreate || ""}`,
                ),
              );
            }}
          >
            Create DMX Device
          </Button>
          {selectedDevice && (
            <Button
              block
              size="sm"
              color="danger"
              onClick={() => {
                remove({variables: {id: selectedDevice.id}});
                navigate(`/config/dmx/devices`);
              }}
            >
              Remove DMX Device
            </Button>
          )}
        </div>
        <div css={tw`flex flex-col mx-64 flex-grow`}>
          {selectedDevice && (
            <React.Fragment>
              <h3>{selectedDevice?.name}</h3>
              <label>
                Name
                <Input
                  key={selectedDevice?.id}
                  defaultValue={selectedDevice?.name}
                  onChange={e =>
                    selectedDevice &&
                    setName({
                      variables: {id: selectedDevice.id, name: e.target.value},
                    })
                  }
                />
              </label>
              <label>Channels</label>

              <div css={tw`flex flex-col flex-grow overflow-y-auto`}>
                {selectedDevice?.channels.map((c, i) => (
                  <div css={tw`flex items-center`}>
                    {i + 1}:
                    <Input
                      type="select"
                      value={c}
                      onChange={e =>
                        selectedDevice &&
                        setChannels({
                          variables: {
                            id: selectedDevice.id,
                            channels: produce(
                              selectedDevice.channels,
                              draft => {
                                const value = e.target
                                  .value as DmxChannelProperty;
                                draft[i] = value;
                              },
                            ),
                          },
                        })
                      }
                    >
                      {Object.entries(DmxChannelProperty).map(
                        ([key, value]) => (
                          <option key={value} value={value}>
                            {key}
                          </option>
                        ),
                      )}
                    </Input>
                    <FaBan
                      css={tw`text-red-900 mx-2`}
                      onClick={() =>
                        selectedDevice &&
                        setChannels({
                          variables: {
                            id: selectedDevice.id,
                            channels: produce(
                              selectedDevice.channels,
                              draft => {
                                draft.splice(i, 1);
                              },
                            ),
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <Button
                color="success"
                onClick={() =>
                  selectedDevice &&
                  setChannels({
                    variables: {
                      id: selectedDevice.id,
                      channels: selectedDevice.channels.concat(
                        DmxChannelProperty.Nothing,
                      ),
                    },
                  })
                }
              >
                Add Channel
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default DMXDevices;
