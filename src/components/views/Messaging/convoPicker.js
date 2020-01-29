import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "helpers/reactstrap";
import "./style.scss";
import {capitalCase} from "change-case";

const ConvoPicker = ({
  simulator,
  station,
  setSelectedConversation,
  messageGroups,
  teams,
}) => {
  const [stationsShown, setStationsShown] = React.useState(false);

  const {bridgeOfficerMessaging} = simulator;
  const stations = simulator.stations.filter(
    s =>
      s.name !== station.name &&
      (s.cards.find(c => c.component.name === "Messaging") ||
        s.widgets.indexOf("messages") > -1),
  );

  const toggleStations = () => {
    setStationsShown(s => !s);
  };
  return (
    <ButtonDropdown
      className="btn-block message-dropdown"
      isOpen={stationsShown}
      toggle={toggleStations}
      direction="up"
    >
      <DropdownToggle caret size="lg" block color="primary">
        New Message
      </DropdownToggle>
      <DropdownMenu className="messages-destinations">
        {bridgeOfficerMessaging &&
          stations.map(s => (
            <DropdownItem
              key={s.name}
              onClick={() => setSelectedConversation(s.name)}
            >
              {s.name}
            </DropdownItem>
          ))}
        {messageGroups && bridgeOfficerMessaging && (
          <DropdownItem disabled>--------------</DropdownItem>
        )}
        {messageGroups &&
          messageGroups.map(g => (
            <DropdownItem key={g} onClick={() => setSelectedConversation(g)}>
              {capitalCase(g)}
            </DropdownItem>
          ))}
        {teams &&
          teams.filter(
            t =>
              !t.cleared &&
              messageGroups.findIndex(
                m => m.toLowerCase().indexOf(t.type.toLowerCase()) > -1,
              ) > -1,
          ).length > 0 && <DropdownItem disabled>--------------</DropdownItem>}
        {teams &&
          teams
            .filter(
              t =>
                !t.cleared &&
                messageGroups.findIndex(
                  m => m.toLowerCase().indexOf(t.type.toLowerCase()) > -1,
                ) > -1,
            )
            .map(g => (
              <DropdownItem
                key={g.name}
                onClick={() => setSelectedConversation(g.name)}
              >
                {g.name}
              </DropdownItem>
            ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default ConvoPicker;
