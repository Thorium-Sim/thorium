import React from "react";
import {Card, Input} from "helpers/reactstrap";
import {
  useSetsQuery,
  SetsDocument,
  useAddClientMutation,
  useUpdateSetClientMutation,
  useRemoveClientFromSetMutation,
} from "generated/graphql";
import {useParams} from "react-router-dom";

const ClientConfig: React.FC = () => {
  const {data} = useSetsQuery();
  const [addClientMutation] = useAddClientMutation();
  const [removeClientMutation] = useRemoveClientFromSetMutation();
  const [updateClientMutation] = useUpdateSetClientMutation();

  const {setId, simulatorId, stationSetId, station} = useParams();
  const stationId = decodeURI(station || "");

  const clients = data?.clients || [];
  const simulators = data?.simulators || [];

  const selectedSet = data?.sets?.find(s => s?.id === setId);
  const selectedSimulator = simulators.find(s => s.id === simulatorId);
  const selectedStationSet = selectedSimulator?.stationSets?.find(
    s => s?.id === stationSetId,
  );

  const getCurrentClient = (clientId: string) => {
    return (
      selectedSet?.clients.find(
        c =>
          c.simulator?.id === simulatorId &&
          c.client?.id === clientId &&
          c.stationSet?.id === stationSetId &&
          c.station === stationId,
      ) || {}
    );
  };

  const getClientAssignedStation = (clientId: string) => {
    const clientSet =
      selectedSet?.clients.find(
        c =>
          c.simulator?.id === simulatorId &&
          c.client?.id === clientId &&
          c.stationSet?.id === stationSetId,
      ) || {};
    return clientSet.station || true;
  };
  const updateSecondary = (
    e: React.ChangeEvent<HTMLInputElement>,
    clientId: string,
  ) => {
    if (!setId || !clientId) return;
    updateClientMutation({
      variables: {id: setId, clientId, secondary: e.target.checked},
      refetchQueries: [{query: SetsDocument}],
    });
  };
  const updateSoundPlayer = (
    e: React.ChangeEvent<HTMLInputElement>,
    clientId: string,
  ) => {
    if (!clientId || !setId) return;
    updateClientMutation({
      variables: {id: setId, clientId, soundPlayer: e.target.checked},
      refetchQueries: [{query: SetsDocument}],
    });
  };
  const updateClient = (
    {target: {checked}}: {target: {checked: boolean}},
    clientId: string,
  ) => {
    if (!setId) return;
    if (checked) {
      addClientMutation({
        variables: {
          id: setId,
          client: {
            clientId,
            simulatorId,
            stationSet: stationSetId,
            station: stationId,
          },
        },
        refetchQueries: [{query: SetsDocument}],
      });
    } else {
      const client = getCurrentClient(clientId);
      if (!client?.id) return;
      removeClientMutation({
        variables: {id: setId, client: client.id},
        refetchQueries: [{query: SetsDocument}],
      });
    }
  };

  return (
    <>
      <h5>Clients</h5>
      {selectedSimulator && selectedStationSet && stationId && (
        <Card className="flex-max auto-scroll">
          <ul style={{padding: 0}}>
            {clients
              .filter(s => {
                if (stationId && stationId.indexOf("interface-id:") > -1)
                  return true;
                return stationId?.indexOf("mobile:") === -1
                  ? !s?.mobile
                  : s?.mobile;
              })
              .map(
                s =>
                  s && (
                    <li key={s.id} className={`list-group-item`}>
                      <label>
                        <Input
                          checked={Boolean(getCurrentClient(s.id).id)}
                          onChange={e => updateClient(e, s.id)}
                          disabled={
                            getClientAssignedStation(s.id) !== stationId &&
                            getClientAssignedStation(s.id) !== true
                          }
                          type="checkbox"
                        />
                        {s.id}
                      </label>
                      {stationId === "Viewscreen" && getCurrentClient(s.id).id && (
                        <label>
                          <Input
                            checked={Boolean(getCurrentClient(s.id).secondary)}
                            onChange={e =>
                              updateSecondary(
                                e,
                                getCurrentClient(s.id).id || "",
                              )
                            }
                            type="checkbox"
                          />
                          <small>Secondary Viewscreen</small>
                        </label>
                      )}
                      {stationId &&
                        (stationId === "Viewscreen" ||
                          stationId.indexOf("keyboard") > -1) &&
                        getCurrentClient(s.id).id && (
                          <label>
                            <Input
                              checked={Boolean(
                                getCurrentClient(s.id).soundPlayer,
                              )}
                              onChange={e =>
                                updateSoundPlayer(
                                  e,
                                  getCurrentClient(s.id).id || "",
                                )
                              }
                              type="checkbox"
                            />
                            <small>Sound Player</small>
                          </label>
                        )}
                    </li>
                  ),
              )}
          </ul>
        </Card>
      )}
    </>
  );
};

export default ClientConfig;
