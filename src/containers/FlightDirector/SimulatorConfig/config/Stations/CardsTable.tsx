import React from "react";
import {Input, Label} from "helpers/reactstrap";
import Views from "components/views/index";
import {capitalCase} from "change-case";
import {FaBan} from "react-icons/fa";
import {
  Simulator,
  Interface,
  SoftwarePanel,
  usePanelsAndInterfacesQuery,
  useUpdateStationCardMutation,
  useRemoveCardMutation,
  useAddCardMutation,
  useToggleStationLoginMutation,
  useToggleStationExecMutation,
  useSetStationDescriptionMutation,
  Card,
  Station,
  useReactorsSubscription,
  useStationSetTagsMutation,
} from "generated/graphql";
import {useParams} from "react-router";
import Maybe from "graphql/tsutils/Maybe";
import {TagInput} from "containers/FlightDirector/DMX/fixtures";

interface CardSelectProps {
  action: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  simulator: Simulator;
  softwarePanels: Maybe<SoftwarePanel>[];
  value: string;
  interfaces: Maybe<Interface>[];
}
const CardSelect: React.FC<CardSelectProps> = ({
  action,
  simulator,
  softwarePanels = [],
  value = "nothing",
  interfaces = [],
}) => {
  const {subPath1: selectedStationSet} = useParams();
  const {data} = useReactorsSubscription({
    variables: {simulatorId: simulator.id},
  });

  const inSim = (comp: string) => {
    const stationSet = simulator?.stationSets?.find(
      s => s?.id === selectedStationSet,
    );
    const cards =
      stationSet?.stations?.reduce((prev: string[], next) => {
        const comp = next?.cards
          ?.map(c => c?.component)
          .filter(Boolean) as string[];
        if (comp) prev.concat(comp);
        return prev;
      }, []) || [];
    return cards.includes(comp);
  };

  const viewList = Object.keys(Views).filter(v => {
    return v !== "Offline" && v !== "Login" && v !== "Viewscreen";
  });
  if (data?.reactorUpdate.find(r => r.model === "reactor")?.hasWings) {
    viewList.push("PowerDistributionLeftWing");
    viewList.push("PowerDistributionRightWing");
  }
  viewList.sort();

  return (
    <select className="c-select form-control" value={value} onChange={action}>
      <option value="nothing">Please Select A Card</option>
      <optgroup label="Cards">
        {viewList.map(e => (
          <option key={`card-select-${e}`} value={e}>
            {`${inSim(e) ? "✅ " : ""}${e}`}
          </option>
        ))}
      </optgroup>
      <optgroup label="Software Panels">
        {simulator?.panels?.map(p => (
          <option key={p || ""} value={`${p}`}>
            {softwarePanels?.find(s => s?.id === p)?.name}
          </option>
        ))}
      </optgroup>
      <optgroup label="Interfaces">
        {simulator?.interfaces?.map(p => (
          <option key={p || ""} value={`interface-id:${p}`}>
            {interfaces?.find(s => s?.id === p)?.name}
          </option>
        ))}
      </optgroup>
    </select>
  );
};

interface CardsTableProps {
  simulator: Simulator;
  station: Station;
}

