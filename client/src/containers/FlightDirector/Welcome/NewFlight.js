import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag.macro";
import {
  Button,
  UncontrolledDropdown as Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "helpers/reactstrap";
import { Link } from "react-router-dom";

const QueryResult = ({ loading, data }) =>
  !loading &&
  data.thorium &&
  data.thorium.spaceEdventuresCenter &&
  data.thorium.spaceEdventuresCenter.flightTypes &&
  data.thorium.spaceEdventuresCenter.flightTypes.length > 0 ? (
    <Dropdown>
      <DropdownToggle caret size="lg" block color="success">
        New Flight
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag={Link} to="/config/flight">
          Unspecified Flight Type
        </DropdownItem>
        <DropdownItem divider />
        {data.thorium.spaceEdventuresCenter.flightTypes.map(f => (
          <DropdownItem
            tag={Link}
            to={`/config/flight?flightType=${f.id}`}
            key={f.id}
            value={f.id}
          >
            {f.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button tag={Link} to="/config/flight" color="success" block size="lg">
      New Flight
    </Button>
  );

const QUERY = gql`
  query Thorium {
    thorium {
      spaceEdventuresCenter {
        id
        name
        flightTypes {
          id
          name
          classHours
          flightHours
        }
      }
    }
  }
`;
const NewFlight = () => {
  const { loading, data } = useQuery(QUERY);
  return (
    <div className="new-flight">
      <h3>Start a new Flight</h3>
      <QueryResult loading={loading} data={data} />
    </div>
  );
};
export default NewFlight;
