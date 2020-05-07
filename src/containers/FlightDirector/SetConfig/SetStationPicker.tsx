import React, {Fragment} from "react";
import {Card} from "helpers/reactstrap";
import {useSetsQuery, useSetKeyboardAndInterfaceQuery} from "generated/graphql";
import {useParams, useNavigate} from "react-router-dom";

function isTruthy(val: unknown): val is string {
  return typeof val === "string";
}

const SetStationPicker = () => {
  const {data} = useSetsQuery();

  const {setId, simulatorId, stationSetId, station} = useParams();
  const stationId = decodeURI(station || "");
  const navigate = useNavigate();

  const {data: interfaceData} = useSetKeyboardAndInterfaceQuery({
    variables: {id: simulatorId},
    skip: !simulatorId,
  });

  const clients = data?.clients || [];
  const simulators = data?.simulators || [];

  const selectedSimulator = simulators.find(s => s.id === simulatorId);
  const selectedStationSet = selectedSimulator?.stationSets?.find(
    s => s?.id === stationSetId,
  );

  const interfaces =
    interfaceData?.simulators?.[0].interfaces
      ?.map(interfaceId =>
        interfaceData.interfaces?.find(i => i?.id === interfaceId),
      )
      .filter(Boolean) || [];
  const keyboards = interfaceData?.keyboard || [];
  const dmxSets = interfaceData?.dmxSets || [];
  const mobileScreens = clients
    .reduce((prev: string[], next) => {
      if (!next?.cards) return prev;
      return prev.concat(next.cards.filter(isTruthy));
    }, [])
    .filter((a, i, arr) => arr.indexOf(a) === i);

  return (
    <>
      {" "}
      <h5>Station</h5>
      {selectedSimulator && selectedStationSet && (
        <Card className="flex-max auto-scroll">
          {selectedStationSet?.stations?.map(s => (
            <li
              key={`station-${s?.name}`}
              className={`list-group-item ${
                s?.name === stationId ? "selected" : ""
              }`}
              onClick={() =>
                navigate(
                  `/config/sets/${setId}/${simulatorId}/${stationSetId}/${s?.name}`,
                )
              }
            >
              {s?.name}
            </li>
          ))}
          <li
            key={`station-viewscreen`}
            className={`list-group-item ${
              stationId === "Viewscreen" ? "selected" : ""
            }`}
            onClick={() =>
              navigate(
                `/config/sets/${setId}/${simulatorId}/${stationSetId}/Viewscreen`,
              )
            }
          >
            Viewscreen
          </li>
          <li
            className={`list-group-item ${
              stationId === "Sound" ? "selected" : ""
            }`}
            onClick={() =>
              navigate(
                `/config/sets/${setId}/${simulatorId}/${stationSetId}/Sound`,
              )
            }
          >
            Sound Player
          </li>
          <li
            key={`station-blackout`}
            className={`list-group-item ${
              stationId === "Blackout" ? "selected" : ""
            }`}
            onClick={() =>
              navigate(
                `/config/sets/${setId}/${simulatorId}/${stationSetId}/Blackout`,
              )
            }
          >
            Blackout
          </li>
          {keyboards.length > 0 && (
            <>
              <li className={`list-group-item disabled`}>Keyboards</li>
              {keyboards.map(k => (
                <li
                  key={k?.id}
                  className={`list-group-item ${
                    stationId === `keyboard:${k?.id}` ? "selected" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/config/sets/${setId}/${simulatorId}/${stationSetId}/keyboard:${k?.id}`,
                    )
                  }
                >
                  {k?.name}
                </li>
              ))}
            </>
          )}
          {interfaces.length > 0 && (
            <>
              <li className={`list-group-item disabled`}>Interfaces</li>
              {interfaces.map(k => (
                <li
                  key={k?.id || ""}
                  className={`list-group-item ${
                    stationId === `interface-id:${k?.id}` ? "selected" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/config/sets/${setId}/${simulatorId}/${stationSetId}/interface-id:${k?.id}`,
                    )
                  }
                >
                  {k?.name}
                </li>
              ))}
            </>
          )}
          {dmxSets.length > 0 && (
            <>
              <li className={`list-group-item disabled`}>Lighting</li>
              {dmxSets.map(k => (
                <li
                  key={k?.id || ""}
                  className={`list-group-item ${
                    stationId === `dmxSet:${k?.id}` ? "selected" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/config/sets/${setId}/${simulatorId}/${stationSetId}/dmxSet:${k?.id}`,
                    )
                  }
                >
                  {k?.name}
                </li>
              ))}
            </>
          )}
          {mobileScreens.length > 0 ? (
            <Fragment>
              <li className={`list-group-item disabled`}>Mobile</li>
              {mobileScreens
                .filter(k => k !== "Interfaces")
                .map(k => (
                  <li
                    key={k}
                    className={`list-group-item ${
                      stationId === `mobile:${k}` ? "selected" : ""
                    }`}
                    onClick={() =>
                      navigate(
                        `/config/sets/${setId}/${simulatorId}/${stationSetId}/mobile:${k}`,
                      )
                    }
                  >
                    {k}
                  </li>
                ))}
            </Fragment>
          ) : null}
        </Card>
      )}
    </>
  );
};

export default SetStationPicker;
