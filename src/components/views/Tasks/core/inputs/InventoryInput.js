import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import {Button} from "helpers/reactstrap";
import {randomFromList} from "helpers/randomFromList";
import {FaBan} from "react-icons/fa";

const INV_QUERY = gql`
  query Inventory($simulatorId: ID!) {
    inventory(simulatorId: $simulatorId) {
      id
      name
    }
  }
`;
const InventoryInput = ({simulatorId, onChange, value}) => {
  return (
    <Query query={INV_QUERY} variables={{simulatorId}} skip={!simulatorId}>
      {({loading, data}) =>
        loading ? null : (
          <div>
            {console.log(loading, data)}
            <small>
              Change the inventory item's name before adding another.
            </small>
            {Object.entries(value || {}).map(([id, count]) => (
              <div
                key={id}
                style={{display: "flex", justifyContent: "space-between"}}
              >
                {data?.inventory?.length ? (
                  <select
                    value={id}
                    onChange={e => {
                      const {[id]: _, ...rest} = value;
                      onChange({...rest, [e.target.value]: count});
                    }}
                  >
                    {data.inventory.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    defaultValue={id === "undefined" ? "" : id}
                    onBlur={e => {
                      const {[id]: _, ...rest} = value;
                      onChange({...rest, [e.target.value]: count});
                    }}
                  />
                )}
                <input
                  defaultValue={count}
                  type="number"
                  min={1}
                  max={5}
                  onBlur={e => onChange({...value, [id]: e.target.value})}
                />
                <FaBan
                  className="text-danger"
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    const {[id]: myKey, ...rest} = value;
                    onChange(rest);
                  }}
                />
              </div>
            ))}
            <Button
              block
              size="sm"
              color="success"
              onClick={() =>
                onChange({
                  ...value,
                  [data
                    ? randomFromList(data.inventory.map(e => e.id))
                    : "Romulan Ale Glass"]: Math.ceil(Math.random() + 1),
                })
              }
            >
              Add Equipment
            </Button>
          </div>
        )
      }
    </Query>
  );
};

export default InventoryInput;
