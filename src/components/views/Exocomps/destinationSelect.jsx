import React, {useState} from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {useQuery} from "@apollo/client";

const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId, extra: true) {
      id
      name
      type
      displayName
      upgradeBoard
      upgraded
      damage {
        damaged
      }
    }
  }
`;

const DestinationSelect = ({destination, select, simulatorId, upgrade}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const {data, loading} = useQuery(SYSTEMS_QUERY, {
    variables: {simulatorId},
    pollInterval: 1000,
  });

  if (!data || loading) return null;

  const {systems = []} = data;
  const selectedSystem = systems.find(s => s.id === destination);
  const filteredSystems = systems
    .filter(sys => {
      if (upgrade) {
        if (sys.upgradeBoard && !sys.upgraded) return true;
        return false;
      }
      return true;
    })
    .concat()
    .sort((a, b) => {
      if (a.displayName > b.displayName) return 1;
      if (a.displayName < b.displayName) return -1;
      return 0;
    });

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {selectedSystem ? selectedSystem.displayName : "Select a System"}
      </DropdownToggle>
      <DropdownMenu>
        {filteredSystems.length > 0 ? (
          filteredSystems.map(s => (
            <DropdownItem key={s.id} onClick={() => select(s.id)}>
              {s.displayName}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem>No systems available.</DropdownItem>
        )}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default DestinationSelect;