const CardsTable: React.FC<CardsTableProps> = ({simulator, station}) => {
  const {subPath1: selectedStationSet} = useParams();

  const [updateCardMutation] = useUpdateStationCardMutation();
  const [removeCardMutation] = useRemoveCardMutation();
  const [addCardMutation] = useAddCardMutation();
  const [toggleLogin] = useToggleStationLoginMutation();
  const [toggleExec] = useToggleStationExecMutation();
  const [setDescription] = useSetStationDescriptionMutation();
  const [setTags] = useStationSetTagsMutation();
  const {data} = usePanelsAndInterfacesQuery();

  const updateStationCard = (
    type: string,
    card: Card,
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    if (!card.name || !station.name || !selectedStationSet) return;
    updateCardMutation({
      variables: {
        stationSetId: selectedStationSet,
        stationName: station.name,
        cardName: card.name,
        [type]: e.target.value,
      },
    });
  };
  const removeCard = (card: Card) => {
    if (window.confirm("Are you sure you want to delete that card?")) {
      if (!card.name || !station.name || !selectedStationSet) return;
      removeCardMutation({
        variables: {
          id: selectedStationSet,
          stationName: station.name,
          cardName: card.name,
        },
      });
    }
  };
  const addCard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sampleName = e.target.value;
    if (sampleName.indexOf("software-panel-") > -1) {
      const panel = data?.softwarePanels?.find(
        i => i?.id === sampleName.replace("software-panel-", ""),
      );
      sampleName = panel?.name ? panel.name : sampleName;
    }
    if (sampleName.indexOf("interface-id:-") > -1) {
      const int = data?.interfaces?.find(
        i => i?.id === sampleName.replace("interface-id:", ""),
      );
      sampleName = int?.name ? int.name : sampleName;
    }
    let name = prompt("What is the card name?", capitalCase(sampleName));
    const cardComponent = e.target.value;
    if (!name || !station.name || !selectedStationSet) return;
    addCardMutation({
      variables: {
        id: selectedStationSet,
        name: station.name,
        cardName: name,
        cardComponent,
      },
    });
  };

  const setStationLogin = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedStationSet || !station.name) return;
    toggleLogin({
      variables: {
        stationSetID: selectedStationSet,
        stationName: station.name,
        login: evt.target.checked,
      },
    });
  };
  const setStationExecutive = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedStationSet || !station.name) return;
    toggleExec({
      variables: {
        stationSetID: selectedStationSet,
        stationName: station.name,
        exec: evt.target.checked,
      },
    });
  };

  return (
    <>
      <table className="table table-sm">
        <thead className="thead-default">
          <tr>
            <th colSpan={3}>
              <span>
                {station.name} |{" "}
                <label style={{display: "inline"}}>
                  <input
                    checked={Boolean(station.login)}
                    onChange={setStationLogin}
                    type="checkbox"
                  />{" "}
                  Auto-Login
                </label>{" "}
                |{" "}
                <label style={{display: "inline"}}>
                  <input
                    checked={Boolean(station.executive)}
                    onChange={setStationExecutive}
                    type="checkbox"
                  />{" "}
                  Executive
                </label>
              </span>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={3}>
              <Label>
                Description
                <Input
                  key={station?.name || ""}
                  type="textarea"
                  defaultValue={station?.description || ""}
                  onBlur={e =>
                    selectedStationSet &&
                    station.name &&
                    setDescription({
                      variables: {
                        stationSetID: selectedStationSet,
                        stationName: station.name,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </Label>
            </th>
          </tr>
          <tr>
            <th colSpan={3}>
              <Label>
                Tags
                <TagInput
                  tags={station.tags || []}
                  onAdd={t =>
                    setTags({
                      variables: {
                        stationSetId: selectedStationSet,
                        stationName: station.name,
                        tags: (station.tags || []).concat(t),
                      },
                    })
                  }
                  onRemove={t =>
                    setTags({
                      variables: {
                        stationSetId: selectedStationSet,
                        stationName: station.name,
                        tags: (station.tags || []).filter(tt => tt !== t),
                      },
                    })
                  }
                />
              </Label>
            </th>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Name</th>
            <th>Component</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {station?.cards?.map((card, index) => {
            return (
              <tr key={`${selectedStationSet}-${station.name}-${card?.name}`}>
                <td>
                  <Input
                    type="text"
                    defaultValue={card?.name || ""}
                    onBlur={e => card && updateStationCard("name", card, e)}
                  />
                </td>
                <td>
                  <CardSelect
                    action={e =>
                      card && updateStationCard("component", card, e)
                    }
                    value={card?.component || ""}
                    simulator={simulator}
                    interfaces={data?.interfaces || []}
                    softwarePanels={data?.softwarePanels || []}
                  />
                </td>
                <td>
                  <FaBan
                    className="text-danger"
                    onClick={() => card && removeCard(card)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label>Select a component to add a card</label>
      <CardSelect
        action={e => addCard(e)}
        value={"nothing"}
        simulator={simulator}
        interfaces={data?.interfaces || []}
        softwarePanels={data?.softwarePanels || []}
      />
    </>
  );
};

export default CardsTable;
